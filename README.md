<div align="center">

<br/>

```
 ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║     ██║     █████╗  ██║  ███╗█████╗  ╚█████╗ ██║   ██║██████╔╝█████╗  
██║     ██║   ██║██║     ██║     ██╔══╝  ██║   ██║██╔══╝   ╚═══██╗██║   ██║██╔═══╝ ██╔══╝  
╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╔╝███████╗██████╔╝╚██████╔╝██║     ███████╗
 ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═════╝  ╚═════╝ ╚═╝     ╚══════╝
```

**Discover. Compare. Decide.**

*A full-stack college discovery platform built for students who deserve better than spreadsheets.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 🎯 What is CollegeScope?

CollegeScope is a production-ready college discovery platform that helps students search, filter, compare, and save colleges — all in one place. No more juggling 10 browser tabs or outdated PDFs. Everything from placements to peer reviews lives here.

> Built with a modern stack: **Next.js App Router**, **Prisma ORM**, **PostgreSQL on Neon**, and **JWT authentication** — deployed to Vercel in minutes.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔍 **Smart Search & Filter** | Search colleges by name, city, category, or type with real-time results |
| 🏫 **Detailed College Pages** | Courses offered, placement stats, and campus overview — all in one view |
| ⚖️ **Side-by-Side Comparison** | Compare up to **3 colleges** simultaneously across key metrics |
| 🔖 **Save Colleges** | Bookmark colleges to your account for later review |
| 🔐 **JWT Authentication** | Secure register / login / logout with `bcryptjs`-hashed passwords |
| ⭐ **Student Reviews** | Read and write authentic student reviews per college |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                     CollegeScope                        │
├───────────────┬─────────────────────────────────────────┤
│  Frontend     │  Next.js 16 · React 19 · TailwindCSS 4  │
│  Backend      │  Next.js API Routes (App Router)         │
│  ORM          │  Prisma 6 + @prisma/adapter-pg           │
│  Database     │  PostgreSQL (Neon — serverless)          │
│  Auth         │  JSON Web Tokens · bcryptjs              │
│  Language     │  TypeScript 5 (strict mode)              │
│  Deployment   │  Vercel + Neon                           │
└───────────────┴─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
college-discovery/
│
├── app/
│   ├── api/
│   │   ├── auth/              # POST /register, /login, /logout
│   │   ├── colleges/          # GET /colleges, /colleges/:id
│   │   │   └── [id]/
│   │   │       ├── save/      # POST — save/unsave a college
│   │   │       └── reviews/   # GET, POST — college reviews
│   │   └── saved/             # GET — current user's saved list
│   │
│   ├── colleges/              # /colleges — listing page
│   │   └── [id]/              # /colleges/:id — detail page
│   ├── compare/               # /compare — side-by-side view
│   ├── saved/                 # /saved — bookmarked colleges
│   ├── login/                 # /login — auth page
│   └── register/              # /register — auth page
│
├── components/
│   └── Navbar.tsx             # Global navigation bar
│
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   └── auth.ts                # JWT helpers & middleware
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seeder script
│
├── next.config.ts
├── tailwind.config (via PostCSS)
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A free **PostgreSQL** database (we recommend [Neon](https://neon.tech) — no credit card needed)

---

### 1 — Clone the Repository

```bash
git clone https://github.com/your-username/college-discovery.git
cd college-discovery
```

### 2 — Install Dependencies

```bash
npm install
```

### 3 — Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
# PostgreSQL connection string (get a free one at neon.tech)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Any long random string — used to sign JWTs
JWT_SECRET="your-super-secret-key-here"
```

> 💡 **Tip:** Generate a strong secret with `openssl rand -base64 32`

### 4 — Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to your database
npx prisma db push

# Seed with sample colleges & data
npx prisma db seed
```

### 5 — Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live. 🎉

---

## ☁️ Deployment (Vercel + Neon)

CollegeScope is optimized for **zero-config Vercel deployment**.

```bash
# 1. Create a free database at https://neon.tech
#    Copy the connection string.

# 2. Deploy to Vercel
vercel

# 3. In the Vercel dashboard, add these environment variables:
#    DATABASE_URL = <your neon connection string>
#    JWT_SECRET   = <your random secret>

# 4. Push schema & seed the production DB
npx prisma db push
npx prisma db seed
```

That's it. Your app is live on a global CDN. ✅

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server at `localhost:3000` |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run seed` | Run the Prisma seeder (`ts-node prisma/seed.ts`) |

---

## 🔌 API Reference

### Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | `{ name, email, password }` | Create a new account |
| `POST` | `/api/auth/login` | `{ email, password }` | Login, receive JWT cookie |
| `POST` | `/api/auth/logout` | — | Clear auth cookie |

### Colleges

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/colleges` | List all colleges (supports `?search=`, `?city=`, `?type=`) |
| `GET` | `/api/colleges/:id` | Full detail for one college |
| `POST` | `/api/colleges/:id/save` | Save / unsave a college (auth required) |
| `GET` | `/api/colleges/:id/reviews` | Get reviews for a college |
| `POST` | `/api/colleges/:id/reviews` | Submit a review (auth required) |

### Saved

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/saved` | Get current user's saved colleges (auth required) |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

Please make sure `npm run lint` passes before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using [Next.js](https://nextjs.org) · [Prisma](https://prisma.io) · [Neon](https://neon.tech) · [Vercel](https://vercel.com)

</div>