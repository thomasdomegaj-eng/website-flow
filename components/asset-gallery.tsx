import { ClientLogoGallery } from "@/components/client-logo-gallery";
import { ProjectGallery } from "@/components/project-gallery";

export function AssetGallery({ folder = "projects", limit }: { folder?: "projects" | "client-logos"; limit?: number }) {
  if (folder === "client-logos") return <ClientLogoGallery limit={limit} />;
  return <ProjectGallery limit={limit} />;
}
