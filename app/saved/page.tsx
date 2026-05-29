'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface College {
  id: string
  name: string
  city: string
  state: string
  type: string
  category: string
  fees: number
  rating: number
  nirfRank: number | null
  placements: { avgPackage: number; placementRate: number } | null
}

export default function SavedPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('college-user')
    if (!user) { router.push('/login'); return }
    fetch('/api/saved')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setColleges(data)
        setLoading(false)
      })
  }, [router])

  const formatFees = (fees: number) => `₹${(fees / 100000).toFixed(1)}L/yr`

  if (loading) return <div style={{ padding: 80, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Saved Colleges</h1>
      <p style={{ color: '#64748b', marginBottom: 32 }}>{colleges.length} colleges saved</p>

      {colleges.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤍</div>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#64748b' }}>No saved colleges yet</p>
          <Link href="/colleges">
            <button className="btn-primary" style={{ marginTop: 20 }}>Explore Colleges</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {colleges.map(c => (
            <Link key={c.id} href={`/colleges/${c.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#0f172a' }}>{c.name}</h3>
                <p style={{ color: '#64748b', fontSize: 13, marginBottom: 14 }}>📍 {c.city}, {c.state}</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <span className="badge" style={{ background: '#f0fdf4', color: '#166534' }}>{c.type}</span>
                  <span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>{c.category}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{c.rating}★</div>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{formatFees(c.fees)}</div>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>Fees</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
