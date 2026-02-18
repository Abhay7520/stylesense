import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Sparkles, DollarSign, Calendar, ArrowRight } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const FashionPreferences = () => {
  const [preferences, setPreferences] = useState({
    gender: '',
    occasion: '',
    colorPreference: '',
    budgetRange: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Preferences saved! Redirecting to recommendations...')
    }, 2000)
  }

  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
  const occasions = ['Casual', 'Formal', 'Party', 'Wedding', 'Business', 'Date Night', 'Beach', 'Gym']
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
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

  const RadioOption = ({ name, value, label, checked }: { name: string; value: string; label: string; checked: boolean }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: `1px solid ${checked ? 'rgba(201,169,110,0.5)' : 'rgba(245,240,235,0.07)'}`, background: checked ? 'rgba(201,169,110,0.07)' : 'transparent', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
      onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,235,0.15)' }}
      onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,235,0.07)' }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {/* Custom radio */}
      <div style={{ width: 16, height: 16, border: `1px solid ${checked ? '#c9a96e' : 'rgba(245,240,235,0.2)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s' }}>
        {checked && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e' }} />}
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: checked ? 500 : 300, color: checked ? '#f5f0eb' : 'rgba(245,240,235,0.5)', letterSpacing: '0.03em', transition: 'color 0.2s, font-weight 0.2s' }}>
        {label}
      </span>
    </label>
  )

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .panel {
          background: rgba(245,240,235,0.02);
          border: 1px solid rgba(245,240,235,0.07);
          padding: 36px;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          margin: 0 0 28px;
          letter-spacing: '-0.01em';
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f5f0eb;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 18px 48px;
          border: none;
          cursor: pointer;
          transition: background 0.25s;
        }
        .btn-submit:hover:not(:disabled) { background: #c9a96e; }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        .noise-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 999;
        }

        /* Progress bar */
        .progress-bar {
          height: 2px;
          background: rgba(245,240,235,0.06);
          margin-top: 48px;
          position: relative;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e, rgba(201,169,110,0.4));
          transition: width 0.5s ease;
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
              <span className="section-label">Style Setup</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Your Fashion <em style={{ color: '#c9a96e' }}>Preferences.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: 0 }}>
              Tell us about your style and we'll craft truly personalised recommendations.
            </p>

            {/* Progress */}
            {(() => {
              const filled = Object.values(preferences).filter(Boolean).length
              const pct = (filled / 4) * 100
              return (
                <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ flex: 1, height: 2, background: 'rgba(245,240,235,0.06)', position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', background: 'linear-gradient(90deg, #c9a96e, rgba(201,169,110,0.4))', width: `${pct}%` }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.25)', flexShrink: 0 }}>
                    {filled} of 4
                  </span>
                </div>
              )
            })()}
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              {/* ── Gender ── */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Gender</span>
                </div>
                <h2 className="panel-title">
                  How do you<br /><em style={{ color: '#c9a96e' }}>identify?</em>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {genders.map(g => (
                    <RadioOption key={g} name="gender" value={g} label={g} checked={preferences.gender === g} />
                  ))}
                </div>
              </motion.div>

              {/* ── Occasion ── */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Occasion</span>
                </div>
                <h2 className="panel-title">
                  Where are you<br /><em style={{ color: '#c9a96e' }}>headed?</em>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {occasions.map(o => (
                    <RadioOption key={o} name="occasion" value={o} label={o} checked={preferences.occasion === o} />
                  ))}
                </div>
              </motion.div>

              {/* ── Colour ── */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Colour Palette</span>
                </div>
                <h2 className="panel-title">
                  What colours<br /><em style={{ color: '#c9a96e' }}>speak to you?</em>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {colors.map(c => (
                    <RadioOption key={c} name="colorPreference" value={c} label={c} checked={preferences.colorPreference === c} />
                  ))}
                </div>
              </motion.div>

              {/* ── Budget ── */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Budget Range</span>
                </div>
                <h2 className="panel-title">
                  What's your<br /><em style={{ color: '#c9a96e' }}>investment?</em>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {budgets.map(b => (
                    <RadioOption key={b.value} name="budgetRange" value={b.value} label={b.label} checked={preferences.budgetRange === b.value} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Submit */}
            <motion.div variants={fadeUp} style={{ marginTop: 40, display: 'flex', justifyContent: 'center', position: 'relative' }}>
              {/* Decorative line through button area */}
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
                  <>
                    <Sparkles size={14} />
                    Get AI Recommendations
                    <ArrowRight size={14} />
                  </>
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