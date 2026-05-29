# CollegeScope — College Discovery Platform

A full-stack college discovery platform built with **Next.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

## Features

- Search & filter colleges by name, city, category, type
- College detail pages with courses, placements, and reviews
- Side-by-side comparison of up to 3 colleges
- Save colleges to your account
- JWT-based authentication (register/login/logout)
- Write and read student reviews

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + React + TypeScript + TailwindCSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT + bcryptjs |
| Deployment | Vercel + Neon PostgreSQL |

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd college-discovery
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env`:
- `DATABASE_URL` — Free PostgreSQL from [neon.tech](https://neon.tech)
- `JWT_SECRET` — Any random string

### 4. Set up the database
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Run locally
```bash
npm run dev
```

## Deployment (Vercel + Neon)

1. Create a free DB at [neon.tech](https://neon.tech)
2. Run `vercel` to deploy
3. Add `DATABASE_URL` and `JWT_SECRET` in Vercel dashboard
4. Run `npx prisma db push && npx prisma db seed`

## Project Structure

```
app/
  api/auth/           # Login, register, logout
  api/colleges/       # List, detail, save, reviews
  api/saved/          # Saved colleges
  colleges/           # Listing + detail pages
  compare/            # Comparison page
  saved/              # Saved colleges page
  login/ register/    # Auth pages
components/Navbar.tsx
lib/prisma.ts + auth.ts
prisma/schema.prisma + seed.ts
```
