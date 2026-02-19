import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Login: checking session', session)
      if (session) {
        console.log('Login: session found, redirecting to dashboard')
        navigate('/dashboard')
      }
    })
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('Login: attempting login for', formData.email)

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      console.log('Login: signIn result', { error, data })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Welcome back!')
        console.log('Login: success, navigating to dashboard')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
      console.error('Login: unexpected error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#0a0a0a', color: '#f5f0eb', minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .login-input {
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
        .login-input::placeholder { color: rgba(245,240,235,0.25); }
        .login-input:focus {
          border-color: #c9a96e;
          background: rgba(201,169,110,0.04);
        }

        .login-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.45);
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
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

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

        .noise-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
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
      `}</style>

      <div className="noise-overlay" />

      {/* Left decorative panel */}
      <div style={{ flex: '0 0 45%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', borderRight: '1px solid rgba(245,240,235,0.06)', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', bottom: -200, left: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#f5f0eb' }}>
          <Sparkles size={16} color="#c9a96e" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, letterSpacing: '0.05em' }}>StyleSense</span>
        </Link>

        {/* Big decorative quote */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            <div>Your</div>
            <div style={{ fontStyle: 'italic', color: '#c9a96e' }}>style,</div>
            <div>redefined.</div>
          </div>
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.35)' }}>
              AI-Powered Fashion
            </span>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[['10K+', 'Users'], ['500+', 'Brands'], ['98%', 'Accuracy']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: '#c9a96e', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.3)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          {/* Heading */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Welcome Back</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1, margin: 0 }}>
              Sign <em style={{ color: '#c9a96e' }}>In</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(245,240,235,0.45)', marginTop: 12, lineHeight: 1.6 }}>
              Continue to your StyleSense account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 28 }}>
              <label className="login-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="login-input"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <label className="login-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="login-input"
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
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" className="checkbox-custom" />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(245,240,235,0.45)', letterSpacing: '0.05em' }}>Remember me</span>
              </label>
              <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c9a96e', textDecoration: 'none', letterSpacing: '0.05em', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Sign In <ArrowRight size={15} /></>}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '36px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(245,240,235,0.08)' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.2)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(245,240,235,0.08)' }} />
          </div>

          {/* Sign up link */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(245,240,235,0.4)', textAlign: 'center', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#c9a96e', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login