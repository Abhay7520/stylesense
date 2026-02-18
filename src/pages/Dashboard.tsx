import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Upload, Sparkles, Camera, Heart, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const recentOutfits = [
    { id: 1, name: 'Summer Casual', occasion: 'Beach Day', rating: 4.5 },
    { id: 2, name: 'Business Chic', occasion: 'Office Meeting', rating: 4.8 },
    { id: 3, name: 'Evening Glam', occasion: 'Date Night', rating: 4.7 }
  ]

  const stats = [
    { label: 'Outfits Tried', value: '24', icon: Sparkles },
    { label: 'Images Uploaded', value: '8', icon: Upload },
    { label: 'Saved Looks', value: '15', icon: Heart },
    { label: 'Style Score', value: '92%', icon: TrendingUp }
  ]

  const quickActions = [
    { to: '/upload', icon: Upload, label: 'Upload New Photo', sub: 'Add to your wardrobe' },
    { to: '/tryon', icon: Camera, label: 'Virtual Try-On', sub: 'See it on you' },
    { to: '/recommendations', icon: Sparkles, label: 'AI Recommendations', sub: 'Curated for your style' }
  ]

  const activity = [
    { icon: Upload, text: 'Uploaded new photo for styling', time: '2 hours ago' },
    { icon: Sparkles, text: 'Received 5 new outfit recommendations', time: '5 hours ago' },
    { icon: Camera, text: 'Tried on virtual summer outfit', time: 'Yesterday' }
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .stat-card {
          background: rgba(245,240,235,0.03);
          border: 1px solid rgba(245,240,235,0.08);
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(201,169,110,0.35);
          background: rgba(201,169,110,0.04);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-card:hover::after { opacity: 1; }

        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border: 1px solid rgba(245,240,235,0.07);
          background: rgba(245,240,235,0.02);
          text-decoration: none;
          color: #f5f0eb;
          transition: border-color 0.25s, background 0.25s;
        }
        .action-row:hover {
          border-color: rgba(201,169,110,0.4);
          background: rgba(201,169,110,0.05);
        }
        .action-row:hover .action-arrow { color: #c9a96e; transform: translateX(4px); }
        .action-arrow { color: rgba(245,240,235,0.25); transition: color 0.25s, transform 0.25s; }

        .outfit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid rgba(245,240,235,0.06);
        }
        .outfit-row:last-child { border-bottom: none; }

        .panel {
          background: rgba(245,240,235,0.02);
          border: 1px solid rgba(245,240,235,0.07);
          padding: 36px;
        }

        .panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 300;
          margin: 0 0 28px;
          letter-spacing: '-0.01em';
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .noise-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 999;
        }

        .view-all-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c9a96e;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .view-all-link:hover { opacity: 1; }
      `}</style>

      <div className="noise-overlay" />

      <Sidebar />

      <div style={{ flex: 1, padding: '48px', overflowY: 'auto', maxWidth: 'calc(100vw - 260px)' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* ── Welcome ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span className="section-label">Dashboard</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Welcome back, <em style={{ color: '#c9a96e' }}>Sarah.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.45)', margin: 0 }}>
              Ready to discover your perfect style today?
            </p>
          </motion.div>

          {/* ── Stats ── */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="stat-card">
                  <Icon size={18} color="#c9a96e" style={{ marginBottom: 20, opacity: 0.8 }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 300, lineHeight: 1, marginBottom: 8 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.35)' }}>
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* ── Middle row ── */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

            {/* Quick Actions */}
            <div className="panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Quick Actions</span>
              </div>
              <h2 className="panel-title">What would you<br /><em style={{ color: '#c9a96e' }}>like to do?</em></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link key={action.to} to={action.to} className="action-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 36, height: 36, border: '1px solid rgba(245,240,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={16} color="rgba(245,240,235,0.5)" />
                        </div>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{action.label}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(245,240,235,0.3)' }}>{action.sub}</div>
                        </div>
                      </div>
                      <ArrowRight size={15} className="action-arrow" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Recent Outfits */}
            <div className="panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Recent Outfits</span>
              </div>
              <h2 className="panel-title">Your latest<br /><em style={{ color: '#c9a96e' }}>looks.</em></h2>
              <div>
                {recentOutfits.map((outfit) => (
                  <div key={outfit.id} className="outfit-row">
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, marginBottom: 4 }}>{outfit.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.3)' }}>{outfit.occasion}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ fontSize: 11, color: i < Math.floor(outfit.rating) ? '#c9a96e' : 'rgba(245,240,235,0.12)' }}>★</span>
                        ))}
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.35)' }}>{outfit.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/recommendations" className="view-all-link">
                View All Outfits <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

          {/* ── Activity Feed ── */}
          <motion.div variants={fadeUp} className="panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Recent Activity</span>
              </div>
              <Clock size={14} color="rgba(245,240,235,0.2)" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
              {activity.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} style={{ padding: '24px 32px', borderLeft: i !== 0 ? '1px solid rgba(245,240,235,0.06)' : 'none', position: 'relative' }}>
                    {/* Timeline dot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 32, height: 32, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} color="#c9a96e" />
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.2)' }}>{item.time}</span>
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.5, color: 'rgba(245,240,235,0.7)', margin: 0 }}>{item.text}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard