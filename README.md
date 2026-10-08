# Culyson Blog

A Next.js blog that reads categories and articles from Strapi.

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Create `.env.local` in the project root with your Strapi connection settings:

```dotenv
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-read-only-api-token
RESEND_EMAIL_API_TOKEN=your-resend-api-key
RESEND_FROM_EMAIL="Culyson <contact@your-verified-domain.com>"
CONTACT_EMAIL=mailinhdong@gmail.com
```

`STRAPI_URL` is server-only. `NEXT_PUBLIC_STRAPI_URL` is supported as a fallback, but never expose the API token through a `NEXT_PUBLIC_` variable. Restart the development server after changing environment settings.

The contact form sends messages through Resend. Verify the sender domain in Resend before setting `RESEND_FROM_EMAIL`; the API token, sender, and recipient are server-only settings.

## Project Structure

```text
src/
├── app/
│   ├── @footer/                  # Parallel footer slot
│   ├── @navbarHeader/            # Parallel navigation slot
│   ├── about/                    # About page
│   ├── api/categories/[slug]/posts/ # Category load-more API
│   ├── api/contact/              # Resend contact form API
│   ├── categories/
│   │   ├── [slug]/[postSlug]/    # Article detail route
│   │   ├── [slug]/               # Category detail route
│   │   └── page.tsx              # Category index route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Home route
├── components/
│   ├── common/                   # Shared blog components
│   └── ui/                       # Reusable UI primitives
├── features/
│   ├── categories/               # Category views and pagination
│   ├── home/                     # Home page sections
│   └── posts/                    # Article detail view
├── lib/
│   ├── strapi.ts                 # Strapi client and response mapping
│   └── utils.ts
├── types/index.ts                # Shared content and Strapi types
└── middleware.ts
tests/
└── strapi.test.mjs               # Strapi mapping and pagination tests
```

## Strapi Content

The server-side client requests categories from Strapi's `/api/categories` endpoint and articles from `/api/articles`. The local `/api/categories/[slug]/posts` route supports category load-more pagination. The Strapi token needs read access to categories, articles, and their populated relations; publish records in Strapi to make them available through the Content API.

Categories use `name`, `slug`, `description`, `alt`, and the `image` media relation. Articles use `title`, `slug`, `description`, `content`, `cover`, and the `category` relation. Optional article fields include `coverAlt`, `readingTime`, `postedDate`, `author` (text or a relation with `name`), `tags` (relations with `name`), and `featured`. Publication dates fall back to `publishedAt` and `createdAt`. Article content supports Markdown, Strapi Blocks rich text, or an array of paragraph strings. Strapi v4 wrapped and v5 flattened responses are normalized.

Categories are sorted by name; articles are sorted by publication date, then slug. The home page can show up to three articles marked `featured`. Category pagination uses four articles per page. Responses are revalidated every 60 seconds. Missing categories or articles return 404; load-more requests return 400 for invalid offsets, 404 for missing categories, and 502 when Strapi cannot be reached.

Images hosted at `STRAPI_URL` are allowed by the Next.js image configuration. Loopback image optimization is enabled only during development. Production media must use a publicly reachable host; add an external media host to `images.remotePatterns` in `next.config.ts` if needed.

## Checks

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm lint
```