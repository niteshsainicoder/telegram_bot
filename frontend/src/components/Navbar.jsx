import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiUsers, FiSettings, FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import { removeToken } from '../utils/auth'

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  
  // Add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])
  
  const handleLogout = () => {
    removeToken()
    navigate('/admin/login')
  }
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 bg-white z-10 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">Admin Panel</span>
            </div>
            
            {/* Desktop navigation links */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <NavLink
                to="/users"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                    isActive 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <FiUsers className="mr-2" />
                Users
              </NavLink>
              
              <NavLink
                to="/settings"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                    isActive 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <FiSettings className="mr-2" />
                Settings
              </NavLink>
            </div>
          </div>
          
          {/* User dropdown and mobile menu button */}
          <div className="flex items-center">
            {/* Logout button (desktop) */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded="false"
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                </span>
                {isMobileMenuOpen ? (
                  <FiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg animate-fade-in">
          <NavLink
            to="/users"
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiUsers className="mr-3" />
            Users
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiSettings className="mr-3" />
            Settings
          </NavLink>
          
          <button
            onClick={() => {
              handleLogout()
              setIsMobileMenuOpen(false)
            }}
            className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar