'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
  naacGrade: string | null
  established: number
  placements: { avgPackage: number; highestPackage: number; placementRate: number } | null
}

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('compare-list') || '[]')
    setCompareIds(ids)
    fetchAllColleges()
  }, [])

  useEffect(() => {
    if (compareIds.length > 0) fetchCompareColleges()
    else setColleges([])
  }, [compareIds])

  const fetchAllColleges = async () => {
    const res = await fetch('/api/colleges?limit=100')
    const data = await res.json()
    setAllColleges(data.colleges || [])
  }

  const fetchCompareColleges = async () => {
    setLoading(true)
    const fetched = await Promise.all(compareIds.map(id => fetch(`/api/colleges/${id}`).then(r => r.json())))
    setColleges(fetched.filter(c => !c.error))
    setLoading(false)
  }

  const addToCompare = (id: string) => {
    if (compareIds.length >= 3 || compareIds.includes(id)) return
    const updated = [...compareIds, id]
    localStorage.setItem('compare-list', JSON.stringify(updated))
    setCompareIds(updated)
  }

  const removeFromCompare = (id: string) => {
    const updated = compareIds.filter(c => c !== id)
    localStorage.setItem('compare-list', JSON.stringify(updated))
    setCompareIds(updated)
    setColleges(prev => prev.filter(c => c.id !== id))
  }

  const clearAll = () => {
    localStorage.setItem('compare-list', '[]')
    setCompareIds([])
    setColleges([])
  }

  const filteredAll = allColleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) && !compareIds.includes(c.id)
  )

  const formatFees = (fees: number) => `₹${(fees / 100000).toFixed(1)}L/yr`

  const rows = [
    { label: 'Location', key: (c: College) => `${c.city}, ${c.state}` },
    { label: 'Type', key: (c: College) => c.type },
    { label: 'Category', key: (c: College) => c.category },
    { label: 'Annual Fees', key: (c: College) => formatFees(c.fees) },
    { label: 'Rating', key: (c: College) => `${c.rating}★` },
    { label: 'NIRF Rank', key: (c: College) => c.nirfRank ? `#${c.nirfRank}` : 'N/A' },
    { label: 'NAAC Grade', key: (c: College) => c.naacGrade || 'N/A' },
    { label: 'Established', key: (c: College) => String(c.established) },
    { label: 'Avg Package', key: (c: College) => c.placements ? `${c.placements.avgPackage} LPA` : 'N/A' },
    { label: 'Highest Package', key: (c: College) => c.placements ? `${c.placements.highestPackage} Cr` : 'N/A' },
    { label: 'Placement Rate', key: (c: College) => c.placements ? `${c.placements.placementRate}%` : 'N/A' },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Compare Colleges</h1>
          <p style={{ color: '#64748b' }}>Compare up to 3 colleges side by side</p>
        </div>
        {compareIds.length > 0 && (
          <button onClick={clearAll} className="btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }}>
            Clear All
          </button>
        )}
      </div>

      {/* Add colleges */}
      <div className="card" style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {compareIds.map(id => {
            const c = allColleges.find(x => x.id === id)
            return c ? (
              <div key={id} style={{ background: '#eff6ff', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#1d4ed8' }}>{c.name.split(' ').slice(0, 3).join(' ')}</span>
                <button onClick={() => removeFromCompare(id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}>×</button>
              </div>
            ) : null
          })}
          {compareIds.length < 3 && (
            <div style={{ color: '#94a3b8', fontSize: 14, display: 'flex', alignItems: 'center' }}>
              {compareIds.length === 0 ? 'No colleges selected' : `Add ${3 - compareIds.length} more`}
            </div>
          )}
        </div>
        <input
          placeholder="Search and add colleges to compare..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: search ? 12 : 0 }}
        />
        {search && (
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff' }}>
            {filteredAll.slice(0, 8).map(c => (
              <div key={c.id} onClick={() => { addToCompare(c.id); setSearch('') }}
                style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                <span style={{ color: '#94a3b8', marginLeft: 8 }}>{c.city}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {colleges.length >= 2 && (
        <div className="card" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a3a5c' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, fontSize: 13, width: 160 }}>Feature</th>
                {colleges.map(c => (
                  <th key={c.id} style={{ padding: '16px 20px', textAlign: 'center', color: 'white' }}>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                      {c.name.split(' ').slice(0, 4).join(' ')}
                    </div>
                    <Link href={`/colleges/${c.id}`} style={{ color: '#93c5fd', fontSize: 12, textDecoration: 'none' }}>View Details →</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: 13, color: '#475569' }}>{row.label}</td>
                  {colleges.map(c => (
                    <td key={c.id} style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 500, fontSize: 14, color: '#0f172a' }}>
                      {row.key(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {colleges.length < 2 && compareIds.length < 2 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: '#94a3b8' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#64748b' }}>Add at least 2 colleges to compare</p>
          <p style={{ marginTop: 8, fontSize: 14 }}>Search above or browse colleges and click "Compare"</p>
          <Link href="/colleges">
            <button className="btn-primary" style={{ marginTop: 20 }}>Browse Colleges</button>
          </Link>
        </div>
      )}
    </div>
  )
}
