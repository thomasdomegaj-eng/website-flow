import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

const limits = {
  name: 120,
  business: 160,
  email: 254,
  phone: 80,
  jobType: 120,
  description: 5000,
  material: 160,
  quantity: 120,
  condition: 500,
  colour: 160,
  finish: 160,
  timing: 240,
};

type QuotePayload = {
  name: string;
  business: string;
  email: string;
  phone: string;
  jobType: string;
  description: string;
  material: string;
  quantity: string;
  condition: string;
  colour: string;
  finish: string;
  timing: string;
  consent: boolean;
  website?: string;
};

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parsePayload(value: unknown): QuotePayload | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  return {
    name: text(body.name, limits.name),
    business: text(body.business, limits.business),
    email: text(body.email, limits.email).toLowerCase(),
    phone: text(body.phone, limits.phone),
    jobType: text(body.jobType, limits.jobType),
    description: text(body.description, limits.description),
    material: text(body.material, limits.material),
    quantity: text(body.quantity, limits.quantity),
    condition: text(body.condition, limits.condition),
    colour: text(body.colour, limits.colour),
    finish: text(body.finish, limits.finish),
    timing: text(body.timing, limits.timing),
    consent: body.consent === true,
    website: text(body.website, 200),
  };
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

function quoteReference() {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()).replaceAll("-", "");
  return `FC-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  return `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #ddd;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value || "—")}</td></tr>`;
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many quote requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const quote = parsePayload(raw);
  if (!quote) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot: bots that fill this hidden field get a normal-looking response.
  if (quote.website) return NextResponse.json({ ok: true, reference: quoteReference() });

  const errors: string[] = [];
  if (!quote.name) errors.push("Name is required.");
  if (!quote.email || !validEmail(quote.email)) errors.push("A valid email is required.");
  if (!quote.jobType) errors.push("Job type is required.");
  if (!quote.description) errors.push("Part description is required.");
  if (!quote.consent) errors.push("Please confirm the quote-request acknowledgement.");
  if (errors.length) return NextResponse.json({ error: errors.join(" ") }, { status: 400 });

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "2525");
  const username = process.env.SMTP_USERNAME?.trim();
  const password = process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === "true";
  const fromEmail = process.env.FLOWCOAT_FROM_EMAIL?.trim() || username;
  const notificationEmail = process.env.FLOWCOAT_NOTIFICATION_EMAIL?.trim() || "sale@flowcoat.com.au";

  if (!host || !Number.isFinite(port) || !username || !password || !fromEmail) {
    console.error("FLOWCOAT quote email is not configured.");
    return NextResponse.json({ error: "Quote email is temporarily unavailable. Please contact FLOWCOAT directly." }, { status: 503 });
  }

  const reference = quoteReference();
  const submittedAt = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const fields: Array<[string, string]> = [
    ["Reference", reference],
    ["Submitted", submittedAt],
    ["Name", quote.name],
    ["Business", quote.business],
    ["Email", quote.email],
    ["Phone", quote.phone],
    ["Job type", quote.jobType],
    ["Material", quote.material],
    ["Quantity", quote.quantity],
    ["Existing surface / condition", quote.condition],
    ["Colour / reference", quote.colour],
    ["Finish", quote.finish],
    ["Required date / flexibility", quote.timing],
    ["Parts, dimensions and requirements", quote.description],
  ];

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user: username, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: "TLSv1.2" },
  });

  try {
    await transporter.sendMail({
      from: `FLOWCOAT Website <${fromEmail}>`,
      to: notificationEmail,
      replyTo: quote.email,
      subject: `New FLOWCOAT quote request — ${reference} — ${quote.name}`,
      text: [
        "NEW FLOWCOAT QUOTE REQUEST",
        "",
        ...fields.map(([label, value]) => `${label}: ${value || "—"}`),
        "",
        "Reply to this email to respond directly to the customer.",
      ].join("\n"),
      html: `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#231f20"><h1 style="margin:0 0 16px">New FLOWCOAT quote request</h1><p><strong>${escapeHtml(reference)}</strong></p><table style="border-collapse:collapse;width:100%;max-width:760px">${fields.map(([label, value]) => row(label, value)).join("")}</table><p style="margin-top:20px">Reply to this email to respond directly to the customer.</p></body></html>`,
    });
  } catch (error) {
    console.error("FLOWCOAT quote email failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "We couldn't send your request right now. Your details are still on this device, so please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, reference });
}
