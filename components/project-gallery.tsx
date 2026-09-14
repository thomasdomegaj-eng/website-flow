"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ProjectMediaItem } from "@/lib/project-media";

export function ProjectGallery({ limit }: { limit?: number }) {
  const [items, setItems] = useState<ProjectMediaItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/project-media", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { items?: ProjectMediaItem[] };
      setItems(Array.isArray(data.items) ? data.items : []);
      setLoaded(true);
    } catch {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 2000);
    window.addEventListener("focus", refresh);

    const channel = "BroadcastChannel" in window ? new BroadcastChannel("flowcoat-project-media") : null;
    if (channel) channel.onmessage = () => void refresh();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      channel?.close();
    };
  }, [refresh]);

  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;

  if (!loaded) {
    return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: limit ? Math.min(limit, 3) : 3 }).map((_, index) => <div key={index} className="aspect-[4/3] animate-pulse bg-[var(--steel)]" />)}</div>;
  }

  if (!visibleItems.length) {
    return <div className="border border-dashed border-[var(--line)] bg-white/50 p-8 text-center"><p className="font-bold">Project gallery ready</p><p className="mt-2 text-sm text-[var(--muted)]">Use the local Media Studio at <code>/media-studio</code> while developing, or add approved photography to <code>public/assets/projects</code>.</p></div>;
  }

  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleItems.map((item) => {const label=item.name.replace(/^\d+-/, "").replace(/[-_]/g," ").replace(/\.[^.]+$/,"");return <figure key={`${item.source}:${item.name}`} className="relative aspect-[4/3] overflow-hidden bg-[var(--steel)]"><Image src={item.url} alt={label} fill unoptimized={item.source === "local"} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/></figure>})}</div>;
}
