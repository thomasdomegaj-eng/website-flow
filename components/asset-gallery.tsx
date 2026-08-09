import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
const extensions=new Set([".jpg",".jpeg",".png",".webp",".avif"]);
export function AssetGallery({folder="projects",limit}:{folder?:"projects"|"client-logos";limit?:number}){
  const dir=path.join(process.cwd(),"public","assets",folder);
  const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(file=>extensions.has(path.extname(file).toLowerCase())).sort().slice(0,limit):[];
  if(!files.length)return <div className="border border-dashed border-[var(--line)] bg-white/50 p-8 text-center"><p className="font-bold">Asset area ready</p><p className="mt-2 text-sm text-[var(--muted)]">Add approved {folder==="projects"?"project photos":"company logos"} to <code>public/assets/{folder}</code>. They will appear here on the next build.</p></div>;
  return <div className={folder==="client-logos"?"grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-3 lg:grid-cols-5":"grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>{files.map(file=>{const label=file.replace(/[-_]/g," ").replace(/\.[^.]+$/,"");return folder==="client-logos"?<div key={file} className="flex min-h-32 items-center justify-center border-b border-r border-[var(--line)] bg-white p-6"><Image src={`/assets/${folder}/${file}`} alt={`${label} logo`} width={220} height={100} className="max-h-16 w-auto object-contain"/></div>:<figure key={file} className="relative aspect-[4/3] overflow-hidden bg-[var(--steel)]"><Image src={`/assets/${folder}/${file}`} alt={label} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/></figure>})}</div>
}
