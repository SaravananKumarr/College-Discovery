'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'

interface College {
  id: string
  name: string
  location: string
  city: string
  state: string
  type: string
  category: string
  fees: number
  rating: number
  reviewCount: number
  established: number
  description: string
  naacGrade: string | null
  nirfRank: number | null
  website: string | null
  isSaved: boolean
  placements: {
    avgPackage: number
    highestPackage: number
    placementRate: number
    topRecruiters: string
  } | null
  courses: { id: string; name: string; duration: number; fees: number; seats: number }[]
  reviews: { id: string; rating: number; title: string; body: string; pros: string | null; cons: string | null; createdAt: string; user: { name: string } }[]
}

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview' | 'courses' | 'placements' | 'reviews'>('overview')
  const [saved, setSaved] = useState(false)
  const [savingLoading, setSavingLoading] = useState(false)
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', body: '', pros: '', cons: '' })
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [compareList, setCompareList] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('college-user')
    if (stored) setUser(JSON.parse(stored))
    const cmp = JSON.parse(localStorage.getItem('compare-list') || '[]')
    setCompareList(cmp)
    fetch(`/api/colleges/${id}`)
      .then(r => r.json())
      .then(data => {
        setCollege(data)
        setSaved(data.isSaved)
        setLoading(false)
      })
  }, [id])

  const toggleSave = async () => {
    if (!user) { router.push('/login'); return }
    setSavingLoading(true)
    const res = await fetch(`/api/colleges/${id}/save`, { method: 'POST' })
    const data = await res.json()
    setSaved(data.saved)
    setSavingLoading(false)
  }

  const addToCompare = () => {
    const current = JSON.parse(localStorage.getItem('compare-list') || '[]')
    if (current.includes(id)) {
      const updated = current.filter((c: string) => c !== id)
      localStorage.setItem('compare-list', JSON.stringify(updated))
      setCompareList(updated)
    } else if (current.length < 3) {
      const updated = [...current, id]
      localStorage.setItem('compare-list', JSON.stringify(updated))
      setCompareList(updated)
    }
  }

  const submitReview = async () => {
    if (!user) { router.push('/login'); return }
    setSubmitting(true)
    const res = await fetch(`/api/colleges/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewForm)
    })
    if (res.ok) {
      const review = await res.json()
      setCollege(prev => prev ? { ...prev, reviews: [review, ...prev.reviews] } : prev)
      setReviewForm({ rating: 5, title: '', body: '', pros: '', cons: '' })
    }
    setSubmitting(false)
  }

  if (loading) return <div style={{ padding: 80, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
  if (!college) return <div style={{ padding: 80, textAlign: 'center' }}>College not found</div>

  const formatFees = (fees: number) => `₹${(fees / 100000).toFixed(1)}L`
  const inCompare = compareList.includes(id)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)', borderRadius: 20, padding: '36px 40px', color: 'white', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>{college.type}</span>
              <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>{college.category}</span>
              {college.naacGrade && <span style={{ background: 'rgba(251,191,36,0.3)', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>NAAC {college.naacGrade}</span>}
            </div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, marginBottom: 8 }}>{college.name}</h1>
            <p style={{ opacity: 0.8, fontSize: 15 }}>📍 {college.location} • Est. {college.established}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={addToCompare} style={{
              background: inCompare ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.15)',
              color: 'white', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 10, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer'
            }}>
              {inCompare ? '✓ In Compare' : '+ Compare'}
            </button>
            <button onClick={toggleSave} disabled={savingLoading} style={{
              background: saved ? '#fbbf24' : 'rgba(255,255,255,0.15)',
              color: saved ? '#1a3a5c' : 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 10, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer'
            }}>
              {saved ? '❤️ Saved' : '🤍 Save'}
            </button>
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" style={{
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10,
                padding: '10px 18px', fontWeight: 600, fontSize: 13, textDecoration: 'none'
              }}>
                🌐 Website
              </a>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16, marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          {[
            { value: `${college.rating}★`, label: `${college.reviewCount} reviews` },
            { value: formatFees(college.fees), label: 'Annual Fees' },
            { value: college.nirfRank ? `#${college.nirfRank}` : 'N/A', label: 'NIRF Rank' },
            ...(college.placements ? [{ value: `${college.placements.avgPackage}L`, label: 'Avg Package' }] : []),
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#f1f5f9', borderRadius: 12, padding: 4 }}>
        {(['overview', 'courses', 'placements', 'reviews'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '10px 16px', borderRadius: 9, border: 'none',
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#2563eb' : '#64748b',
            fontWeight: tab === t ? 700 : 500,
            fontSize: 14, cursor: 'pointer',
            boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            textTransform: 'capitalize'
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>About {college.name}</h2>
          <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 15 }}>{college.description}</p>
        </div>
      )}

      {tab === 'courses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {college.courses.map(course => (
            <div key={course.id} className="card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{course.name}</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>{course.duration} year program • {course.seats} seats</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#2563eb' }}>{formatFees(course.fees)}/yr</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>per year</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'placements' && college.placements && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'Average Package', value: `${college.placements.avgPackage} LPA`, color: '#2563eb' },
            { label: 'Highest Package', value: `${college.placements.highestPackage} Cr`, color: '#10b981' },
            { label: 'Placement Rate', value: `${college.placements.placementRate}%`, color: '#f59e0b' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: 'Sora, sans-serif', marginBottom: 8 }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
          <div className="card" style={{ padding: 28, gridColumn: '1 / -1' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Top Recruiters</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {college.placements.topRecruiters.split(',').map(r => (
                <span key={r} className="badge" style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 14px', fontSize: 13 }}>{r.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'reviews' && (
        <div>
          {user && (
            <div className="card" style={{ padding: 28, marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 18 }}>Write a Review</h3>
              <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 150 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Rating</label>
                  <select value={reviewForm.rating} onChange={e => setReviewForm(p => ({ ...p, rating: Number(e.target.value) }))}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div style={{ flex: 3, minWidth: 250 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Title</label>
                  <input placeholder="Summary of your experience" value={reviewForm.title} onChange={e => setReviewForm(p => ({ ...p, title: e.target.value }))} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Review</label>
                <textarea rows={4} placeholder="Share your experience..." value={reviewForm.body} onChange={e => setReviewForm(p => ({ ...p, body: e.target.value }))} />
              </div>
              <button onClick={submitReview} disabled={submitting || !reviewForm.title || !reviewForm.body} className="btn-primary">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {college.reviews.map(review => (
              <div key={review.id} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#fbbf24' }}>{'★'.repeat(Math.round(review.rating))}</span>
                    <span style={{ marginLeft: 8, fontWeight: 600 }}>{review.title}</span>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>by {review.user.name}</span>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 14 }}>{review.body}</p>
              </div>
            ))}
            {college.reviews.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No reviews yet. Be the first!</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
