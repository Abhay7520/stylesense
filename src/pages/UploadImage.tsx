import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Sparkles, ArrowRight } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`

const UploadImage = () => {
  const { addActivity, incrementStat } = useApp()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target?.result as string)
      reader.readAsDataURL(file)
      setUploadDone(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleFileSelect(files[0])
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleFileSelect(files[0])
  }

  const handleUpload = async () => {
    if (!selectedImage) return
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setUploadDone(true)
      addActivity('Uploaded a new photo for styling', 'Upload')
      incrementStat('imagesUploaded')
    }, 2000)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setUploadDone(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const guidelines = [
    { title: 'Clear Face & Body', desc: 'Show your full outfit and face for best results' },
    { title: 'Good Lighting', desc: 'Natural light works best for accurate colour analysis' },
    { title: 'Simple Background', desc: 'Plain backgrounds help AI focus on your outfit' },
  ]

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        .panel { background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.07); padding: 40px; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a96e; }
        .drop-zone { border: 1px dashed rgba(245,240,235,0.15); padding: 64px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: border-color 0.25s, background 0.25s; position: relative; }
        .drop-zone:hover { border-color: rgba(201,169,110,0.4); background: rgba(201,169,110,0.03); }
        .drop-zone.dragging { border-color: #c9a96e; background: rgba(201,169,110,0.06); }
        .drop-zone::before, .drop-zone::after { content: ''; position: absolute; width: 24px; height: 24px; border-color: rgba(201,169,110,0.4); border-style: solid; transition: border-color 0.25s; }
        .drop-zone::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .drop-zone::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        .btn-browse { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: 1px solid rgba(245,240,235,0.2); color: #f5f0eb; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 28px; cursor: pointer; transition: border-color 0.25s, background 0.25s; margin-top: 24px; }
        .btn-browse:hover { border-color: #c9a96e; background: rgba(201,169,110,0.06); }
        .btn-upload { width: 100%; background: #f5f0eb; color: #0a0a0a; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 18px 36px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.25s; margin-top: 20px; }
        .btn-upload:hover:not(:disabled) { background: #c9a96e; }
        .btn-upload:disabled { opacity: 0.4; cursor: not-allowed; }
        .guideline-row { display: flex; align-items: flex-start; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(245,240,235,0.06); }
        .guideline-row:last-child { border-bottom: none; }
        .noise-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E"); opacity: 0.025; pointer-events: none; z-index: 999; }
        .remove-btn { position: absolute; top: 16px; right: 16px; background: rgba(10,10,10,0.8); border: 1px solid rgba(245,240,235,0.15); color: #f5f0eb; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .remove-btn:hover { border-color: #c9a96e; background: rgba(10,10,10,0.95); }
      `}</style>

      <div className="noise-overlay" />
      <Sidebar />

      <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}>

          {/* Header */}
          <div style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span className="section-label">Upload</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Upload Your <em style={{ color: '#c9a96e' }}>Photo.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: 0 }}>
              A clear photo lets our AI craft truly personalised styling recommendations for you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

            {/* Upload Panel */}
            <div className="panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Choose Photo</span>
              </div>

              {!selectedImage ? (
                <>
                  <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' }}>
                    <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className={`drop-zone ${isDragging ? 'dragging' : ''}`}>
                      <motion.div animate={{ y: isDragging ? -6 : 0 }} transition={{ duration: 0.3 }}
                        style={{ width: 52, height: 52, border: '1px solid rgba(201,169,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                        <Upload size={22} color="#c9a96e" />
                      </motion.div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 10px' }}>
                        {isDragging ? <em style={{ color: '#c9a96e' }}>Drop it here</em> : 'Drag & Drop'}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(245,240,235,0.35)', margin: 0 }}>your image to begin</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0 0' }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(245,240,235,0.08)' }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.2)' }}>or</span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(245,240,235,0.08)' }} />
                      </div>
                    </div>
                  </label>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} id="file-upload" />
                  <label htmlFor="file-upload" style={{ display: 'block', textAlign: 'center' }}>
                    <span className="btn-browse">Browse Files <ArrowRight size={12} /></span>
                  </label>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.08em', color: 'rgba(245,240,235,0.2)', textAlign: 'center', marginTop: 20 }}>
                    JPG · PNG · WebP &nbsp;·&nbsp; Max 10MB
                  </p>
                </>
              ) : (
                <div>
                  <div style={{ position: 'relative' }}>
                    <img src={selectedImage} alt="Uploaded" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)' }} />
                    <button onClick={handleRemoveImage} className="remove-btn"><X size={16} /></button>
                  </div>

                  {uploadDone ? (
                    <div style={{ marginTop: 20, background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.3)', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 28, height: 28, border: '1px solid #c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#c9a96e', fontSize: 14 }}>✓</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e' }}>Photo Uploaded</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.4)', marginTop: 2 }}>AI analysis is ready.</div>
                      </div>
                    </div>
                  ) : (
                    <button onClick={handleUpload} disabled={isUploading} className="btn-upload">
                      {isUploading ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ width: 14, height: 14, border: '2px solid #0a0a0a', borderTopColor: 'transparent', borderRadius: '50%' }} />
                          Uploading…
                        </>
                      ) : (
                        <>Upload for Styling <ArrowRight size={14} /></>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Guidelines */}
              <div className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Photo Guidelines</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, margin: '0 0 28px' }}>
                  For the best <em style={{ color: '#c9a96e' }}>results.</em>
                </h2>
                {guidelines.map((g, i) => (
                  <div key={i} className="guideline-row">
                    <div style={{ width: 28, height: 28, border: '1px solid rgba(201,169,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#c9a96e' }}>✓</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 400, marginBottom: 4 }}>{g.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(245,240,235,0.4)', lineHeight: 1.6 }}>{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro Tip */}
              <div style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.2)', padding: 36, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.04 }}>
                  <Sparkles size={120} color="#c9a96e" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Pro Tip</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(245,240,235,0.75)', margin: 0 }}>
                  Stand straight and wear well-fitted clothes — this helps our AI understand your body type and style preferences with far greater accuracy.
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UploadImage
