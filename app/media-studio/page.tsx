import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaStudio } from "@/components/media-studio";

export const metadata: Metadata = {
  title: "Local Media Studio",
  robots: { index: false, follow: false },
};

export default function MediaStudioPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <MediaStudio />;
}
