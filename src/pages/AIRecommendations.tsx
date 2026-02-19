import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, ShoppingBag, Star, ArrowRight, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'
import { loadLocalDataset, BODY_TYPE_COLUMNS, FashionItem } from '../utils/csv'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`

// Fallback Unsplash images per category
const FALLBACK_IMAGES: Record<string, string> = {
  dress: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=400',
  jeans: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=400',
  top: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400',
  jacket: 'https://images.unsplash.com/photo-1548231333-8208479e0063?auto=format&fit=crop&q=80&w=400',
}

interface RecommendedOutfit {
  id: string
  name: string
  category: string
  subcategory: string
  occasions: string[]
  image: string
  bodyTypes: string[]
  score: number
}

function datasetToOutfit(item: FashionItem): RecommendedOutfit {
  const bodyTypes: string[] = []
  if (item.body_pear) bodyTypes.push('pear')
  if (item.body_rectangle) bodyTypes.push('rectangle')
  if (item.body_hourglass) bodyTypes.push('hourglass')
  if (item.body_invertedtriangle) bodyTypes.push('inverted_triangle')

  return {
    id: item.id,
    name: `${item.subcategory} ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`,
    category: item.category,
    subcategory: item.subcategory,
    occasions: item.occasion.split(',').map(s => s.trim()),
    image: FALLBACK_IMAGES[item.category] || FALLBACK_IMAGES.dress,
    bodyTypes,
    score: 0,
  }
}

const AIRecommendations = () => {
  const { state, toggleSavedOutfit, isOutfitSaved, incrementStat, addActivity } = useApp()
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<RecommendedOutfit[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<'dataset' | 'empty'>('dataset')

  useEffect(() => {
    const generateRecommendations = async () => {
      setLoading(true)

      const rawData = await loadLocalDataset()
      let pool: RecommendedOutfit[] = []

      if (rawData && rawData.length > 0) {
        setDataSource('dataset')
        pool = rawData.map(datasetToOutfit)
      } else {
        setDataSource('empty')
        pool = []
      }

      await new Promise(r => setTimeout(r, 1200))

      const prefs = state.preferences || {}
      const occasion = (prefs as any).occasion as string | undefined
      const bodyType = (prefs as any).bodyType as string | undefined

      const scored = pool.map(item => {
        let score = 0
        // Occasion match: +5
        if (occasion && item.occasions.some(o => o.toLowerCase() === occasion.toLowerCase())) score += 5
        // Body type match: +8 (primary signal)
        if (bodyType && item.bodyTypes.includes(bodyType)) score += 8
        // Small random tiebreaker
        score += Math.random() * 1.5
        return { ...item, score }
      })

      const sorted = scored.sort((a, b) => b.score - a.score)
      setRecommendations(sorted)
      setLoading(false)

      addActivity(`AI recommendations generated (${dataSource === 'dataset' ? 'Fashion Dataset' : 'No data'})`, 'Sparkles')
      if (state.stats.outfitsTried === 0) incrementStat('outfitsTried')
    }

    generateRecommendations()
  }, [state.preferences])

  const handleSave = (e: React.MouseEvent, outfit: RecommendedOutfit) => {
    e.stopPropagation()
    toggleSavedOutfit({ id: outfit.id, name: outfit.name, image: outfit.image, price: '' })
  }

  const selectedData = recommendations.find(o => o.id === selectedOutfit)
  const prefs = state.preferences || {}
  const userBodyType = (prefs as any).bodyType as string | undefined

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } } }

  const bodyTypeLabel: Record<string, string> = {
    pear: 'Pear',
    rectangle: 'Rectangle',
    hourglass: 'Hourglass',
    inverted_triangle: 'Inverted Triangle',
  }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a96e; }
        .outfit-card { border: 1px solid rgba(245,240,235,0.07); background: rgba(245,240,235,0.02); overflow: hidden; cursor: pointer; transition: border-color 0.3s; position: relative; }
        .outfit-card:hover { border-color: rgba(201,169,110,0.35); }
        .outfit-card.selected { border-color: #c9a96e; }
        .card-img { width: 100%; height: 240px; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .outfit-card:hover .card-img { transform: scale(1.03); }
        .save-btn { position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; background: rgba(10,10,10,0.75); border: 1px solid rgba(245,240,235,0.15); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; z-index: 2; }
        .save-btn:hover { border-color: #c9a96e; background: rgba(10,10,10,0.92); }
        .save-btn.saved { border-color: #c9a96e; background: rgba(201,169,110,0.15); }
        .card-body { padding: 20px; }
        .view-btn { width: 100%; background: transparent; border: 1px solid rgba(245,240,235,0.1); color: #f5f0eb; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: border-color 0.25s, background 0.25s, color 0.25s; margin-top: 16px; }
        .view-btn:hover, .outfit-card.selected .view-btn { border-color: #c9a96e; background: rgba(201,169,110,0.07); color: #c9a96e; }
        .detail-panel { background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.07); padding: 40px; position: sticky; top: 48px; }
        .detail-section { padding: 20px 0; border-bottom: 1px solid rgba(245,240,235,0.06); }
        .detail-section:last-of-type { border-bottom: none; }
        .detail-label { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,240,235,0.3); margin-bottom: 8px; }
        .shop-btn { display: inline-flex; align-items: center; gap: 10px; background: #f5f0eb; color: #0a0a0a; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 28px; border: none; cursor: pointer; transition: background 0.25s; }
        .shop-btn:hover { background: #c9a96e; }
        .empty-state { background: rgba(245,240,235,0.02); border: 1px dashed rgba(245,240,235,0.1); padding: 80px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: sticky; top: 48px; }
        .noise-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E"); opacity: 0.025; pointer-events: none; z-index: 999; }
        .ai-pulse { display: inline-block; width: 8px; height: 8px; background: #c9a96e; border-radius: 50%; animation: pulse 1.5s infinite; margin-right: 8px; }
        .match-badge { background: rgba(201,169,110,0.12); border: 1px solid rgba(201,169,110,0.3); padding: 2px 8px; display: inline-flex; align-items: center; gap: 4px; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
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
              Personalised styling suggestions based on your body type and occasion.
            </p>
            {userBodyType && (
              <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div className="match-badge">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a96e' }}>
                    Body: {bodyTypeLabel[userBodyType] || userBodyType}
                  </span>
                </div>
                {(prefs as any).occasion && (
                  <div className="match-badge">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a96e' }}>
                      Occasion: {(prefs as any).occasion}
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'start' }}>

            {/* Outfit Grid */}
            <div>
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Recommended for You</span>
                {loading && (
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <span className="ai-pulse" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#c9a96e' }}>ANALYZING...</span>
                  </div>
                )}
              </motion.div>

              {loading ? (
                <div style={{ padding: '60px 0', border: '1px dashed rgba(245,240,235,0.1)', textAlign: 'center' }}>
                  <div style={{ marginBottom: 20 }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
                      <Sparkles size={32} color="#c9a96e" style={{ opacity: 0.5 }} />
                    </motion.div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'rgba(245,240,235,0.6)' }}>Finding your perfect match...</div>
                </div>
              ) : recommendations.length === 0 ? (
                <div style={{ padding: '60px 0', border: '1px dashed rgba(245,240,235,0.1)', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(245,240,235,0.3)' }}>No recommendations found. Try updating your preferences.</p>
                </div>
              ) : (
                <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {recommendations.map((outfit) => {
                    const isBodyMatch = userBodyType && outfit.bodyTypes.includes(userBodyType)
                    return (
                      <motion.div
                        key={outfit.id}
                        variants={fadeUp}
                        className={`outfit-card ${selectedOutfit === outfit.id ? 'selected' : ''}`}
                        onClick={() => setSelectedOutfit(outfit.id)}
                      >
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <img src={outfit.image} alt={outfit.name} className="card-img" />
                          <button className={`save-btn ${isOutfitSaved(outfit.id) ? 'saved' : ''}`} onClick={(e) => handleSave(e, outfit)}>
                            <Heart size={15} color={isOutfitSaved(outfit.id) ? '#c9a96e' : 'rgba(245,240,235,0.6)'} fill={isOutfitSaved(outfit.id) ? '#c9a96e' : 'transparent'} />
                          </button>
                          {isBodyMatch && (
                            <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(201,169,110,0.9)', padding: '3px 8px', zIndex: 2 }}>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', fontWeight: 600 }}>✓ Body Match</span>
                            </div>
                          )}
                        </div>

                        <div className="card-body">
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, margin: 0, lineHeight: 1.15 }}>{outfit.name}</h3>
                          </div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'rgba(245,240,235,0.35)', margin: '0 0 10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {outfit.category}
                          </p>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {outfit.occasions.slice(0, 2).map(occ => (
                              <div key={occ} style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', padding: '2px 8px' }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a96e' }}>{occ}</span>
                              </div>
                            ))}
                          </div>
                          <button className="view-btn">View Details <ArrowRight size={11} /></button>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </div>

            {/* Detail Panel */}
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                      <span className="section-label">Outfit Details</span>
                    </div>
                    <button onClick={() => setSelectedOutfit(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,235,0.3)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.3)')}>
                      <X size={16} />
                    </button>
                  </div>

                  <div style={{ position: 'relative', marginBottom: 28, overflow: 'hidden' }}>
                    <img src={selectedData.image} alt={selectedData.name} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: 0, lineHeight: 1, color: '#f5f0eb' }}>{selectedData.name}</h2>
                    </div>
                  </div>

                  <div className="detail-section">
                    <div className="detail-label">Style Details</div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, lineHeight: 1.6, color: 'rgba(245,240,235,0.75)', margin: 0 }}>
                      {selectedData.subcategory} {selectedData.category} — a carefully curated piece for your wardrobe.
                    </p>
                  </div>

                  <div className="detail-section">
                    <div className="detail-label">Why This Fits You</div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,240,235,0.5)', margin: 0 }}>
                      {userBodyType && selectedData.bodyTypes.includes(userBodyType)
                        ? `This ${selectedData.category} is specifically recommended for ${bodyTypeLabel[userBodyType] || userBodyType} body types — it will accentuate your best features.`
                        : `A versatile ${selectedData.category} that works across multiple body types and occasions.`
                      }
                    </p>
                  </div>

                  <div className="detail-section">
                    <div className="detail-label">Best Occasions</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {selectedData.occasions.map((occ: string) => (
                        <span key={occ} style={{ fontSize: 11, fontFamily: 'DM Sans', color: '#c9a96e', border: '1px solid rgba(201,169,110,0.3)', padding: '3px 10px' }}>{occ}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <div className="detail-label">Fits Body Types</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {selectedData.bodyTypes.map((bt: string) => (
                        <span key={bt} style={{ fontSize: 11, fontFamily: 'DM Sans', color: userBodyType === bt ? '#c9a96e' : 'rgba(245,240,235,0.4)', border: `1px solid ${userBodyType === bt ? 'rgba(201,169,110,0.5)' : 'rgba(245,240,235,0.1)'}`, padding: '3px 10px', background: userBodyType === bt ? 'rgba(201,169,110,0.08)' : 'transparent' }}>
                          {bodyTypeLabel[bt] || bt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 28 }}>
                    <button className="shop-btn"><ShoppingBag size={14} /> Shop Look</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="empty-state">
                  <div style={{ width: 56, height: 56, border: '1px solid rgba(201,169,110,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <Sparkles size={22} color="#c9a96e" style={{ opacity: 0.6 }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 12px' }}>
                    Select an <em style={{ color: '#c9a96e' }}>Outfit</em>
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(245,240,235,0.3)', margin: 0, lineHeight: 1.7, maxWidth: 220 }}>
                    Click any card to see styling tips tailored to your body type.
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
