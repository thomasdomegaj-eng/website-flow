# Contributor guidance

- Treat `PROJECT_SPEC.md` as the product source of truth and keep unresolved launch decisions visible.
- Use Australian English and do not add invented business claims, clients, metrics, testimonials or awards.
- Prefer React server components. Add `"use client"` only for interaction that cannot be expressed with the platform.
- Reuse CSS custom properties in `app/globals.css`; preserve visible focus states and reduced-motion support.
- Run `npm run typecheck`, `npm run lint` and `npm run build` before committing.
- Update `CHANGELOG.md` for user-visible changes and keep setup instructions current.
