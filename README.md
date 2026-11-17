# Portfolio

Personal portfolio built with SvelteKit, Svelte 5 and Tailwind CSS 4. Uses **pnpm**.

## Commands

```sh
pnpm install          # install dependencies
pnpm dev              # start the dev server (add -- --open to open a browser)
pnpm check            # type-check
pnpm format           # format with Prettier
pnpm build            # production build
pnpm preview          # preview the production build
```

## Editing content

All copy, links and lists live in `src/lib/data/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, role, bio, email, socials, nav links |
| `experience.ts` | Work history and education timelines |
| `projects.ts` | Projects (`featured: true` shows on the home page) |
| `stack.ts` | Tech-stack icon cloud (icons from simpleicons.org) |
| `services.ts` | Services, pricing and plans |
| `requirements.ts` | Get Started intro and form questions |

Project screenshots go in `static/projects/`.

## Structure

- `src/routes/` — pages (URLs)
- `src/Pages/<page>/` — page-specific sections (imported as `#pages/...`)
- `src/lib/components/custom/` — shared UI; `src/lib/components/layout/` — navbar, footer, logo
- `src/layout.css` — theme (monochrome colour tokens, light default + dark mode), font
- `.claude/skills/` — design specs for each page
