"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ProjectMediaItem } from "@/lib/project-media";

export function ClientLogoGallery({ limit }: { limit?: number }) {
  const [items, setItems] = useState<ProjectMediaItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/project-media?collection=client-logos", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { items?: ProjectMediaItem[] };
      setItems(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 2000);
    const channel = "BroadcastChannel" in window ? new BroadcastChannel("flowcoat-project-media") : null;
    if (channel) channel.onmessage = () => void refresh();
    return () => { window.clearInterval(interval); channel?.close(); };
  }, [refresh]);

  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  if (!loaded) return <div className="min-h-32 animate-pulse bg-white" />;
  if (!visible.length) return <div className="border border-dashed border-[var(--line)] bg-white/50 p-8 text-center"><p className="font-bold">Approved logo area ready</p><p className="mt-2 text-sm text-[var(--muted)]">Add client logos from the protected Media Studio after display permission is confirmed.</p></div>;

  return <div className="grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-3 lg:grid-cols-5">{visible.map((item) => {
    const label = item.name.replace(/^\d+-[a-f0-9]+-/, "").replace(/[-_]/g, " ").replace(/\.[^.]+$/, "");
    return <div key={`${item.source}:${item.name}`} className="flex min-h-32 items-center justify-center border-b border-r border-[var(--line)] bg-white p-6"><Image src={item.url} alt={`${label} logo`} width={220} height={100} unoptimized={item.source === "local"} className="max-h-16 w-auto object-contain" /></div>;
  })}</div>;
}
