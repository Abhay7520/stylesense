import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
// import Navbar from './components/Navbar'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import UploadImage from './pages/UploadImage'
import FashionPreferences from './pages/FashionPreferences'
import AIRecommendations from './pages/AIRecommendations'
import VirtualTryOn from './pages/VirtualTryOn'
import Profile from './pages/Profile'
import DatasetManager from './pages/DatasetManager'

import Landing from './pages/Landing'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#FFEDC7] via-[#FFA6A6] to-[#FF7070]">
        {/* <Navbar /> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/preferences" element={<FashionPreferences />} />
            <Route path="/recommendations" element={<AIRecommendations />} />
            <Route path="/tryon" element={<VirtualTryOn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dataset" element={<DatasetManager />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  )
}

export default App