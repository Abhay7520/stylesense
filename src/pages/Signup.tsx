import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup:', formData)
    navigate('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const steps = [
    { num: '01', label: 'Create Account' },
    { num: '02', label: 'Style Profile' },
    { num: '03', label: 'Discover' },
  ]

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#0a0a0a', color: '#f5f0eb', minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .signup-input {
          width: 100%;
          background: rgba(245,240,235,0.04);
          border: 1px solid rgba(245,240,235,0.12);
          color: #f5f0eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          padding: 16px 20px;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .signup-input::placeholder { color: rgba(245,240,235,0.22); }
        .signup-input:focus {
          border-color: #c9a96e;
          background: rgba(201,169,110,0.04);
        }

        .signup-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.4);
          display: block;
          margin-bottom: 10px;
        }

        .btn-submit {
          width: 100%;
          background: #f5f0eb;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 18px 36px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.25s;
        }
        .btn-submit:hover { background: #c9a96e; }

        .checkbox-custom {
          width: 16px;
          height: 16px;
          appearance: none;
          background: transparent;
          border: 1px solid rgba(245,240,235,0.2);
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          transition: border-color 0.2s;
          margin-top: 2px;
        }
        .checkbox-custom:checked {
          background: #c9a96e;
          border-color: #c9a96e;
        }
        .checkbox-custom:checked::after {
          content: '';
          position: absolute;
          top: 2px; left: 5px;
          width: 4px; height: 8px;
          border: 2px solid #0a0a0a;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }

        .eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(245,240,235,0.3);
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .eye-btn:hover { color: #c9a96e; }

        .noise-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
        }

        .gold-link {
          color: #c9a96e;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .gold-link:hover { opacity: 0.7; }
      `}</style>

      <div className="noise-overlay" />

      {/* ── Left panel ── */}
      <div style={{ flex: '0 0 45%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', borderRight: '1px solid rgba(245,240,235,0.06)', overflow: 'hidden' }}>
        {/* Glows */}
        <div style={{ position: 'absolute', top: -150, right: -150, width: 500, height: 500, background: 'radial-gradient(circle, rgba(201,169,110,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#f5f0eb' }}>
          <Sparkles size={16} color="#c9a96e" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, letterSpacing: '0.05em' }}>StyleSense</span>
        </Link>

        {/* Headline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Begin Your Journey</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            Fashion,<br /><em style={{ color: '#c9a96e' }}>curated</em><br />for you.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(245,240,235,0.4)', lineHeight: 1.8, maxWidth: 300 }}>
            Join thousands discovering their perfect style through the power of AI. Your wardrobe transformation starts here.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.25)', marginBottom: 20 }}>
            How it works
          </div>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderTop: '1px solid rgba(245,240,235,0.06)' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: i === 0 ? '#c9a96e' : 'rgba(245,240,235,0.15)', lineHeight: 1, minWidth: 36 }}>{step.num}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: i === 0 ? 500 : 300, color: i === 0 ? '#f5f0eb' : 'rgba(245,240,235,0.3)', letterSpacing: '0.05em' }}>{step.label}</span>
              {i === 0 && <div style={{ marginLeft: 'auto', width: 6, height: 6, background: '#c9a96e', borderRadius: '50%' }} />}
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(245,240,235,0.06)' }} />
        </div>
      </div>

      {/* ── Right panel: Form ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          {/* Heading */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Create Account</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1, margin: 0 }}>
              Join <em style={{ color: '#c9a96e' }}>StyleSense</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(245,240,235,0.4)', marginTop: 12, lineHeight: 1.6 }}>
              Start your style transformation today
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: 24 }}>
              <label className="signup-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="signup-input"
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 24 }}>
              <label className="signup-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="signup-input"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 32 }}>
              <label className="signup-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="signup-input"
                  style={{ paddingRight: 52 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn"
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password strength hint */}
              <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ flex: 1, height: 2, background: formData.password.length > i * 3 ? (formData.password.length > 10 ? '#c9a96e' : 'rgba(201,169,110,0.4)') : 'rgba(245,240,235,0.08)', transition: 'background 0.3s' }} />
                ))}
              </div>
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
              <input type="checkbox" required className="checkbox-custom" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.4)', lineHeight: 1.6 }}>
                I agree to the{' '}
                <a href="#" className="gold-link">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="gold-link">Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit">
              Create Account <ArrowRight size={15} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(245,240,235,0.07)' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.18)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(245,240,235,0.07)' }} />
          </div>

          {/* Sign in link */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(245,240,235,0.35)', textAlign: 'center', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" className="gold-link" style={{ fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup