import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, ShoppingBag, Star, ArrowRight, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { getRecommendations } from '../lib/api'

const AIRecommendations = () => {
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null)
  const [savedOutfits, setSavedOutfits] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const storedPrefs = localStorage.getItem('userPreferences')
        const prefs = storedPrefs ? JSON.parse(storedPrefs) : {}

        const data = await getRecommendations(prefs)

        // Map API data to UI format
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.category ? (item.category.charAt(0).toUpperCase() + item.category.slice(1)) : 'Stylish Look',
          price: item.price_range?.min ? `$${item.price_range.min}` : 'Price Varies',
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          image: item.images?.main || 'https://via.placeholder.com/400',
          description: `A perfect ${item.style_tags?.[0] || 'stylish'} look for your ${item.occasions?.[0] || 'day'}.`,
          accessories: item.items?.map((i: any) => i.type).join(', ') || 'Matching accessories',
          occasion: item.occasions?.[0] ? (item.occasions[0].charAt(0).toUpperCase() + item.occasions[0].slice(1)) : 'Any Occasion',
          why: `Selected based on your preference for ${prefs.occasion || 'style'} and ${prefs.colorPreference || 'fashion'}.`
        }))

        setRecommendations(mapped)
      } catch (err) {
        console.error("Failed to load recommendations", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecs()
  }, [])

  const toggleSave = (id: string) => {
    setSavedOutfits(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const selectedData = recommendations.find(o => o.id === selectedOutfit)

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } } }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .outfit-card {
          border: 1px solid rgba(245,240,235,0.07);
          background: rgba(245,240,235,0.02);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s;
          position: relative;
        }
        .outfit-card:hover { border-color: rgba(201,169,110,0.35); }
        .outfit-card.selected { border-color: #c9a96e; }

        .card-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .outfit-card:hover .card-img { transform: scale(1.03); }

        .save-btn {
          position: absolute;
          top: 14px; right: 14px;
          width: 36px; height: 36px;
          background: rgba(10,10,10,0.75);
          border: 1px solid rgba(245,240,235,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          z-index: 2;
        }
        .save-btn:hover { border-color: #c9a96e; background: rgba(10,10,10,0.92); }
        .save-btn.saved { border-color: #c9a96e; background: rgba(201,169,110,0.15); }

        .price-badge {
          position: absolute;
          bottom: 14px; left: 14px;
          background: rgba(10,10,10,0.8);
          border: 1px solid rgba(201,169,110,0.35);
          padding: 5px 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          color: #c9a96e;
          z-index: 2;
        }

        .card-body { padding: 24px; }

        .view-btn {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(245,240,235,0.1);
          color: #f5f0eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 12px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: border-color 0.25s, background 0.25s, color 0.25s;
          margin-top: 18px;
        }
        .view-btn:hover, .outfit-card.selected .view-btn {
          border-color: #c9a96e;
          background: rgba(201,169,110,0.07);
          color: #c9a96e;
        }

        /* Detail panel */
        .detail-panel {
          background: rgba(245,240,235,0.02);
          border: 1px solid rgba(245,240,235,0.07);
          padding: 40px;
          position: sticky;
          top: 48px;
        }

        .detail-section {
          padding: 20px 0;
          border-bottom: 1px solid rgba(245,240,235,0.06);
        }
        .detail-section:last-of-type { border-bottom: none; }

        .detail-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.3);
          margin-bottom: 8px;
        }

        .shop-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #f5f0eb;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px 28px;
          border: none; cursor: pointer;
          transition: background 0.25s;
        }
        .shop-btn:hover { background: #c9a96e; }

        .empty-state {
          background: rgba(245,240,235,0.02);
          border: 1px dashed rgba(245,240,235,0.1);
          padding: 80px 40px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          position: sticky; top: 48px;
        }

        .noise-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.025; pointer-events: none; z-index: 999;
        }
      `}</style>

      <div className="noise-overlay" />
      <Sidebar />

      <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span className="section-label">AI Stylist</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Curated <em style={{ color: '#c9a96e' }}>For You.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: 0 }}>
              Personalised styling suggestions based on your preferences and body type.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'start' }}>

            {/* ── Outfit Grid ── */}
            <div>
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Recommended for You</span>
                <div style={{ marginLeft: 'auto', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(245,240,235,0.25)', letterSpacing: '0.1em' }}>
                  {loading ? 'Thinking...' : `${recommendations.length} looks`}
                </div>
              </motion.div>

              {loading ? (
                <div className="text-gray-500 py-12 text-center">Analysing style preferences...</div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
                >
                  {recommendations.map((outfit, i) => (
                    <motion.div
                      key={outfit.id}
                      variants={fadeUp}
                      className={`outfit-card ${selectedOutfit === outfit.id ? 'selected' : ''}`}
                      onClick={() => setSelectedOutfit(outfit.id)}
                    >
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <img src={outfit.image} alt={outfit.name} className="card-img" />

                        {/* Save button */}
                        <button
                          className={`save-btn ${savedOutfits.includes(outfit.id) ? 'saved' : ''}`}
                          onClick={e => { e.stopPropagation(); toggleSave(outfit.id) }}
                        >
                          <Heart
                            size={15}
                            color={savedOutfits.includes(outfit.id) ? '#c9a96e' : 'rgba(245,240,235,0.6)'}
                            fill={savedOutfits.includes(outfit.id) ? '#c9a96e' : 'transparent'}
                          />
                        </button>

                        <div className="price-badge">{outfit.price}</div>
                      </div>

                      <div className="card-body">
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
                            {outfit.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, marginLeft: 8 }}>
                            <Star size={12} color="#c9a96e" fill="#c9a96e" />
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.4)' }}>{outfit.rating}</span>
                          </div>
                        </div>

                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: '0 0 8px', lineHeight: 1.5 }}>
                          {outfit.description}
                        </p>

                        <div style={{ display: 'inline-block', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', padding: '3px 10px' }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a96e' }}>
                            {outfit.occasion}
                          </span>
                        </div>

                        <button className="view-btn">
                          View Details <ArrowRight size={11} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* ── Detail Panel ── */}
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
                  className="detail-panel"
                >
                  {/* Panel header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                      <span className="section-label">Outfit Details</span>
                    </div>
                    <button
                      onClick={() => setSelectedOutfit(null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,235,0.3)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.3)')}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Image */}
                  <div style={{ position: 'relative', marginBottom: 28, overflow: 'hidden' }}>
                    <img src={selectedData.image} alt={selectedData.name} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, margin: 0, lineHeight: 1, color: '#f5f0eb' }}>
                        {selectedData.name}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Star size={13} color="#c9a96e" fill="#c9a96e" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(245,240,235,0.7)' }}>{selectedData.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="detail-section">
                    <div className="detail-label">Description</div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, lineHeight: 1.6, color: 'rgba(245,240,235,0.75)', margin: 0 }}>
                      {selectedData.description}
                    </p>
                  </div>

                  <div className="detail-section">
                    <div className="detail-label">Accessories & Footwear</div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,240,235,0.5)', margin: 0 }}>
                      {selectedData.accessories}
                    </p>
                  </div>

                  <div className="detail-section">
                    <div className="detail-label">Why This Outfit?</div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.65, color: 'rgba(245,240,235,0.65)', margin: 0 }}>
                      "{selectedData.why}"
                    </p>
                  </div>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}>
                    <div>
                      <div className="detail-label">Price</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: '#c9a96e', lineHeight: 1 }}>
                        {selectedData.price}
                      </div>
                    </div>
                    <button className="shop-btn">
                      <ShoppingBag size={14} />
                      Shop Look
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="empty-state"
                >
                  <div style={{ width: 56, height: 56, border: '1px solid rgba(201,169,110,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <Sparkles size={22} color="#c9a96e" style={{ opacity: 0.6 }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 12px' }}>
                    Select an <em style={{ color: '#c9a96e' }}>Outfit</em>
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(245,240,235,0.3)', margin: 0, lineHeight: 1.7, maxWidth: 220 }}>
                    Click any card to see detailed styling tips and AI insights.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIRecommendations