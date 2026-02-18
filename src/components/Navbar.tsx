// import { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { Menu, X, Sparkles } from 'lucide-react'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const location = useLocation()

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
//   const isDashboardPage = location.pathname !== '/' && !isAuthPage

//   if (isAuthPage) return null

//   return (
//     <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-[#EB4C4C]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to={isDashboardPage ? "/dashboard" : "/"} className="flex items-center space-x-2">
//             <Sparkles className="w-8 h-8 text-[#EB4C4C]" />
//             <span className="text-2xl font-bold bg-gradient-to-r from-[#EB4C4C] to-[#FF7070] bg-clip-text text-transparent">
//               StyleSense
//             </span>
//           </Link>

//           {isDashboardPage ? (
//             <div className="hidden md:flex items-center space-x-6">
//               <Link to="/dashboard" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Dashboard
//               </Link>
//               <Link to="/upload" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Upload
//               </Link>
//               <Link to="/preferences" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Preferences
//               </Link>
//               <Link to="/recommendations" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Recommendations
//               </Link>
//               <Link to="/tryon" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Try-On
//               </Link>
//               <Link to="/profile" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Profile
//               </Link>
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center space-x-6">
//               <Link to="/" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Home
//               </Link>
//               <Link to="#features" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                 Features
//               </Link>
//               <Link to="/login" className="px-4 py-2 text-[#EB4C4C] border-2 border-[#EB4C4C] rounded-full hover:bg-[#EB4C4C] hover:text-white transition-all font-medium">
//                 Login
//               </Link>
//               <Link to="/signup" className="px-4 py-2 bg-[#EB4C4C] text-white rounded-full hover:bg-[#FF7070] transition-all font-medium">
//                 Sign Up
//               </Link>
//             </div>
//           )}

//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200">
//             {isDashboardPage ? (
//               <div className="flex flex-col space-y-3">
//                 <Link to="/dashboard" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Dashboard
//                 </Link>
//                 <Link to="/upload" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Upload
//                 </Link>
//                 <Link to="/preferences" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Preferences
//                 </Link>
//                 <Link to="/recommendations" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Recommendations
//                 </Link>
//                 <Link to="/tryon" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Try-On
//                 </Link>
//                 <Link to="/profile" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Profile
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex flex-col space-y-3">
//                 <Link to="/" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Home
//                 </Link>
//                 <Link to="#features" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Features
//                 </Link>
//                 <Link to="/login" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="text-gray-700 hover:text-[#EB4C4C] font-medium transition-colors">
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navbar