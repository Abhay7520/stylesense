import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Download, RefreshCw, Sparkles, ArrowRight } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`

const VirtualTryOn = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [tryOnImage, setTryOnImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedOutfit, setSelectedOutfit] = useState('')

  const outfits = [
    'Summer Casual Dress',
    'Business Suit',
    'Evening Gown',
    'Street Style',
    'Beach Wear',
    'Formal Attire'
  ]

  const steps = [
    { num: '01', text: 'Upload a clear photo of yourself' },
    { num: '02', text: 'Choose an outfit from our collection' },
    { num: '03', text: 'AI generates your virtual try-on preview' },
    { num: '04', text: 'Download or save your favourite looks' },
  ]

  const handleGenerateTryOn = async () => {
    if (!originalImage) { alert('Please upload your photo first'); return }
    setIsGenerating(true)
    setTimeout(() => {
      setTryOnImage('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop')
      setIsGenerating(false)
    }, 3000)
  }

  const handleDownload = () => {
    if (tryOnImage) {
      const link = document.createElement('a')
      link.href = tryOnImage
      link.download = 'virtual-try-on-result.jpg'
      link.click()
    }
  }

  const handleReset = () => {
    setOriginalImage(null)
    setTryOnImage(null)
    setSelectedOutfit('')
  }

  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } } }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a96e; }
        .panel { background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.07); padding: 36px; }
        .file-input-wrapper { position: relative; border: 1px dashed rgba(245,240,235,0.15); padding: 40px 24px; text-align: center; cursor: pointer; transition: border-color 0.25s, background 0.25s; }
        .file-input-wrapper:hover { border-color: rgba(201,169,110,0.4); background: rgba(201,169,110,0.03); }
        .file-input-wrapper input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .outfit-select { width: 100%; background: rgba(245,240,235,0.04); border: 1px solid rgba(245,240,235,0.12); color: #f5f0eb; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; padding: 14px 18px; outline: none; cursor: pointer; appearance: none; transition: border-color 0.25s; }
        .outfit-select:focus { border-color: #c9a96e; }
        .outfit-select option { background: #1a1a1a; color: #f5f0eb; }
        .btn-primary { flex: 1; background: #f5f0eb; color: #0a0a0a; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 20px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.25s; }
        .btn-primary:hover:not(:disabled) { background: #c9a96e; }
        .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-ghost { background: transparent; border: 1px solid rgba(245,240,235,0.15); color: rgba(245,240,235,0.6); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: border-color 0.25s, color 0.25s; }
        .btn-ghost:hover { border-color: #c9a96e; color: #c9a96e; }
        .step-row { display: flex; align-items: flex-start; gap: 20px; padding: 16px 0; border-bottom: 1px solid rgba(245,240,235,0.06); }
        .step-row:last-child { border-bottom: none; }
        .result-panel { background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.07); padding: 36px; position: sticky; top: 48px; }
        .ai-badge { position: absolute; top: 14px; right: 14px; background: rgba(10,10,10,0.8); border: 1px solid rgba(201,169,110,0.4); padding: 5px 14px; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; }
        .noise-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E"); opacity: 0.025; pointer-events: none; z-index: 999; }
      `}</style>

      <div className="noise-overlay" />
      <Sidebar />

      <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>

          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span className="section-label">AI Try-On</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Virtual <em style={{ color: '#c9a96e' }}>Try-On.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: 0 }}>
              See how different outfits look on you with AI-powered virtual fitting.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Setup Panel */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Setup</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, margin: '0 0 28px' }}>
                  Let's get<br /><em style={{ color: '#c9a96e' }}>started.</em>
                </h2>

                <AnimatePresence mode="wait">
                  {!originalImage ? (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <label className="file-input-wrapper" style={{ display: 'block' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (e) => setOriginalImage(e.target?.result as string)
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                        <div style={{ width: 44, height: 44, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                          <Camera size={20} color="#c9a96e" style={{ opacity: 0.7 }} />
                        </div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, margin: '0 0 8px' }}>Upload Your Photo</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(245,240,235,0.3)', margin: 0 }}>Click or drag & drop · JPG, PNG, WebP</p>
                      </label>
                      <div style={{ marginTop: 20, background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.15)', padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <Sparkles size={14} color="#c9a96e" style={{ marginTop: 2, flexShrink: 0 }} />
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(245,240,235,0.5)', margin: 0, lineHeight: 1.65 }}>
                          Upload a front-facing photo with good lighting for the best results.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="configure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div>
                        <div className="section-label" style={{ marginBottom: 12 }}>Your Photo</div>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <img src={originalImage} alt="Your photo" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.4), transparent 60%)' }} />
                        </div>
                      </div>

                      <div>
                        <div className="section-label" style={{ marginBottom: 12 }}>Select Outfit</div>
                        <div style={{ position: 'relative' }}>
                          <select value={selectedOutfit} onChange={(e) => setSelectedOutfit(e.target.value)} className="outfit-select">
                            <option value="">Choose an outfit…</option>
                            {outfits.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <ArrowRight size={13} color="rgba(245,240,235,0.3)" style={{ transform: 'rotate(90deg)' }} />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={handleGenerateTryOn} disabled={!selectedOutfit || isGenerating} className="btn-primary">
                          {isGenerating ? (
                            <>
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                style={{ width: 13, height: 13, border: '2px solid #0a0a0a', borderTopColor: 'transparent', borderRadius: '50%' }}
                              />
                              Generating…
                            </>
                          ) : (
                            <><Sparkles size={13} /> Generate</>
                          )}
                        </button>
                        <button onClick={handleReset} className="btn-ghost">
                          <RefreshCw size={13} /> Reset
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* How It Works */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">How It Works</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 24px' }}>
                  Four simple <em style={{ color: '#c9a96e' }}>steps.</em>
                </h3>
                {steps.map((step) => (
                  <div key={step.num} className="step-row">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: 'rgba(245,240,235,0.15)', lineHeight: 1, minWidth: 36 }}>{step.num}</span>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(245,240,235,0.5)', margin: 0, lineHeight: 1.7, paddingTop: 4 }}>{step.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Result Panel */}
            <motion.div variants={fadeUp} className="result-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Result</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, margin: '0 0 28px' }}>
                Virtual Try-On <em style={{ color: '#c9a96e' }}>Preview.</em>
              </h2>

              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, gap: 24 }}>
                    <div style={{ position: 'relative', width: 72, height: 72 }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                        style={{ position: 'absolute', inset: 0, border: '1px solid transparent', borderTopColor: '#c9a96e', borderRadius: '50%' }} />
                      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        style={{ position: 'absolute', inset: 8, border: '1px solid transparent', borderTopColor: 'rgba(201,169,110,0.4)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={18} color="#c9a96e" />
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, margin: '0 0 8px' }}>Generating your look…</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.3)', margin: 0, letterSpacing: '0.05em' }}>This may take a few seconds</p>
                    </div>
                  </motion.div>
                ) : tryOnImage ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img src={tryOnImage} alt="Virtual try-on" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.3), transparent 60%)' }} />
                      <div className="ai-badge">AI Generated</div>
                    </div>
                    <div style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.15)', padding: '20px 24px' }}>
                      <div className="section-label" style={{ marginBottom: 10 }}>AI Analysis</div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,235,0.65)', margin: 0, lineHeight: 1.65 }}>
                        "This outfit complements your body shape and personal style. The fit highlights your best features while ensuring comfort and confidence."
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button onClick={handleDownload} className="btn-primary"><Download size={13} /> Download</button>
                      <button onClick={handleGenerateTryOn} className="btn-ghost"><RefreshCw size={13} /> Try Another</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, gap: 20, textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: 120, height: 140, border: '1px dashed rgba(245,240,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTop: '1px solid rgba(201,169,110,0.3)', borderLeft: '1px solid rgba(201,169,110,0.3)' }} />
                      <div style={{ position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottom: '1px solid rgba(201,169,110,0.3)', borderRight: '1px solid rgba(201,169,110,0.3)' }} />
                      <Camera size={28} color="rgba(245,240,235,0.1)" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 10px' }}>
                        Ready to <em style={{ color: '#c9a96e' }}>Try On?</em>
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(245,240,235,0.3)', margin: 0, lineHeight: 1.7, maxWidth: 240 }}>
                        Upload your photo and select an outfit to see how it looks with our AI technology.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VirtualTryOn
