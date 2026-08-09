# FLOWCOAT — Business, brand, content and website brief

This repository copy records the source-of-truth brief supplied by the business on 6 August 2026. If implementation copy conflicts with this document, this document wins.

## Business and positioning

FLOWCOAT is a Sydney-based commercial powder-coating business specialising in **powder coating of metal parts**. It serves fabricators, manufacturers, builders, architectural customers and customers with suitable custom work. It is not a flooring, plastic-coating, general painting or automotive-detailing business.

Relevant work includes architectural aluminium; mild, galvanised and stainless-steel components; aluminium and cast-aluminium components; gates; fencing; balustrades; long extrusions; welded assemblies; small components; repetitive production batches; custom jobs; wheels; and selected automotive parts. Automotive imagery must not dominate.

The business currently operates commercially through a rented Sydney factory and line. It is planning a new purpose-designed or purpose-selected facility for greater process control, material flow, finish consistency, contamination control, throughput, handling, safety, reliability and future automation. Planned machinery, dimensions and capabilities must never be described as operational.

Mission: **To deliver reliable, durable and consistently finished powder-coated metal components through careful preparation, controlled processes and responsive commercial service.**

Position FLOWCOAT as commercially capable, quality-conscious, modern, industrial, reliable, direct, technically competent and easy to deal with—not cheap, exaggerated, sterile, generic, automotive-only or overly futuristic. Compete on value and dependable relationships rather than lowest price.

## Audience and customer needs

Primary audiences are metal fabricators; component and equipment manufacturers; builders, shopfitters and architectural contractors; architects and specifiers; wheel/selected automotive customers; and smaller custom-work customers. Their concerns include finish consistency, lead times, communication, repeatability, scheduling, careful handling, colour, masking, preparation, packaging and getting a usable quotation for unusual work.

Describe these as customer concerns FLOWCOAT is designed to address, not as universal competitor failures.

## Goals and calls to action

Primary goal: qualified quote enquiries. Primary CTA: **Request a Quote**. Secondary CTA: **Call Flowcoat**, once a public number is confirmed. Other useful actions are Upload Drawings, View Our Work, Explore Services, Ask a Question and Learn How to Prepare Your Parts.

The site should establish credibility, explain capabilities and process, prepare customers, reduce incomplete enquiries, show approved finished work and support repeat commercial relationships.

## Public content rules

Use clear, practical Australian English: powder coating, metal parts/components, fabrications, production runs, custom jobs, preparation, pretreatment, powder application, curing, finish, colour, batch, quotation and project requirements.

Avoid cheap, instant, same-day, any-size, any-colour, all-metals, perfect-finish, zero-contamination, lifetime-warranty, blanket corrosion/environmental and unsupported technology claims. Never invent clients, reviews, metrics, awards, certifications, standards, warranty periods, equipment, address, delivery coverage, production volume or turnaround.

Colour/finish availability depends on manufacturer, quantity, coating system and stock. Large or long components must use: **Please contact us to discuss long or oversized components.** Do not publish planned 8-metre capability until commissioned, tested and approved.

## Information architecture

Launch pages: Home, Services, Capabilities, Industries/Who We Work With, Process, Projects/Gallery, Request a Quote, About, Contact, FAQ, Privacy, Terms and 404. Supporting content can include Colours and Finishes, Preparing Parts, Commercial Production, Large/Long Components, Quality Control, Service Area and Resources. Future architecture should allow accounts, job tracking, repeat orders, specifications, documents, payments, careers and case studies.

## Homepage content

Hero headline: **Commercial powder coating for metal parts.** State Sydney, custom fabrications, architectural metalwork and production batches. Then cover service categories, why FLOWCOAT, a clear process, real featured work, commercial production, quote preparation and a final CTA.

Required quote information: photos, drawings, dimensions, material, quantity, colour, finish, timeframe, existing surface and logistics requirements.

## Process and quality

Public process: job review; preparation planning; pretreatment/cleaning; masking/hanging; electrostatic application; controlled curing appropriate to powder and metal mass; cooling/inspection; protection and completion. Not every part follows an identical method.

Communicate quality through preparation, controlled pretreatment, contamination reduction, suitable film application, curing, careful handling, masking, inspection and protection—not superlatives. Any warranty depends on substrate, preparation, system, environment and specification; terms remain TBD.

## Planned facility

Internal provisional assumptions include a roughly 30 m × 20 m Sydney facility and a workflow from receiving and staging through five-tank pretreatment, drying, application, curing, cooling, inspection, packaging and dispatch. These dimensions and process specifics are not approved public claims. Automation, tracking, recipe controls and customer status are future possibilities only.

Current/historical operating figures supplied for architecture and planning are not approved for publication.

## Quote journey

Steps: contact; job type; parts/material/quantity/dimensions/weight and technical details; existing condition; colour/finish/environment/specification; timing and recurrence; logistics/packaging; secure uploads; review and consent.

The form should save progress locally, validate accessibly, work on mobile, recover from failure, generate a reference, acknowledge receipt and make clear that submission is not an accepted order. File handling requires private storage, signed URLs, extension and MIME validation, size limits, sanitised names, scanning, retention and access controls.

Approved success copy: **Thanks — your job details have been sent to Flowcoat. We will review the parts, preparation, finish, quantity and timing before contacting you. Your submission does not become an accepted order until the scope and quotation are confirmed.** Do not promise a response time.

## Projects, photography and logos

Use only real, approved work. Metadata should support title, customer permission, category, material, colour, finish, quantity, size, custom/production, preparation, challenge, solution, before/final images, video, date and featured status.

Do not reveal unapproved names, proprietary designs, addresses, number plates or drawings. Prefer finish close-ups, full context, before/after, hanging/process, batch consistency, packaging, workshop, team and scale. Avoid stock sparks, AI factories, unsafe practices and dirty imagery that undermines quality.

Client logos require permission. No “trusted by” logo may be added without evidence and approval in `CLAIMS_REGISTER.md`.

## Visual direction

Industrial strength, controlled precision, clean modern layout, strong typography, real material texture, confident space and subtle motion. Use grids, profiles, hanging rails, masking lines, technical dimensions and colour swatches subtly. Avoid repetitive cards, over-rounding, glassmorphism, glowing objects, heavy gradients, counters and control-panel cosplay.

Final colours and type must follow the supplied logo once placed in `public/assets/brand`. Meet WCAG 2.2 AA and include semantic colours and a visible focus colour. Mobile requires an accessible quote CTA, future phone CTA, manageable form steps, touch-friendly galleries and uploads, generous targets and lightweight motion.

## Technical, CMS and integrations

Preferred stack: Next.js App Router, strict TypeScript, Tailwind, accessible primitives, server components, Supabase where backend is required, Resend, Vercel and GitHub. Avoid unnecessary dependencies/global state; separate content/presentation; validate schemas and environment; use migrations; keep secrets server-side.

CMS types: services, projects, FAQs, approved testimonials, colours/finishes and global business settings. Future data types include quote enquiry, project, customer account and job record. Quote statuses can evolve from Draft/Submitted through review, quotation, production stages, completion or cancellation.

Analytics may track quote start/completion, phone/email clicks, uploads and project views, but never sensitive quote details. CRM integration must remain replaceable.

## SEO, accessibility, performance and security

Target Sydney commercial/industrial/metal/aluminium/steel/architectural/batch powder-coating themes without thin suburb pages. Once confirmed, establish accurate local business data. Structured data may include LocalBusiness, Service, FAQ, Breadcrumb, Image, Video and Organization; never fabricated AggregateRating.

Target WCAG 2.2 AA: landmarks, headings, keyboard support, skip link, focus, accessible menus/modals, labels, error summary/fields, contrast, targets, reduced motion, alt text, captions, non-colour status, upload controls and progress announcements.

Server-render content, minimise JS, optimise and size images, prevent shifts, lazy-load, subset fonts, use video posters, avoid heavy autoplay/3D/transitions and test on weak mobile connections.

Forms/uploads require server validation, rate limiting, spam controls, CSRF consideration, extension/MIME/size checks, private buckets, signed links, safe filenames, no execution and careful logs. Admin requires strong auth, roles, least privilege, audit logs, protected routes, RLS, backups and migrations.

Legal documents—including privacy, website/upload/trading/warranty and storage terms—require review by an Australian lawyer.

## Unresolved decisions and approval gates

TBD: legal entity, ABN, address/suburb, opening date, hours, phone, emails, service radius, delivery policy, minimums, turnaround/rush policy, physical limits, equipment, suppliers, powder brands, preparation/blasting/stripping/primer/masking/packaging, warranty, certifications, standards, environment/waste/quality documentation, testimonials, case studies, staff, social accounts, CMS/CRM, payment, portal and pricing.

Approval is required before publishing dimensions, warranties, turnaround, certifications or performance claims. Every public operational claim must be recorded with evidence, owner, status, review date, locations and disclaimer in `CLAIMS_REGISTER.md`.
