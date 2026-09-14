import { NextResponse } from "next/server";
import {
  deleteProjectMedia,
  listProjectMedia,
  localMediaStudioEnabled,
  parseMediaCollection,
  saveProjectMedia,
  validateProjectMediaFiles,
} from "@/lib/project-media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const collection = parseMediaCollection(new URL(request.url).searchParams.get("collection"));
  const items = await listProjectMedia(undefined, collection);
  return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!localMediaStudioEnabled()) {
    return NextResponse.json({ error: "Media Studio is unavailable." }, { status: 404 });
  }

  const formData = await request.formData();
  const collection = parseMediaCollection(formData.get("collection"));
  const files = formData.getAll("files").filter((value): value is File => typeof value !== "string");
  const validationError = validateProjectMediaFiles(files);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const uploaded = [];
  for (const file of files) {
    uploaded.push(await saveProjectMedia(file, collection));
  }

  return NextResponse.json({ uploaded, items: await listProjectMedia(undefined, collection) });
}

export async function DELETE(request: Request) {
  if (!localMediaStudioEnabled()) {
    return NextResponse.json({ error: "Media Studio is unavailable." }, { status: 404 });
  }

  let name = "";
  let collection = parseMediaCollection(null);
  try {
    const body = (await request.json()) as { name?: unknown; collection?: unknown };
    name = typeof body.name === "string" ? body.name : "";
    collection = parseMediaCollection(body.collection);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!name) return NextResponse.json({ error: "Image name is required." }, { status: 400 });

  try {
    await deleteProjectMedia(name, collection);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return NextResponse.json({ error: "Image not found." }, { status: 404 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete image." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, items: await listProjectMedia(undefined, collection) });
}
