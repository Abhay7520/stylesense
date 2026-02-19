import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Calendar, Edit, Check } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'

const Profile = () => {
  const { state, updateUser } = useApp()
  const { user, stats: userStats, savedOutfits: contextSavedOutfits } = state

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    joinDate: 'January 2024',
    bio: 'Fashion enthusiast looking for stylish and comfortable outfits for everyday wear.'
  })

  // Sync with context if it changes (e.g. initial load)
  useEffect(() => {
    setProfileData(prev => ({
      ...prev,
      name: user.name,
      email: user.email
    }))
  }, [user])

  const savedOutfits = contextSavedOutfits.map(o => ({
    id: o.id,
    name: o.name,
    date: 'Just now', // In real app, store date
    image: o.image
  }))

  const uploadedImages = [
    { id: 1, date: 'Jan 15', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop' },
    { id: 2, date: 'Jan 12', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop' },
    { id: 3, date: 'Jan 10', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop' },
    { id: 4, date: 'Jan 8', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=300&fit=crop' }
  ]

  const stats = [
    { label: 'Outfits Tried', value: userStats.outfitsTried.toString() },
    { label: 'Saved Looks', value: userStats.savedLooks.toString() },
    { label: 'Photos Uploaded', value: userStats.imagesUploaded.toString() },
    { label: 'Style Score', value: `${user.styleScore}%` },
  ]

  const handleSave = () => {
    updateUser({ name: profileData.name, email: profileData.email })
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } } }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #c9a96e;
        }

        .panel {
          background: rgba(245,240,235,0.02);
          border: 1px solid rgba(245,240,235,0.07);
          padding: 36px;
        }

        .edit-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          border: 1px solid rgba(245,240,235,0.15);
          color: rgba(245,240,235,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 10px 22px; cursor: pointer;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .edit-btn:hover { border-color: #c9a96e; color: #c9a96e; }
        .edit-btn.saving { border-color: #c9a96e; background: rgba(201,169,110,0.08); color: #c9a96e; }

        .profile-input {
          width: 100%;
          background: rgba(245,240,235,0.04);
          border: 1px solid rgba(245,240,235,0.12);
          border-bottom-color: #c9a96e;
          color: #f5f0eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300;
          padding: 10px 14px;
          outline: none;
          transition: border-color 0.25s;
        }
        .profile-input:focus { border-color: #c9a96e; background: rgba(201,169,110,0.04); }

        .profile-textarea {
          width: 100%;
          background: rgba(245,240,235,0.04);
          border: 1px solid rgba(245,240,235,0.12);
          border-bottom-color: #c9a96e;
          color: #f5f0eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300;
          padding: 12px 14px;
          outline: none;
          resize: none;
          line-height: 1.7;
          transition: border-color 0.25s;
        }
        .profile-textarea:focus { border-color: #c9a96e; background: rgba(201,169,110,0.04); }

        .stat-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid rgba(245,240,235,0.06);
        }
        .stat-row:last-child { border-bottom: none; }

        .save-btn {
          width: 100%; margin-top: 20px;
          background: #f5f0eb; color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.25s;
        }
        .save-btn:hover { background: #c9a96e; }

        .outfit-thumb {
          position: relative; overflow: hidden; cursor: pointer;
        }
        .outfit-thumb img {
          width: 100%; height: 130px; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .outfit-thumb:hover img { transform: scale(1.06); }
        .outfit-thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.65), transparent 55%);
          opacity: 0; transition: opacity 0.3s;
        }
        .outfit-thumb:hover .outfit-thumb-overlay { opacity: 1; }
        .outfit-thumb-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 10px 12px;
          opacity: 0; transition: opacity 0.3s;
        }
        .outfit-thumb:hover .outfit-thumb-label { opacity: 1; }

        .view-all-btn {
          width: 100%; margin-top: 24px;
          background: transparent;
          border: 1px solid rgba(245,240,235,0.1);
          color: rgba(245,240,235,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 13px; cursor: pointer;
          transition: border-color 0.25s, color 0.25s;
        }
        .view-all-btn:hover { border-color: #c9a96e; color: #c9a96e; }

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
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
                <span className="section-label">Profile</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                My <em style={{ color: '#c9a96e' }}>Profile.</em>
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(245,240,235,0.4)', margin: 0 }}>
                Manage your account and style preferences.
              </p>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`edit-btn ${isEditing ? 'saving' : ''}`}
            >
              {isEditing ? <><Check size={13} /> Save Changes</> : <><Edit size={13} /> Edit Profile</>}
            </button>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>

            {/* ── Left: Profile Card + Stats ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Profile card */}
              <motion.div variants={fadeUp} className="panel" style={{ textAlign: 'center' }}>
                {/* Avatar */}
                <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 24px' }}>
                  <img
                    src={user.profileImage || 'https://via.placeholder.com/80'}
                    alt="Profile"
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: user.profileImage ? '50%' : 0 }}
                  />
                  {!user.profileImage && (
                    <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,169,110,0.06)' }}>
                      <User size={32} color="rgba(201,169,110,0.6)" />
                    </div>
                  )}
                  {/* Corner accents */}
                  <div style={{ position: 'absolute', top: -4, left: -4, width: 12, height: 12, borderTop: '1px solid #c9a96e', borderLeft: '1px solid #c9a96e' }} />
                  <div style={{ position: 'absolute', bottom: -4, right: -4, width: 12, height: 12, borderBottom: '1px solid #c9a96e', borderRight: '1px solid #c9a96e' }} />
                </div>

                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
                      <div>
                        <div className="section-label" style={{ marginBottom: 8 }}>Name</div>
                        <input name="name" value={profileData.name} onChange={handleChange} className="profile-input" />
                      </div>
                      <div>
                        <div className="section-label" style={{ marginBottom: 8 }}>Email</div>
                        <input name="email" value={profileData.email} onChange={handleChange} className="profile-input" />
                      </div>
                      <div>
                        <div className="section-label" style={{ marginBottom: 8 }}>Bio</div>
                        <textarea name="bio" value={profileData.bio} onChange={handleChange} rows={3} className="profile-textarea" />
                      </div>
                      <button onClick={handleSave} className="save-btn">
                        <Check size={13} /> Save Changes
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="viewing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, margin: '0 0 6px' }}>
                        {profileData.name}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
                        <Calendar size={11} color="rgba(245,240,235,0.3)" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(245,240,235,0.3)', letterSpacing: '0.08em' }}>
                          Since {profileData.joinDate}
                        </span>
                      </div>

                      <div style={{ borderTop: '1px solid rgba(245,240,235,0.06)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <Mail size={13} color="#c9a96e" style={{ opacity: 0.7 }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(245,240,235,0.5)' }}>
                            {profileData.email}
                          </span>
                        </div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(245,240,235,0.4)', lineHeight: 1.7, margin: 0 }}>
                          {profileData.bio}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Style Stats */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Style Stats</span>
                </div>
                {stats.map((s) => (
                  <div key={s.label} className="stat-row">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(245,240,235,0.4)' }}>{s.label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: '#c9a96e', lineHeight: 1 }}>{s.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Saved Outfits + Uploaded Images ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Saved Outfits */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Saved Outfits</span>
                  <div style={{ marginLeft: 'auto', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(245,240,235,0.2)', letterSpacing: '0.1em' }}>
                    {savedOutfits.length} looks
                  </div>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 24px' }}>
                  Your saved <em style={{ color: '#c9a96e' }}>looks.</em>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {savedOutfits.length > 0 ? (
                    savedOutfits.map((outfit: any, i: number) => (
                      <motion.div
                        key={outfit.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="outfit-thumb"
                      >
                        <img src={outfit.image} alt={outfit.name} />
                        <div className="outfit-thumb-overlay" />
                        <div className="outfit-thumb-label">
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 400, marginBottom: 2 }}>{outfit.name}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(245,240,235,0.5)', letterSpacing: '0.08em' }}>{outfit.date}</div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div style={{ gridColumn: 'span 3', padding: '20px', textAlign: 'center', color: 'rgba(245,240,235,0.3)', border: '1px dashed rgba(245,240,235,0.1)' }}>
                      No saved outfits.
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Uploaded Images */}
              <motion.div variants={fadeUp} className="panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 24, height: 1, background: '#c9a96e' }} />
                  <span className="section-label">Uploaded Images</span>
                  <div style={{ marginLeft: 'auto', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(245,240,235,0.2)', letterSpacing: '0.1em' }}>
                    {uploadedImages.length} photos
                  </div>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, margin: '0 0 24px' }}>
                  Your <em style={{ color: '#c9a96e' }}>photos.</em>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {uploadedImages.map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="outfit-thumb"
                    >
                      <img src={img.image} alt="Uploaded" />
                      <div className="outfit-thumb-overlay" />
                      <div className="outfit-thumb-label">
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(245,240,235,0.5)', letterSpacing: '0.08em' }}>{img.date}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="view-all-btn">View All Images</button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile