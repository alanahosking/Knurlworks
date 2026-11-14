# KnurlWorks website: instructions for Claude

This repo is the KnurlWorks storefront (React + TypeScript + Vite + Tailwind, hosted on Vercel). The README covers the stack and structure. The rules below cover how to work here and how to keep the owner's task tracker current.

## Keep KnurlWorks HQ up to date (do this every session)

KnurlWorks HQ is the owner's private workstation and the single source of truth for what's done and what's next:
https://claude.ai/artifact/LcRxuA568pC8e56Wg4dvmi

At the end of any session that changes the site, its settings, or a decision, update HQ's database with the artifact data tool (`ArtifactData`, or `read_db` / `write_db`) using that URL. Then tell the owner in one line what you updated.

1. **Read first.** List the collection you're changing and use each document's `version` as `if_version` on every update. Never overwrite blind.
2. **Tasks** (collection `tasks`): mark finished work `done`, add new follow-up tasks, and add notes. Fields:
   - `title`: short, plain English
   - `area`: one of `Brand`, `Business`, `Tech`, `Email`, `Products`, `Sourcing`, `Copy`, `Compliance`, `Launch`
   - `status`: `todo`, `doing`, `done` or `blocked`
   - `priority`: `now`, `next`, `launch` or `later`
   - `notes`: what was done or what's needed
   - `updated`: `YYYY-MM-DD`
   - `order`: a number; keep related tasks near existing ones in the same area
   Prefer updating an existing task over adding a near-duplicate. Use a readable `doc_id` for new tasks, e.g. `tech-size-guide`.
3. **Decisions** (collection `decisions`): log choices the owner made, with `title`, `why`, `date`, `order`.
4. **Open questions** (collection `questions`): add anything that needs the owner's answer, with `question`, `detail`, `resolved: false`, `order`. When one is answered, set `resolved: true`, `answer`, `resolvedOn`.
5. **Never** read or write the `info` collection (private business details), delete the owner's tasks, or change the page itself. If the HQ tools aren't available in your session, say so and give the owner a short summary to paste into HQ's chat instead.

## Working rules

- **Pushing to `main` deploys to production immediately.** Make the change, run `npx tsc -b` and `npx vite build`, then wait for the owner to say "push it" before pushing to `main`. Permission doesn't carry over between requests. Use a feature branch for Vercel Preview testing.
- **Never type, paste, store or echo a Stripe key** (or any secret). Only the owner adds keys, directly in Vercel. Keep live keys out of Preview.
- **Checkout prices:** `api/create-checkout-session.ts` keeps its own copy of the product list on purpose, because importing local files crashed the Vercel function. When products, prices or sizes change in `src/lib/products.ts`, update the copy in the API file too.
- **Vercel functions** in `api/` must be single self-contained files with no first-party imports (see the note at the top of `api/create-checkout-session.ts`).
- **`/hq`** (`api/hq.ts`) is a password-protected owner page. It holds links only, never business data. Its password is the `HQ_PASSWORD` environment variable in Vercel.
- **After any tsconfig change**, check for stray build output: `find src -name "*.js" -o -name "*.d.ts"` should list only `src/vite-env.d.ts`.

## Brand and copy rules

- No em dashes in any customer-facing copy.
- Never use the name "RIOTWEAR".
- Voice: authentic, human, fun and casual, not corporate. Women-first, not women-only.
- No sustainability claims unless they can be backed up (ACCC greenwashing rules).
- Fonts: Jost (display), Inter (body and buttons), IBM Plex Mono (nav, labels, prices). Accent colour: rose `#B89687`.
