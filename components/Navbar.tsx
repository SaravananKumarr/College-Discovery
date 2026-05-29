'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('college-user')
    if (stored) setUser(JSON.parse(stored))
  }, [pathname])

  const logout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' })
    localStorage.removeItem('college-user')
    setUser(null)
    router.push('/')
  }

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: 22,
            color: '#1a3a5c',
            letterSpacing: '-0.5px'
          }}>
            College<span style={{ color: '#2563eb' }}>Scope</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/colleges" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: 14, padding: '8px 14px', borderRadius: 8, transition: 'background 0.2s' }}>
            Colleges
          </Link>
          <Link href="/compare" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: 14, padding: '8px 14px', borderRadius: 8 }}>
            Compare
          </Link>
          {user && (
            <Link href="/saved" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: 14, padding: '8px 14px', borderRadius: 8 }}>
              Saved
            </Link>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button onClick={logout} className="btn-outline" style={{ padding: '7px 16px', fontSize: 13 }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/login">
                <button className="btn-outline" style={{ padding: '7px 16px', fontSize: 13 }}>Login</button>
              </Link>
              <Link href="/register">
                <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 13 }}>Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
