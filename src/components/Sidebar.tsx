import { Link, useLocation } from 'react-router-dom'
import { Home, Upload, Palette, Sparkles, Camera, User, LogOut, Database } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Upload, label: 'Upload Image', path: '/upload' },
    { icon: Palette, label: 'Preferences', path: '/preferences' },
    { icon: Sparkles, label: 'Recommendations', path: '/recommendations' },
    { icon: Camera, label: 'Try-On', path: '/tryon' },
    { icon: Database, label: 'Dataset', path: '/dataset' },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        .sidebar {
          width: 220px;
          min-width: 220px;
          min-height: 100vh;
          background: #0d0d0d;
          border-right: 1px solid rgba(245,240,235,0.06);
          display: flex;
          flex-direction: column;
          padding: 36px 0;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px 36px;
          border-bottom: 1px solid rgba(245,240,235,0.06);
          text-decoration: none;
          color: #f5f0eb;
        }

        .sidebar-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .nav-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.2);
          padding: 24px 28px 10px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 28px;
          text-decoration: none;
          color: rgba(245,240,235,0.4);
          position: relative;
          transition: color 0.2s, background 0.2s;
          border-left: 2px solid transparent;
        }

        .nav-link:hover {
          color: rgba(245,240,235,0.8);
          background: rgba(245,240,235,0.02);
          border-left-color: rgba(201,169,110,0.3);
        }

        .nav-link.active {
          color: #f5f0eb;
          background: rgba(201,169,110,0.06);
          border-left-color: #c9a96e;
        }

        .nav-link.active .nav-icon { color: #c9a96e; }

        .nav-icon {
          flex-shrink: 0;
          transition: color 0.2s;
        }

        .nav-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .nav-active-dot {
          position: absolute;
          right: 20px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c9a96e;
        }

        .sidebar-footer {
          margin-top: auto;
          padding: 24px 0 0;
          border-top: 1px solid rgba(245,240,235,0.06);
        }

        .logout-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 28px;
          text-decoration: none;
          color: rgba(245,240,235,0.25);
          transition: color 0.2s;
          border-left: 2px solid transparent;
        }
        .logout-link:hover {
          color: rgba(245,240,235,0.6);
          border-left-color: rgba(245,240,235,0.15);
        }

        /* Thin gold glow line on right edge when any item active */
        .sidebar::after {
          content: '';
          position: absolute;
          top: 0; right: -1px;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.15), transparent);
          pointer-events: none;
        }
      `}</style>

      <div className="sidebar" style={{ position: 'relative' }}>

        {/* Logo */}
        <Link to="/" className="sidebar-logo">
          <Sparkles size={14} color="#c9a96e" />
          <span className="sidebar-logo-text">StyleSense</span>
        </Link>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: 8 }}>
          <div className="nav-section-label">Navigation</div>

          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="nav-active-dot" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <Link to="/" className="logout-link">
            <LogOut size={14} />
            <span className="nav-label">Logout</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar