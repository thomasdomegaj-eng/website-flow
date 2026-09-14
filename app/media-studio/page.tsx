import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaStudio } from "@/components/media-studio";
import { localMediaStudioEnabled } from "@/lib/project-media";

export const metadata: Metadata = {
  title: "Media Studio",
  robots: { index: false, follow: false },
};

export default function MediaStudioPage() {
  if (!localMediaStudioEnabled()) notFound();
  return <MediaStudio />;
}
