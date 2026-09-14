"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import type { ProjectMediaItem } from "@/lib/project-media";

function announceChange() {
  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel("flowcoat-project-media");
    channel.postMessage("changed");
    channel.close();
  }
}

export function MediaStudio() {
  const [items, setItems] = useState<ProjectMediaItem[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Ready.");

  const refresh = useCallback(async () => {
    const response = await fetch("/api/project-media", { cache: "no-store" });
    const data = (await response.json()) as { items?: ProjectMediaItem[] };
    setItems(Array.isArray(data.items) ? data.items : []);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files.length || busy) return;

    const form = event.currentTarget;
    setBusy(true);
    setMessage(`Uploading ${files.length} image${files.length === 1 ? "" : "s"}…`);
    const body = new FormData();
    for (const file of files) body.append("files", file);

    try {
      const response = await fetch("/api/project-media", { method: "POST", body });
      const data = (await response.json()) as { error?: string; items?: ProjectMediaItem[] };
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      setItems(Array.isArray(data.items) ? data.items : []);
      setFiles([]);
      setMessage("Uploaded. The website gallery has been notified and should update almost immediately.");
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
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.name }),
      });
      const data = (await response.json()) as { error?: string; items?: ProjectMediaItem[] };
      if (!response.ok) throw new Error(data.error || "Delete failed.");
      setItems(Array.isArray(data.items) ? data.items : []);
      setMessage("Removed. The website gallery has been notified.");
      announceChange();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return <main id="main" className="fixed inset-0 z-[100] overflow-y-auto bg-[#111311] text-white">
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-white/15 pb-8">
        <div><p className="eyebrow text-[var(--brand)]">Local development tool</p><h1 className="mt-3 text-4xl font-black tracking-[-.04em] sm:text-6xl">FLOWCOAT Media Studio</h1><p className="mt-3 max-w-2xl text-white/65">Upload approved project photography for local testing. Files are stored outside the downloaded website folder so they survive replacing the code with a newer ZIP.</p></div>
        <Link href="/projects" target="_blank" className="button border border-white/30 text-white">Open live Projects page ↗</Link>
      </header>

      <section className="grid gap-8 py-10 lg:grid-cols-[.8fr_1.2fr]">
        <form onSubmit={upload} className="h-fit border border-white/15 bg-white/[.04] p-6 sm:p-8">
          <p className="eyebrow text-[var(--brand)]">Upload</p>
          <h2 className="mt-3 text-2xl font-bold">Add project images</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">JPG, PNG, WebP or AVIF · up to 20 MB each · up to 25 files at once.</p>
          <label className="mt-7 block cursor-pointer border border-dashed border-white/30 bg-black/20 p-8 text-center hover:border-[var(--brand)]">
            <span className="font-bold">Choose images</span><span className="mt-2 block text-sm text-white/55">You can select multiple files.</span>
            <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} />
          </label>
          {files.length > 0 && <div className="mt-5 text-sm text-white/70"><strong>{files.length}</strong> selected<div className="mt-2 max-h-28 overflow-y-auto text-xs text-white/45">{files.map((file) => <div key={`${file.name}:${file.size}`}>{file.name}</div>)}</div></div>}
          <button type="submit" disabled={!files.length || busy} className="button button-brand mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40">{busy ? "Working…" : "Upload to website"}</button>
          <p aria-live="polite" className="mt-4 min-h-10 text-sm leading-relaxed text-white/60">{message}</p>
          <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/40">Local uploads are development-only and are not committed to GitHub. Repository images are read-only here.</div>
        </form>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow text-white/45">Current gallery</p><h2 className="mt-2 text-2xl font-bold">{items.length} image{items.length === 1 ? "" : "s"}</h2></div><button type="button" onClick={() => void refresh()} className="text-sm font-bold underline underline-offset-4">Refresh</button></div>
          {items.length === 0 ? <div className="border border-dashed border-white/20 p-10 text-center text-white/50">No project images yet.</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article key={`${item.source}:${item.name}`} className="overflow-hidden border border-white/10 bg-white/[.04]"><div className="relative aspect-[4/3] bg-black/30"><Image src={item.url} alt="" fill unoptimized={item.source === "local"} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/></div><div className="flex items-center justify-between gap-3 p-3"><div className="min-w-0"><p className="truncate text-xs font-bold">{item.name.replace(/^\d+-[a-f0-9]+-/, "")}</p><p className="mt-1 text-[.65rem] uppercase tracking-[.16em] text-white/35">{item.source === "local" ? "Local upload" : "Repository asset"}</p></div>{item.source === "local" && <button type="button" disabled={busy} onClick={() => void remove(item)} className="shrink-0 text-xs font-bold text-[var(--brand)] disabled:opacity-40">Delete</button>}</div></article>)}</div>}
        </div>
      </section>
    </div>
  </main>;
}
