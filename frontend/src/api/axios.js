import axios from 'axios'
import toast from 'react-hot-toast'
import { getToken, removeToken } from '../utils/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    // Handle unauthorized errors (expired or invalid token)
    if (response && response.status === 401) {
      toast.error('Session expired. Please login again.')
      removeToken()
      window.location.href = '/admin/login'
    }

    // Handle forbidden errors
    if (response && response.status === 403) {
      toast.error('You do not have permission to perform this action.')
    }

    // Handle server errors
    if (response && response.status >= 500) {
      toast.error('Server error. Please try again later.')
    }

    // Handle network errors
    if (!response) {
      toast.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance