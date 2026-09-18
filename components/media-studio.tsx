"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import type { MediaCollection, ProjectMediaItem } from "@/lib/project-media";

function announceChange() {
  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel("flowcoat-project-media");
    channel.postMessage("changed");
    channel.close();
  }
}

const labels: Record<MediaCollection, { eyebrow: string; title: string; description: string; empty: string; liveHref: string; liveLabel: string }> = {
  projects: {
    eyebrow: "Project photography",
    title: "Add project images",
    description: "Approved project photography shown in the Home and Projects galleries.",
    empty: "No project images yet.",
    liveHref: "/projects",
    liveLabel: "Open live Projects page ↗",
  },
  "client-logos": {
    eyebrow: "Approved client logos",
    title: "Add client logos",
    description: "Only upload a company or brand logo after permission to display it on the FLOWCOAT website has been confirmed.",
    empty: "No client logos yet.",
    liveHref: "/",
    liveLabel: "Open live Home page ↗",
  },
};

export function MediaStudio() {
  const [collection, setCollection] = useState<MediaCollection>("projects");
  const [items, setItems] = useState<ProjectMediaItem[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Ready.");

  const refresh = useCallback(async () => {
    const response = await fetch(`/api/project-media?collection=${encodeURIComponent(collection)}`, { cache: "no-store" });
    const data = (await response.json()) as { items?: ProjectMediaItem[] };
    setItems(Array.isArray(data.items) ? data.items : []);
  }, [collection]);

  useEffect(() => {
    setFiles([]);
    setMessage("Ready.");
    void refresh();
  }, [refresh]);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files.length || busy) return;

    const form = event.currentTarget;
    setBusy(true);
    setMessage(`Uploading ${files.length} image${files.length === 1 ? "" : "s"}…`);
    const body = new FormData();
    body.append("collection", collection);
    for (const file of files) body.append("files", file);

    try {
      const response = await fetch("/api/project-media", { method: "POST", body });
      const data = (await response.json()) as { error?: string; items?: ProjectMediaItem[] };
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      setItems(Array.isArray(data.items) ? data.items : []);
      setFiles([]);
      setMessage(collection === "client-logos" ? "Uploaded. The approved logo wall should update almost immediately." : "Uploaded. The website gallery should update almost immediately.");
      announceChange();
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(item: ProjectMediaItem) {
    if (item.source !== "local" || busy) return;
    setBusy(true);
    setMessage(`Removing ${item.name}…`);
    try {
      const response = await fetch("/api/project-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.name, collection }),
      });
      const data = (await response.json()) as { error?: string; items?: ProjectMediaItem[] };
      if (!response.ok) throw new Error(data.error || "Delete failed.");
      setItems(Array.isArray(data.items) ? data.items : []);
      setMessage("Removed. The public website has been notified.");
      announceChange();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  const copy = labels[collection];
  const isLogo = collection === "client-logos";

  return <main id="main" className="fixed inset-0 z-[100] overflow-y-auto bg-[#111311] text-white">
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-white/15 pb-8">
        <div><p className="eyebrow text-[var(--brand)]">Protected website content</p><h1 className="mt-3 text-4xl font-black tracking-[-.04em] sm:text-6xl">FLOWCOAT Media Studio</h1><p className="mt-3 max-w-2xl text-white/65">Manage approved project photography and approved client logos from the same protected page. Production access is password protected and uploads live in the configured persistent media directory.</p></div>
        <Link href={copy.liveHref} target="_blank" className="button border border-white/30 text-white">{copy.liveLabel}</Link>
      </header>

      <nav className="mt-7 flex flex-wrap gap-3" aria-label="Media type">
        <button type="button" onClick={() => setCollection("projects")} className={`border px-5 py-3 text-sm font-bold ${collection === "projects" ? "border-[var(--brand)] bg-[var(--brand)] text-black" : "border-white/20 text-white"}`}>Project photos</button>
        <button type="button" onClick={() => setCollection("client-logos")} className={`border px-5 py-3 text-sm font-bold ${collection === "client-logos" ? "border-[var(--brand)] bg-[var(--brand)] text-black" : "border-white/20 text-white"}`}>Client logos</button>
      </nav>

      <section className="grid gap-8 py-10 lg:grid-cols-[.8fr_1.2fr]">
        <form onSubmit={upload} className="h-fit border border-white/15 bg-white/[.04] p-6 sm:p-8">
          <p className="eyebrow text-[var(--brand)]">{copy.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold">{copy.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{copy.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/50">JPG, PNG, WebP or AVIF · up to 20 MB each · up to 25 files at once.</p>
          {isLogo && <div className="mt-5 border-l-4 border-[var(--brand)] bg-white/[.05] p-4 text-sm leading-relaxed text-white/70"><strong>Permission check:</strong> only publish logos where FLOWCOAT has permission to identify or display the business/brand. PNG or WebP with a transparent background is usually best.</div>}
          <label className="mt-7 block cursor-pointer border border-dashed border-white/30 bg-black/20 p-8 text-center hover:border-[var(--brand)]">
            <span className="font-bold">Choose images</span><span className="mt-2 block text-sm text-white/55">You can select multiple files.</span>
            <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} />
          </label>
          {files.length > 0 && <div className="mt-5 text-sm text-white/70"><strong>{files.length}</strong> selected<div className="mt-2 max-h-28 overflow-y-auto text-xs text-white/45">{files.map((file) => <div key={`${file.name}:${file.size}`}>{file.name}</div>)}</div></div>}
          <button type="submit" disabled={!files.length || busy} className="button button-brand mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40">{busy ? "Working…" : "Upload to website"}</button>
          <p aria-live="polite" className="mt-4 min-h-10 text-sm leading-relaxed text-white/60">{message}</p>
          <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/40">Media Studio uploads are separate from GitHub commits. Repository assets are read-only here.</div>
        </form>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow text-white/45">Current {isLogo ? "logo wall" : "gallery"}</p><h2 className="mt-2 text-2xl font-bold">{items.length} image{items.length === 1 ? "" : "s"}</h2></div><button type="button" onClick={() => void refresh()} className="text-sm font-bold underline underline-offset-4">Refresh</button></div>
          {items.length === 0 ? <div className="border border-dashed border-white/20 p-10 text-center text-white/50">{copy.empty}</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article key={`${item.source}:${item.name}`} className="overflow-hidden border border-white/10 bg-white/[.04]"><div className={`relative aspect-[4/3] ${isLogo ? "bg-white" : "bg-black/30"}`}><Image src={item.url} alt="" fill unoptimized={item.source === "local"} sizes="(max-width: 640px) 100vw, 33vw" className={isLogo ? "object-contain p-6" : "object-cover"}/></div><div className="flex items-center justify-between gap-3 p-3"><div className="min-w-0"><p className="truncate text-xs font-bold">{item.name.replace(/^\d+-[a-f0-9]+-/, "")}</p><p className="mt-1 text-[.65rem] uppercase tracking-[.16em] text-white/35">{item.source === "local" ? "Media Studio upload" : "Repository asset"}</p></div>{item.source === "local" && <button type="button" disabled={busy} onClick={() => void remove(item)} className="shrink-0 text-xs font-bold text-[var(--brand)] disabled:opacity-40">Delete</button>}</div></article>)}</div>}
        </div>
      </section>
    </div>
  </main>;
}
