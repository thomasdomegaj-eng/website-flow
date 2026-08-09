# Flowcoat media drop zone

Drop approved assets into the matching folder, commit them, and rebuild the site.

| Folder | Purpose | Recommended files |
|---|---|---|
| `brand/` | Supplied master logo and brand marks | SVG preferred; transparent PNG fallback |
| `projects/` | Production, process and finished-work photography | JPG, WebP or AVIF; descriptive filenames |
| `client-logos/` | Approved logos for the homepage logo wall | SVG or transparent PNG/WebP |
| `creative/` | General campaign imagery, video posters and social creative | JPG, WebP, AVIF |

Project photos and client logos are discovered automatically at build time. Supported gallery image extensions are `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif`. SVG client logos should be converted to a transparent WebP or PNG before use so uploaded SVG code is never executed in the page.

## Rules before adding media

1. Confirm written permission for customer names, products and logos.
2. Remove addresses, number plates, drawing details and other identifying information.
3. Use descriptive lower-case names, for example `black-textured-gate-01.webp`.
4. Strip metadata and optimise photographs before committing; aim for under 500 KB where practical.
5. Never place customer quote attachments here. This directory is public.
6. Add meaningful project metadata to a future CMS before publishing detailed case studies.
