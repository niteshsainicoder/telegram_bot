import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { setToken, isAuthenticated } from '../utils/auth'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { FiLogIn, FiLoader } from 'react-icons/fi'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/users')
    }
  }, [navigate])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsLoading(true)
    
    try {
      const response = await axios.post('/admin/login', formData)
      
      // Store the token
      setToken(response.data.token)
      
      toast.success('Login successful!')
      navigate('/users')
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(message)
      
      // Handle specific validation errors from server
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        </div>
        
        <div className="mt-8 card shadow-md">
          <div className="card-body">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`form-input ${errors.username ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-error-600">{errors.username}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`form-input ${errors.password ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600">{errors.password}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full flex justify-center items-center"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FiLogIn className="-ml-1 mr-2 h-5 w-5" />
                      Login
                    </>
                  )}
                </button>
              </div>
              
              <div className="text-sm text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/admin/signup" className="font-medium text-primary-600 hover:text-primary-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login