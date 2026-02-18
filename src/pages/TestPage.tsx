import { motion } from 'framer-motion'

const TestPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Test Page Working!</h1>
        <p className="text-xl text-gray-600">This confirms the routing is working correctly.</p>
      </motion.div>
    </div>
  )
}

export default TestPage