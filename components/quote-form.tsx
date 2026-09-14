"use client";

import { FormEvent, useEffect, useState } from "react";

const initial = {
  name: "",
  business: "",
  email: "",
  phone: "",
  jobType: "",
  description: "",
  material: "",
  quantity: "",
  condition: "",
  colour: "",
  finish: "",
  timing: "",
  consent: false,
  website: "",
};

type QuoteData = typeof initial;
type SubmitState = "idle" | "submitting" | "success";

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteData>(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const draft = localStorage.getItem("flowcoat-quote-draft");
    if (!draft) return;
    try {
      setData({ ...initial, ...JSON.parse(draft), website: "" });
    } catch {}
  }, []);

  function update(name: keyof QuoteData, value: string | boolean) {
    const next = { ...data, [name]: value };
    setData(next);
    const draft = Object.fromEntries(Object.entries(next).filter(([key]) => key !== "website"));
    localStorage.setItem("flowcoat-quote-draft", JSON.stringify(draft));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  }

  function next(event: FormEvent) {
    event.preventDefault();

    const required = step === 1
      ? [[data.name.trim(), "Your name"], [data.email.trim(), "Email"]]
      : step === 2
        ? [[data.jobType.trim(), "Job type"], [data.description.trim(), "Part description"]]
        : [];

    const missing = required
      .filter(([value]) => !value)
      .map(([, label]) => `${label} is required.`);

    if (step === 1 && data.email && !/^[^\s@]+@[^\s@]+[.][^\s@]+$/.test(data.email.trim())) {
      missing.push("Enter a valid email address.");
    }

    if (missing.length) {
      setErrors(missing);
      return;
    }

    setErrors([]);
    setStep(Math.min(4, step + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitState === "submitting") return;

    if (!data.consent) {
      setErrors(["Please confirm the quote-request acknowledgement."]);
      return;
    }

    setErrors([]);
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { ok?: boolean; reference?: string; error?: string };

      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.error || "Unable to send the quote request.");
      }

      localStorage.removeItem("flowcoat-quote-draft");
      setReference(result.reference);
      setSubmitState("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitState("idle");
      setErrors([
        error instanceof Error
          ? error.message
          : "We couldn't send your request right now. Please try again.",
      ]);
    }
  }

  const input = (name: keyof QuoteData, label: string, type = "text") => (
    <label>
      <span className="field-label">{label}</span>
      <input
        className="field"
        type={type}
        value={String(data[name])}
        onChange={(event) => update(name, event.target.value)}
      />
    </label>
  );

  if (submitState === "success") {
    return (
      <div className="border border-[var(--line)] bg-white p-7 sm:p-10">
        <p className="eyebrow text-[var(--brand)]">Request received</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-.03em]">Thanks — your quote request has been sent.</h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          FLOWCOAT has received your job details and can contact you using the information you supplied.
          This is a quote request only and does not become an accepted order until scope, pricing and timing are confirmed.
        </p>
        <div className="mt-7 border-l-4 border-[var(--brand)] bg-[var(--paper)] p-5">
          <p className="eyebrow text-[var(--muted)]">Reference</p>
          <p className="mt-2 text-2xl font-black">{reference}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7 flex items-center justify-between">
        <p className="eyebrow" aria-live="polite">Step {step} of 4</p>
        <span className="text-xs text-[var(--muted)]" aria-live="polite">
          {saved ? "Draft saved on this device" : "Progress saves locally"}
        </span>
      </div>

      <div className="mb-9 grid grid-cols-4 gap-2" aria-hidden>
        {[1, 2, 3, 4].map((number) => (
          <span key={number} className={`h-2 ${number <= step ? "bg-[var(--brand)]" : "bg-[var(--line)]"}`} />
        ))}
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mb-6 border-l-4 border-[var(--error)] bg-red-50 p-4">
          <p className="font-bold">Check the following:</p>
          <ul className="mt-2 list-disc pl-5">
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={step === 4 ? submit : next}>
        <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={data.website}
              onChange={(event) => setData({ ...data, website: event.target.value })}
            />
          </label>
        </div>

        {step === 1 && (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-6 text-2xl font-bold">Your details</legend>
            {input("name", "Name *")}
            {input("business", "Business name")}
            {input("email", "Email *", "email")}
            {input("phone", "Phone", "tel")}
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-6 text-2xl font-bold">The parts</legend>
            <label>
              <span className="field-label">Job type *</span>
              <select className="field" value={data.jobType} onChange={(event) => update("jobType", event.target.value)}>
                <option value="">Select one</option>
                <option>One-off custom job</option>
                <option>Small batch</option>
                <option>Repeat production</option>
                <option>Architectural project</option>
                <option>Gate, fencing or balustrade</option>
                <option>Wheel or selected automotive part</option>
                <option>Large or long fabrication</option>
                <option>Other</option>
              </select>
            </label>
            {input("material", "Material, if known")}
            {input("quantity", "Quantity")}
            {input("condition", "Existing surface or condition")}
            <label className="sm:col-span-2">
              <span className="field-label">Describe the parts, dimensions and requirements *</span>
              <textarea className="field min-h-36" value={data.description} onChange={(event) => update("description", event.target.value)} />
            </label>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-6 text-2xl font-bold">Finish and timing</legend>
            {input("colour", "Colour or reference")}
            {input("finish", "Finish (matte, satin, gloss, texture or unsure)")}
            {input("timing", "Required date or flexibility")}
            <div className="border border-dashed border-[var(--line)] bg-white p-5 sm:col-span-2">
              <p className="font-bold">Photos and drawings</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                File uploads are not enabled yet. If FLOWCOAT needs photos or drawings after receiving your request,
                we can ask for them when we contact you.
              </p>
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="mb-6 text-2xl font-bold">Review your request</legend>
            <dl className="grid gap-px overflow-hidden bg-[var(--line)] sm:grid-cols-2">
              {Object.entries(data)
                .filter(([key, value]) => !["consent", "website"].includes(key) && value)
                .map(([key, value]) => (
                  <div key={key} className="bg-white p-4">
                    <dt className="eyebrow text-[var(--muted)]">{key.replace(/([A-Z])/g, " $1")}</dt>
                    <dd className="mt-2 whitespace-pre-wrap">{String(value)}</dd>
                  </div>
                ))}
            </dl>
            <label className="mt-6 flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-5"
                checked={data.consent}
                onChange={(event) => update("consent", event.target.checked)}
              />
              <span>
                I understand this is a quote request, not an accepted order, and final pricing may change after physical inspection.
              </span>
            </label>
            <div className="mt-6 border-l-4 border-[var(--brand)] bg-red-50 p-4">
              <strong>Ready to send.</strong> Your request will be securely sent to FLOWCOAT when you press Submit quote request.
            </div>
          </fieldset>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 1 && (
            <button
              type="button"
              className="button button-outline !text-[var(--ink)] hover:!text-white"
              disabled={submitState === "submitting"}
              onClick={() => {
                setErrors([]);
                setStep(step - 1);
              }}
            >
              ← Back
            </button>
          )}
          {step < 4 && <button className="button" type="submit">Continue →</button>}
          {step === 4 && (
            <button className="button" type="submit" disabled={submitState === "submitting"}>
              {submitState === "submitting" ? "Sending…" : "Submit quote request →"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
