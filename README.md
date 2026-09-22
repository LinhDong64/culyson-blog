This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
