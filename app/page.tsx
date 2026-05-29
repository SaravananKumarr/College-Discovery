import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)',
        color: 'white',
        padding: '96px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: '6px 18px',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 24,
            backdropFilter: 'blur(8px)'
          }}>
            🎓 Discover 1000+ colleges across India
          </div>
          <h1 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: '-1px'
          }}>
            Find Your Perfect<br />
            <span style={{ color: '#fbbf24' }}>College Match</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 40, lineHeight: 1.6 }}>
            Compare colleges, explore placements, read real reviews, and make informed decisions about your education journey.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/colleges">
              <button style={{
                background: '#fbbf24',
                color: '#1a3a5c',
                border: 'none',
                borderRadius: 12,
                padding: '14px 32px',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}>
                Explore Colleges →
              </button>
            </Link>
            <Link href="/compare">
              <button style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 12,
                padding: '14px 32px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}>
                Compare Colleges
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { value: '1,200+', label: 'Colleges Listed' },
            { value: '50+', label: 'Cities Covered' },
            { value: '4.8★', label: 'Average Rating' },
            { value: '25K+', label: 'Student Reviews' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 800, color: '#2563eb', marginBottom: 6 }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>
            Browse by Category
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { emoji: '💻', label: 'Engineering', color: '#dbeafe', text: '#1d4ed8' },
              { emoji: '🏥', label: 'Medical', color: '#dcfce7', text: '#166534' },
              { emoji: '📊', label: 'Commerce', color: '#fef9c3', text: '#854d0e' },
              { emoji: '🎨', label: 'Arts', color: '#fce7f3', text: '#9d174d' },
              { emoji: '🔬', label: 'Science', color: '#f3e8ff', text: '#7e22ce' },
              { emoji: '⚖️', label: 'Law', color: '#ffedd5', text: '#9a3412' },
            ].map(cat => (
              <Link key={cat.label} href={`/colleges?category=${cat.label}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: cat.color,
                  borderRadius: 16,
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: `1px solid ${cat.color}`
                }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{cat.emoji}</div>
                  <div style={{ fontWeight: 700, color: cat.text, fontSize: 15 }}>{cat.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        color: 'white',
        padding: '72px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
            Ready to Find Your College?
          </h2>
          <p style={{ opacity: 0.75, fontSize: 16, marginBottom: 32 }}>
            Sign up for free to save colleges, compare shortlists, and get personalized recommendations.
          </p>
          <Link href="/register">
            <button style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '14px 36px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer'
            }}>
              Get Started Free →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
