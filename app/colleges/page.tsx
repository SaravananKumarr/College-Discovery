'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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
  nirfRank: number | null
  naacGrade: string | null
  placements?: { avgPackage: number; placementRate: number }
}

function CollegesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [state, setState] = useState(searchParams.get('state') || '')
  const [type, setType] = useState('')
  const [sortBy, setSortBy] = useState('nirfRank')

  const fetchColleges = useCallback(async (pg = 1) => {
    setLoading(true)
    const params = new URLSearchParams({
      search, category, state, type, sortBy,
      page: String(pg), limit: '12'
    })
    const res = await fetch(`/api/colleges?${params}`)
    const data = await res.json()
    setColleges(data.colleges || [])
    setTotal(data.pagination?.total || 0)
    setTotalPages(data.pagination?.totalPages || 1)
    setPage(pg)
    setLoading(false)
  }, [search, category, state, type, sortBy])

  useEffect(() => { fetchColleges(1) }, [fetchColleges])

  const formatFees = (fees: number) => {
    if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L/yr`
    return `₹${(fees / 1000).toFixed(0)}K/yr`
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
          Explore Colleges
        </h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>{total} colleges found</p>
      </div>

      {/* Filters */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 28,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 14
      }}>
        <input
          placeholder="🔍 Search colleges..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {['Engineering', 'Medical', 'Commerce', 'Arts', 'Science', 'Law'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={state} onChange={e => setState(e.target.value)}>
          <option value="">All States</option>
          {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Telangana'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          {['Public', 'Private', 'Deemed'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="nirfRank">NIRF Rank</option>
          <option value="rating">Top Rated</option>
          <option value="fees_asc">Fees: Low to High</option>
          <option value="fees_desc">Fees: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#94a3b8' }}>Loading colleges...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {colleges.map(college => (
              <Link key={college.id} href={`/colleges/${college.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 24, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', lineHeight: 1.3, marginBottom: 4 }}>
                        {college.name}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: 13 }}>📍 {college.city}, {college.state}</p>
                    </div>
                    {college.nirfRank && (
                      <div style={{
                        background: '#eff6ff',
                        color: '#2563eb',
                        borderRadius: 8,
                        padding: '4px 10px',
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        marginLeft: 10
                      }}>
                        #{college.nirfRank} NIRF
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: '#f0fdf4', color: '#166534' }}>{college.type}</span>
                    <span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>{college.category}</span>
                    {college.naacGrade && (
                      <span className="badge" style={{ background: '#f3e8ff', color: '#7e22ce' }}>NAAC {college.naacGrade}</span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, padding: '14px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: 14 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{college.rating}★</div>
                      <div style={{ color: '#94a3b8', fontSize: 11 }}>{college.reviewCount} reviews</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{formatFees(college.fees)}</div>
                      <div style={{ color: '#94a3b8', fontSize: 11 }}>Annual Fees</div>
                    </div>
                    {college.placements && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{college.placements.avgPackage}L</div>
                        <div style={{ color: '#94a3b8', fontSize: 11 }}>Avg Package</div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#2563eb', fontWeight: 600, fontSize: 13 }}>View Details →</span>
                    {college.placements && (
                      <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>
                        {college.placements.placementRate}% placed
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => fetchColleges(p)}
                  style={{
                    width: 40, height: 40,
                    borderRadius: 8,
                    border: '1.5px solid',
                    borderColor: p === page ? '#2563eb' : '#e2e8f0',
                    background: p === page ? '#2563eb' : '#fff',
                    color: p === page ? '#fff' : '#64748b',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>}>
      <CollegesContent />
    </Suspense>
  )
}
