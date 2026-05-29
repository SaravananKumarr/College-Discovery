'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async () => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    localStorage.setItem('college-user', JSON.stringify(data.user))
    router.push('/')
    router.refresh()
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
      padding: 24
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 40 }}>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Create account</h1>
        <p style={{ color: '#64748b', marginBottom: 28, fontSize: 15 }}>Join CollegeScope and start your journey</p>

        {error && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" placeholder="Min 8 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && submit()} />
          </div>
          <button onClick={submit} disabled={loading || !form.name || !form.email || !form.password} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: 15, marginTop: 8 }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 14 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
