import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Close mobile menu when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1 p-4 md:p-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Admin Panel &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout