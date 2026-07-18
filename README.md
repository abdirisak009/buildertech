# Builders Tech — Design. Manage. Build.

Website for **Builders Tech**, a multidisciplinary design & construction
management firm in Stone Mountain, Georgia. Content is taken from the live site
at [builderstechnologysource.com](https://www.builderstechnologysource.com).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Animation | `motion` (Framer Motion) |
| Icons | `lucide-react` |
| Theming | `next-themes` (light / dark / system) |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` |

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — 25 routes, all static
npm run lint
```

## Brand

| Token | Value |
|---|---|
| Navy (primary) | `#0a2472` → `--color-navy-700` |
| Gold (accent) | `#ffba08` → `--color-gold-500` |
| Display font | Space Grotesk |
| Body font | Inter |

Full navy/gold ramps (50–950), semantic tokens and the light/dark blocks live in
[`src/app/globals.css`](src/app/globals.css). No component hardcodes a hex.

## Site map

```
/                              Home
/how-it-works                  4-step process
/services                      Overview
  /services/renderings
  /services/architectural-plans
  /services/structural-plans
  /services/civil-plans
  /services/stop-work-orders
  /services/project-management
  /services/construction       ← 7 pages from one [slug] route
/products
  /products/stock-plans        Filterable plan-set catalogue
/blog
  /blog/irc-code-updates       ┐ category pages from [category]
  /blog/design-trends          ┘
  /blog/[category]/[slug]      Article pages
/careers
  /careers/open-positions      4 roles
  /careers/internships         Youth development programme
/resources                     Vetted local provider directory (15 categories)
/faq                           ~40 questions in 11 groups
/about
/contact                       Validated project-brief form
/privacy-policy  /terms-of-use
```

## Navigation

Mirrors the live site exactly, including submenus:

| Menu | Submenu |
|---|---|
| How it Works | — |
| Services | Renderings · Architectural · Structural · Civil · Stop Work Orders · Project Management · Construction |
| Products | Stock Plans |
| Blog | IRC Code Updates · Design Trends |
| Careers | Current Open Positions · Internships |
| More | Building Resources · FAQ · About Us · Contact Us |

- **Desktop** — hover/focus dropdown panels with descriptions, gold top rule,
  keyboard accessible, Escape to close ([`DesktopNav.tsx`](src/components/layout/DesktopNav.tsx))
- **Mobile** — full-screen drawer with expanding accordion submenus
  ([`MobileNav.tsx`](src/components/layout/MobileNav.tsx))
- A utility bar above the header carries the phone number and office address.

## Project structure

```
src/
├── app/                    routes (see site map above)
├── components/
│   ├── layout/             Header, DesktopNav, MobileNav, Footer, Logo, theme
│   ├── motion/             Reveal, RevealGroup/Item, Counter
│   ├── sections/           HomeHero, CtaSection, ContactForm, Accordion, ProductGallery
│   └── ui/                 Button, Container, Section, PageHero
├── content/                ← ALL copy and data lives here
│   ├── site.ts             contact details, nav tree, stats
│   ├── services.ts         7 services, work categories, headline offers
│   ├── products.ts         stock plans
│   ├── blog.ts             posts + categories
│   ├── careers.ts          positions + internship programme
│   ├── resources.ts        provider directory
│   ├── faq.ts              11 groups / ~40 Q&As
│   ├── about.ts            story, philosophy, why-choose-us, testimonials
│   └── images.ts           photography map
└── lib/utils.ts            cn()
```

**All copy is data, not markup.** To change wording, edit `src/content/*`.

## Images

Served from `public/images` (16 files, 5.3 MB total) and optimised by
`next/image`. They were originally remote, but Next's image optimiser has a
fixed 7-second upstream fetch timeout and intermittently returned 500s on a cold
cache — hosting locally removed that failure mode entirely.

Sources are Pexels (free, no attribution required). **Replace them with Builders
Tech's own project photography** — keep the filenames and nothing else changes.

## Before launch

- [ ] **Contact form backend** — the form validates and shows the full success
      flow but does not send. Wire the `TODO` in
      [`ContactForm.tsx`](src/components/sections/ContactForm.tsx) to an API
      route or form service.
- [ ] **Cart / checkout** — stock plans show a "Purchase plan" button that links
      to contact. The live site has a real cart; wire up Stripe or your existing
      store if you want to sell directly here.
- [ ] **Blog posts** — the four articles are placeholders written in the firm's
      voice. The live site's blog sections were empty when this was built.
- [ ] **Photography** — replace `public/images/*` with real project photos.
- [ ] **Team** — the live About page names no team members; add them if wanted.
- [ ] **Social links** — currently `#` in `src/content/site.ts`.
- [ ] **Legal pages** — privacy policy and terms are template text and carry a
      visible notice saying so. Have an attorney review before launch.
- [ ] **`SITE.url`** — drives metadata, sitemap and robots.

## Verification

Automated pass across **25 routes × 3 viewports (390 / 768 / 1440) × 2 themes**
— 150 checks, all passing: HTTP 200, no console errors, no broken images, no
horizontal overflow, exactly one `<h1>` per page. Menus were driven end-to-end
(all five dropdowns open with the right item counts, close on mouse-out, and
navigate; the mobile accordion expands and closes on navigation).

Accessibility: skip link, sequential headings, labelled landmarks, ≥44px targets,
visible gold focus rings, `role="alert"` form errors with focus moved to the
first invalid field, and `prefers-reduced-motion` respected throughout.
# buildertech
