import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`

const FashionPreferences = () => {
  const navigate = useNavigate()
  const { state, savePreference, addActivity, incrementStat } = useApp()

  const [preferences, setPreferences] = useState({
    gender: '',
    occasion: '',
    bodyType: '',
    colorPreference: '',
    budgetRange: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (state.preferences) {
      setPreferences(prev => ({ ...prev, ...state.preferences }))
    }
  }, [state.preferences])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    savePreference(preferences)
    addActivity('Updated style preferences', 'TrendingUp')
    if (!state.preferences?.gender) {
      incrementStat('outfitsTried', 0)
    }
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/recommendations')
    }, 1500)
  }

  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
  const occasions = ['Casual', 'College', 'Party', 'Formal', 'Wedding', 'Business', 'Date Night', 'Beach', 'Gym']
  const bodyTypes = [
    { label: 'Pear', value: 'pear', desc: 'Narrower shoulders, wider hips' },
    { label: 'Rectangle', value: 'rectangle', desc: 'Shoulders & hips roughly equal' },
    { label: 'Hourglass', value: 'hourglass', desc: 'Defined waist, balanced bust & hips' },
    { label: 'Inverted Triangle', value: 'inverted_triangle', desc: 'Broader shoulders, narrower hips' },
  ]
  const colors = ['Black & White', 'Bold & Bright', 'Pastels', 'Earth Tones', 'Monochrome', 'Colorful', 'Neutral', 'Jewel Tones']
  const budgets = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 – $100', value: '50-100' },
    { label: '$100 – $200', value: '100-200' },
    { label: '$200 – $500', value: '200-500' },
    { label: '$500 – $1000', value: '500-1000' },
    { label: 'Over $1000', value: '1000+' }
  ]

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } } }

  // Count filled fields (5 now)
  const totalFields = 5

  const RadioOption = ({ name, value, label, checked }: { name: string; value: string; label: string; checked: boolean }) => (
    <label
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: `1px solid ${checked ? 'rgba(201,169,110,0.5)' : 'rgba(245,240,235,0.07)'}`, background: checked ? 'rgba(201,169,110,0.07)' : 'transparent', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
      onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,235,0.15)' }}
      onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,235,0.07)' }}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={handleChange} style={{ display: 'none' }} />
      <div style={{ width: 16, height: 16, border: `1px solid ${checked ? '#c9a96e' : 'rgba(245,240,235,0.2)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s' }}>
        {checked && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e' }} />}
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: checked ? 500 : 300, color: checked ? '#f5f0eb' : 'rgba(245,240,235,0.5)', letterSpacing: '0.03em', transition: 'color 0.2s' }}>
        {label}
      </span>
    </label>
  )

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        .panel { background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.07); padding: 36px; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a96e; }
        .panel-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; margin: 0 0 28px; letter-spacing: -0.01em; }
        .btn-submit { display: inline-flex; align-items: center; gap: 10px; background: #f5f0eb; color: #0a0a0a; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 18px 48px; border: none; cursor: pointer; transition: background 0.25s; }
        .btn-submit:hover:not(:disabled) { background: #c9a96e; }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .noise-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E"); opacity: 0.025; pointer-events: none; z-index: 999; }
      `}</style>

      <div className="noise-overlay" />
      <Sidebar />

      <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span className="section-label">Style Setup</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Your Fashion <em style={{ color: '#c9a96e' }}>Preferences.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: 0 }}>
              Tell us about your style and we'll craft truly personalised recommendations.
            </p>

            {(() => {
              const filled = Object.values(preferences).filter(Boolean).length
              const pct = (filled / totalFields) * 100
              return (
                <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ flex: 1, height: 2, background: 'rgba(245,240,235,0.06)', position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', background: 'linear-gradient(90deg, #c9a96e, rgba(201,169,110,0.4))' }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.25)', flexShrink: 0 }}>
                    {filled} of {totalFields}
                  </span>
                </div>
              )
            })()}
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              {/* Gender */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Gender</span>
                </div>
                <h2 className="panel-title">How do you<br /><em style={{ color: '#c9a96e' }}>identify?</em></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {genders.map(g => (
                    <RadioOption key={g} name="gender" value={g} label={g} checked={preferences.gender === g} />
                  ))}
                </div>
              </motion.div>

              {/* Occasion */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Occasion</span>
                </div>
                <h2 className="panel-title">Where are you<br /><em style={{ color: '#c9a96e' }}>headed?</em></h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {occasions.map(o => (
                    <RadioOption key={o} name="occasion" value={o} label={o} checked={preferences.occasion === o} />
                  ))}
                </div>
              </motion.div>

              {/* Body Type */}
              <motion.div variants={fadeUp} className="panel" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Body Type</span>
                </div>
                <h2 className="panel-title">What's your<br /><em style={{ color: '#c9a96e' }}>body shape?</em></h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
                  {bodyTypes.map(b => {
                    const checked = preferences.bodyType === b.value
                    return (
                      <label
                        key={b.value}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 16px', border: `1px solid ${checked ? 'rgba(201,169,110,0.5)' : 'rgba(245,240,235,0.07)'}`, background: checked ? 'rgba(201,169,110,0.07)' : 'transparent', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s', textAlign: 'center' }}
                        onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,235,0.15)' }}
                        onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,235,0.07)' }}
                      >
                        <input type="radio" name="bodyType" value={b.value} checked={checked} onChange={handleChange} style={{ display: 'none' }} />
                        {/* Silhouette icon */}
                        <svg width="48" height="80" viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: checked ? 1 : 0.4 }}>
                          {b.value === 'pear' && <path d="M24 4 C28 4 32 8 32 14 C32 20 28 24 24 24 C20 24 16 20 16 14 C16 8 20 4 24 4Z M18 26 C12 28 10 34 10 40 L14 52 L10 76 L38 76 L34 52 L38 40 C38 34 36 28 30 26 Z" fill={checked ? '#c9a96e' : 'rgba(245,240,235,0.6)'} />}
                          {b.value === 'rectangle' && <path d="M24 4 C28 4 32 8 32 14 C32 20 28 24 24 24 C20 24 16 20 16 14 C16 8 20 4 24 4Z M16 26 C12 28 12 36 12 44 L14 76 L34 76 L36 44 C36 36 36 28 32 26 Z" fill={checked ? '#c9a96e' : 'rgba(245,240,235,0.6)'} />}
                          {b.value === 'hourglass' && <path d="M24 4 C28 4 32 8 32 14 C32 20 28 24 24 24 C20 24 16 20 16 14 C16 8 20 4 24 4Z M16 26 C10 28 10 34 12 40 C14 44 20 46 24 46 C28 46 34 44 36 40 C38 34 38 28 32 26 Z M12 48 C10 54 10 62 14 76 L34 76 C38 62 38 54 36 48 C32 50 28 52 24 52 C20 52 16 50 12 48Z" fill={checked ? '#c9a96e' : 'rgba(245,240,235,0.6)'} />}
                          {b.value === 'inverted_triangle' && <path d="M24 4 C28 4 32 8 32 14 C32 20 28 24 24 24 C20 24 16 20 16 14 C16 8 20 4 24 4Z M10 26 C10 32 12 38 14 44 L16 76 L32 76 L34 44 C36 38 38 32 38 26 Z" fill={checked ? '#c9a96e' : 'rgba(245,240,235,0.6)'} />}
                        </svg>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: checked ? 500 : 300, color: checked ? '#f5f0eb' : 'rgba(245,240,235,0.6)', marginBottom: 4 }}>{b.label}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(245,240,235,0.3)', lineHeight: 1.4 }}>{b.desc}</div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </motion.div>

              {/* Colour */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Colour Palette</span>
                </div>
                <h2 className="panel-title">What colours<br /><em style={{ color: '#c9a96e' }}>speak to you?</em></h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {colors.map(c => (
                    <RadioOption key={c} name="colorPreference" value={c} label={c} checked={preferences.colorPreference === c} />
                  ))}
                </div>
              </motion.div>

              {/* Budget */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Budget Range</span>
                </div>
                <h2 className="panel-title">What's your<br /><em style={{ color: '#c9a96e' }}>investment?</em></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {budgets.map(b => (
                    <RadioOption key={b.value} name="budgetRange" value={b.value} label={b.label} checked={preferences.budgetRange === b.value} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Submit */}
            <motion.div variants={fadeUp} style={{ marginTop: 40, display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(245,240,235,0.05)', zIndex: 0 }} />
              <button type="submit" disabled={isSubmitting} className="btn-submit" style={{ position: 'relative', zIndex: 1 }}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ width: 14, height: 14, border: '2px solid #0a0a0a', borderTopColor: 'transparent', borderRadius: '50%' }}
                    />
                    Saving…
                  </>
                ) : (
                  <><Sparkles size={14} /> Get AI Recommendations <ArrowRight size={14} /></>
                )}
              </button>
            </motion.div>
          </form>

        </motion.div>
      </div>
    </div>
  )
}

export default FashionPreferences
