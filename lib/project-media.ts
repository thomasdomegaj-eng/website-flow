import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const MAX_FILES_PER_UPLOAD = 25;

export type MediaCollection = "projects" | "client-logos";

export type ProjectMediaItem = {
  name: string;
  url: string;
  source: "bundled" | "local";
  collection: MediaCollection;
};

export function parseMediaCollection(value: unknown): MediaCollection {
  return value === "client-logos" ? "client-logos" : "projects";
}

export function localMediaStudioEnabled() {
  if (process.env.NODE_ENV !== "production") return true;
  return Boolean(process.env.FLOWCOAT_MEDIA_DIR?.trim());
}

function localMediaRoot() {
  return process.env.FLOWCOAT_MEDIA_DIR?.trim() || path.join(os.homedir(), ".flowcoat-media");
}

export function localMediaDirectory(collection: MediaCollection) {
  return path.join(localMediaRoot(), collection);
}

export function localProjectMediaDirectory() {
  return localMediaDirectory("projects");
}

function bundledMediaDirectory(collection: MediaCollection) {
  return path.join(process.cwd(), "public", "assets", collection);
}

function hasSupportedExtension(name: string) {
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

async function imageNames(directory: string) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && hasSupportedExtension(entry.name))
      .map((entry) => entry.name);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

export async function listProjectMedia(limit?: number, collection: MediaCollection = "projects"): Promise<ProjectMediaItem[]> {
  const [local, bundled] = await Promise.all([
    localMediaStudioEnabled() ? imageNames(localMediaDirectory(collection)) : Promise.resolve([]),
    imageNames(bundledMediaDirectory(collection)),
  ]);

  const localItems: ProjectMediaItem[] = local
    .sort((a, b) => b.localeCompare(a))
    .map((name) => ({
      name,
      source: "local",
      collection,
      url: `/api/project-media/file?collection=${encodeURIComponent(collection)}&name=${encodeURIComponent(name)}`,
    }));

  const localNames = new Set(local);
  const bundledItems: ProjectMediaItem[] = bundled
    .filter((name) => !localNames.has(name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      name,
      source: "bundled",
      collection,
      url: `/assets/${collection}/${encodeURIComponent(name)}`,
    }));

  const items = [...localItems, ...bundledItems];
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

function safeBaseName(originalName: string, collection: MediaCollection) {
  const extension = path.extname(originalName).toLowerCase();
  const stem = path.basename(originalName, extension)
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || (collection === "client-logos" ? "client-logo" : "project-image");
  return { stem, extension };
}

export function validateProjectMediaFiles(files: File[]) {
  if (!files.length) return "Choose at least one image.";
  if (files.length > MAX_FILES_PER_UPLOAD) return `Upload up to ${MAX_FILES_PER_UPLOAD} images at once.`;

  for (const file of files) {
    const extension = path.extname(file.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(extension)) return `${file.name}: unsupported file type.`;
    if (file.type && !IMAGE_MIME_TYPES.has(file.type)) return `${file.name}: unsupported image format.`;
    if (file.size > MAX_FILE_BYTES) return `${file.name}: files must be 20 MB or smaller.`;
  }

  return null;
}

export async function saveProjectMedia(file: File, collection: MediaCollection = "projects") {
  const directory = localMediaDirectory(collection);
  await fs.mkdir(directory, { recursive: true });

  const { stem, extension } = safeBaseName(file.name, collection);
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}-${stem}${extension}`;
  const destination = path.join(directory, name);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(destination, bytes, { flag: "wx" });

  return {
    name,
    source: "local" as const,
    collection,
    url: `/api/project-media/file?collection=${encodeURIComponent(collection)}&name=${encodeURIComponent(name)}`,
  };
}

export async function deleteProjectMedia(name: string, collection: MediaCollection = "projects") {
  if (path.basename(name) !== name || !hasSupportedExtension(name)) throw new Error("Invalid media name.");
  await fs.unlink(path.join(localMediaDirectory(collection), name));
}

export async function readProjectMedia(name: string, collection: MediaCollection = "projects") {
  if (!localMediaStudioEnabled()) return null;
  if (path.basename(name) !== name || !hasSupportedExtension(name)) return null;

  try {
    const bytes = await fs.readFile(path.join(localMediaDirectory(collection), name));
    const extension = path.extname(name).toLowerCase();
    const type = extension === ".png"
      ? "image/png"
      : extension === ".webp"
        ? "image/webp"
        : extension === ".avif"
          ? "image/avif"
          : "image/jpeg";
    return { bytes, type };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return null;
    throw error;
  }
}
