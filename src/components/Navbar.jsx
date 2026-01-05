import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Navbar = () => {
  const { token, user, logout } = useContext(UserContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const showAddSpace = token && user && user.is_seller

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
              <span className="text-xl font-bold text-white">🏢</span>
            </div>
            <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
              RentSpace
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-6 xl:gap-8">
            <li>
              <Link to="/" className="px-4 py-2 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 text-sm lg:text-base">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="px-4 py-2 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 text-sm lg:text-base">
                About
              </Link>
            </li>
            <li>
              <Link to="/rentspacelist" className="px-4 py-2 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 text-sm lg:text-base">
                Listings
              </Link>
            </li>

            {/* Seller Add Space */}
            {showAddSpace && (
              <li className="ml-4">
                <Link to="/create-rentspace" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2 lg:px-8 lg:py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
                  ➕ Add Space
                </Link>
              </li>
            )}

            {/* Auth Links */}
            {!token ? (
              <>
                <li>
                  <Link to="/login" className="px-6 py-2 lg:px-8 lg:py-3 border-2 border-indigo-200 hover:border-indigo-400 text-indigo-700 font-semibold rounded-2xl hover:bg-indigo-50 transition-all duration-300 text-sm lg:text-base">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="px-6 py-2 lg:px-8 lg:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="relative group">
                <button onClick={logout} className="px-6 py-2 text-red-600 hover:text-red-700 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300 text-sm lg:text-base flex items-center gap-2">
                  👋 Logout
                </button>
              </li>
            )}

            {/* Admin Panel */}
            {user && user.is_staff && (
              <li>
                <Link to="/admin" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 lg:px-6 lg:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs lg:text-sm">
                  ⚙️ Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className={`w-7 h-7 transition-all ${isMobileMenuOpen ? 'text-indigo-600' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-6 space-y-3 pb-8">
            <Link to="/" className="block px-4 py-4 text-lg font-semibold text-gray-800 hover:bg-indigo-50 rounded-xl hover:text-indigo-700 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block px-4 py-4 text-lg font-semibold text-gray-800 hover:bg-indigo-50 rounded-xl hover:text-indigo-700 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/rentspacelist" className="block px-4 py-4 text-lg font-semibold text-gray-800 hover:bg-indigo-50 rounded-xl hover:text-indigo-700 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              Listings
            </Link>

            {showAddSpace && (
              <Link to="/create-rentspace" className="block px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg mx-2" onClick={() => setIsMobileMenuOpen(false)}>
                ➕ Add Space
              </Link>
            )}

            {!token ? (
              <>
                <div className="h-px bg-gray-200 my-4 mx-4"></div>
                <Link to="/login" className="block px-4 py-4 text-lg font-bold text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all border-2 border-indigo-200 hover:border-indigo-400" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-4 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="h-px bg-gray-200 my-4 mx-4"></div>
                <button onClick={logout} className="w-full px-4 py-4 text-lg font-bold text-red-600 hover:bg-red-50 rounded-xl hover:text-red-700 transition-all border-2 border-red-200">
                  Logout
                </button>
              </>
            )}

            {user && user.is_staff && (
              <>
                <div className="h-px bg-gray-200 my-4 mx-4"></div>
                <Link to="/admin" className="block px-4 py-4 text-lg font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                  ⚙️ Admin Panel
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
