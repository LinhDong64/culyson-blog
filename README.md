This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Strapi Data

Create `.env.local` with your Strapi connection settings:

```dotenv
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-read-only-api-token
```

`STRAPI_URL` is server-only. The existing `NEXT_PUBLIC_STRAPI_URL` setting is also supported as a fallback. Never expose the API token through a `NEXT_PUBLIC_` variable. Restart the development server after changing environment settings.

All category and article views read from `/api/categories` and `/api/articles`; local demo constants are no longer used. The token needs read access to categories, articles, and their populated relations. Publish records in Strapi to make them visible through its Content API.

Categories use `name`, `slug`, `description`, `alt`, and the `image` media relation. Articles use `title`, `slug`, `description`, `content`, `cover`, and the `category` relation. Optional fields include `coverAlt`, `readingTime`, `postedDate`, `author` (text or a relation with `name`), and `tags` (relations with `name`). Publication dates fall back to `publishedAt` and `createdAt`. Article `content` supports Markdown, Strapi Blocks rich text, or an array of paragraph strings. Both Strapi v4 wrapped responses and v5 flattened responses are normalized.

Categories are sorted by name; articles by publication date, then slug. The featured section uses up to three articles marked `featured` in Strapi. Category counts and load-more pagination come from Strapi, with four articles per page. Responses are revalidated every 60 seconds. Missing categories/articles return 404; load-more API failures return 502 and can be retried in the UI.

Images hosted at `STRAPI_URL` are allowed by the Next.js image configuration. Loopback image optimization is enabled only during development; production media should use a publicly reachable host. Add the media provider host to `images.remotePatterns` in `next.config.ts` if uploads use an external CDN.

Run the API mapping and pagination regression tests with `pnpm test`, and check types with `pnpm exec tsc --noEmit`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Structure
```text
src/
├── app/                    # App Router
│   ├── (auth)/             # Route Group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   └── auth/
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/             # Shared UI components
│   ├── ui/                 # button, modal, input...
│   ├── common/             # header, sidebar...
│   └── forms/
│
├── features/               # Business/domain modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── types.ts
│   │
│   └── user/
│       ├── components/
│       ├── services/
│       └── hooks/
│
├── lib/                    # Utilities / configs
│   ├── axios.ts
│   ├── fetcher.ts
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
│
├── hooks/                  # Shared hooks
│   ├── useDebounce.ts
│   └── useModal.ts
│
├── services/               # API clients
│   └── user.service.ts
│
├── stores/                 # Zustand/Jotai/Redux
│   └── auth.store.ts
│
├── types/
│   └── index.ts
│
├── constants/
│   └── index.ts
│
├── schemas/                # zod/yup schemas
│   └── auth.schema.ts
│
├── styles/
│   └── variables.css
│
└── middleware.ts
```
