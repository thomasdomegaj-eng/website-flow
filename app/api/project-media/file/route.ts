import { parseMediaCollection, readProjectMedia } from "@/lib/project-media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const name = params.get("name") ?? "";
  const collection = parseMediaCollection(params.get("collection"));
  const media = await readProjectMedia(name, collection);
  if (!media) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(media.bytes), {
    headers: {
      "Content-Type": media.type,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
