import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Camera, Palette, ShoppingBag, Star, ArrowRight } from 'lucide-react'

const Landing = () => {
  const features = [
    {
      icon: Camera,
      title: 'Virtual Try-On',
      description: 'See how outfits look on you before buying with AI-powered virtual fitting rooms',
      num: '01'
    },
    {
      icon: Palette,
      title: 'Style Analysis',
      description: 'Get personalized fashion recommendations based on your body type and preferences',
      num: '02'
    },
    {
      icon: ShoppingBag,
      title: 'Smart Shopping',
      description: 'Discover curated outfits that match your style and budget perfectly',
      num: '03'
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#0a0a0a', color: '#f5f0eb', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        
        * { box-sizing: border-box; }
        
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f5f0eb;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .nav-link:hover { opacity: 1; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f5f0eb;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 16px 36px;
          text-decoration: none;
          transition: background 0.25s, color 0.25s;
        }
        .btn-primary:hover { background: #c9a96e; color: #0a0a0a; }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #f5f0eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 16px 36px;
          border: 1px solid rgba(245,240,235,0.3);
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .btn-ghost:hover { border-color: #c9a96e; background: rgba(201,169,110,0.08); }

        .feature-card {
          border-top: 1px solid rgba(245,240,235,0.12);
          padding: 48px 0;
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 40px;
          align-items: start;
          transition: border-color 0.3s;
          cursor: default;
        }
        .feature-card:hover { border-top-color: #c9a96e; }
        .feature-card:hover .feature-icon { color: #c9a96e; }
        .feature-icon { transition: color 0.3s; }

        .testimonial-card {
          background: rgba(245,240,235,0.04);
          border: 1px solid rgba(245,240,235,0.08);
          padding: 40px;
          position: relative;
          transition: border-color 0.3s, background 0.3s;
        }
        .testimonial-card:hover {
          border-color: rgba(201,169,110,0.4);
          background: rgba(201,169,110,0.04);
        }
        .testimonial-card::before {
          content: '"';
          font-family: 'Cormorant Garamond', serif;
          font-size: 120px;
          line-height: 1;
          color: #c9a96e;
          opacity: 0.15;
          position: absolute;
          top: -10px;
          left: 30px;
        }

        .marquee-track {
          display: flex;
          gap: 0;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .noise-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1000;
        }
      `}</style>

      <div className="noise-overlay" />

      {/* Nav */}
      <nav style={{ padding: '28px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={18} color="#c9a96e" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: '0.05em' }}>StyleSense</span>
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          <button onClick={() => scrollToSection('features')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Features</button>
          <button onClick={() => scrollToSection('gallery')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Gallery</button>
        </div>
        <Link to="/signup" className="btn-primary" style={{ padding: '12px 28px' }}>
          Begin
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ padding: '80px 60px 120px', position: 'relative' }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute', top: -100, right: -200,
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 1200, margin: '0 auto' }}
        >
          {/* Overline */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>
              AI-Powered Personal Styling
            </span>
          </motion.div>

          {/* Giant headline */}
          <div style={{ position: 'relative' }}>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(64px, 10vw, 140px)',
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: 8
              }}
            >
              Dress
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(64px, 10vw, 140px)',
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: 8,
                paddingLeft: '15%',
                fontStyle: 'italic',
                color: '#c9a96e'
              }}
            >
              Smarter,
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(64px, 10vw, 140px)',
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: 60,
              }}
            >
              Live Bolder.
            </motion.h1>
          </div>

          {/* Subtext + CTA in 2 cols */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,240,235,0.6)', margin: 0, maxWidth: 420 }}>
              Transform your wardrobe with intelligent fashion recommendations powered by cutting-edge AI technology.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
              <Link to="/signup" className="btn-primary">
                Get Started <ArrowRight size={14} />
              </Link>
              <Link to="/try" className="btn-ghost">
                Try AI Stylist
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Strip */}
      <div style={{ borderTop: '1px solid rgba(245,240,235,0.08)', borderBottom: '1px solid rgba(245,240,235,0.08)', padding: '18px 0', overflow: 'hidden', background: 'rgba(201,169,110,0.05)' }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.4)', paddingRight: 60 }}>
              Virtual Try-On &nbsp;✦&nbsp; AI Style Analysis &nbsp;✦&nbsp; Smart Shopping &nbsp;✦&nbsp; Personalized Wardrobe &nbsp;✦&nbsp; Fashion Intelligence &nbsp;✦&nbsp; Virtual Try-On &nbsp;✦&nbsp; AI Style Analysis &nbsp;✦&nbsp; Smart Shopping &nbsp;✦&nbsp; Personalized Wardrobe &nbsp;✦&nbsp; Fashion Intelligence &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ padding: '120px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80, alignItems: 'end' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Why StyleSense</span>
            </div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1, margin: 0 }}>
              The Future<br /><em style={{ color: '#c9a96e' }}>of Fashion</em><br />is Here
            </h2>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,235,0.55)', margin: 0 }}>
            Experience fashion discovery reimagined through the lens of artificial intelligence. Our platform learns your unique aesthetic and surfaces possibilities you've never considered.
          </p>
        </motion.div>

        {/* Feature rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.num} variants={fadeUp} className="feature-card">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: 'rgba(245,240,235,0.15)', lineHeight: 1 }}>
                  {feature.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400, margin: '0 0 12px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.5)', margin: 0, maxWidth: 440, lineHeight: 1.7 }}>
                    {feature.description}
                  </p>
                </div>
                <Icon size={28} className="feature-icon" color="rgba(245,240,235,0.25)" />
              </motion.div>
            )
          })}
          <div style={{ borderTop: '1px solid rgba(245,240,235,0.12)' }} />
        </motion.div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" style={{ padding: '120px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Visual Inspiration</span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1, margin: 0 }}>
            Curated <em style={{ color: '#c9a96e' }}>Looks</em>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              style={{
                aspectRatio: '3/4',
                background: 'rgba(245,240,235,0.03)',
                border: '1px solid rgba(245,240,235,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent, rgba(201,169,110,0.03))' }} />
              <Sparkles size={32} color="rgba(201,169,110,0.2)" />
              <div style={{ position: 'absolute', bottom: 20, left: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.2em', color: 'rgba(245,240,235,0.3)' }}>
                LOOK 0{item}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '120px 60px', background: 'rgba(245,240,235,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Testimonials</span>
              <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 300, margin: 0 }}>
              Loved by Fashion <em style={{ color: '#c9a96e' }}>Enthusiasts</em>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {[1, 2, 3].map((item) => (
              <motion.div key={item} variants={fadeUp} className="testimonial-card">
                <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} fill="#c9a96e" color="#c9a96e" />
                  ))}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: 'rgba(245,240,235,0.8)', margin: '0 0 32px' }}>
                  StyleSense completely transformed how I shop for clothes. The AI recommendations are spot-on!
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a96e, rgba(201,169,110,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>
                    F
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Fashion Lover {item}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.35)' }}>Verified User</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '140px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}
        >
          {/* Big decorative text */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(100px, 18vw, 260px)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'rgba(201,169,110,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>
            STYLE
          </div>

          <div style={{ border: '1px solid rgba(245,240,235,0.1)', padding: '100px 80px', textAlign: 'center', position: 'relative', background: 'linear-gradient(135deg, rgba(201,169,110,0.03), transparent)' }}>
            {/* Corner accents */}
            <div style={{ position: 'absolute', top: -1, left: -1, width: 40, height: 40, borderTop: '2px solid #c9a96e', borderLeft: '2px solid #c9a96e' }} />
            <div style={{ position: 'absolute', top: -1, right: -1, width: 40, height: 40, borderTop: '2px solid #c9a96e', borderRight: '2px solid #c9a96e' }} />
            <div style={{ position: 'absolute', bottom: -1, left: -1, width: 40, height: 40, borderBottom: '2px solid #c9a96e', borderLeft: '2px solid #c9a96e' }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 40, height: 40, borderBottom: '2px solid #c9a96e', borderRight: '2px solid #c9a96e' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
              <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
              <Sparkles size={16} color="#c9a96e" />
              <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.1, margin: '0 0 20px' }}>
              Ready to Revolutionize<br /><em style={{ color: '#c9a96e' }}>Your Style?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: 'rgba(245,240,235,0.5)', margin: '0 0 56px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              Join thousands of fashion-forward individuals using AI to enhance their wardrobe.
            </p>
            <Link to="/signup" className="btn-primary" style={{ fontSize: 14 }}>
              Start Your Style Journey <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid rgba(245,240,235,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={14} color="#c9a96e" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16 }}>StyleSense</span>
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.3)', letterSpacing: '0.1em' }}>
          © 2025 StyleSense. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

export default Landing