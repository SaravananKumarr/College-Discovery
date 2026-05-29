import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'CollegeScope — Discover Your Perfect College',
  description: 'Search, compare and find the best colleges in India',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
