import { useState, useEffect } from 'react'
import axios from '../api/axios'
import toast from 'react-hot-toast'
import { FiSave, FiLoader } from 'react-icons/fi'

const Settings = () => {
  const [settings, setSettings] = useState({
    weatherApiKey: '',
  })
  const [originalSettings, setOriginalSettings] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      
      try {
        const response = await axios.get('/settings')
        setSettings(response.data)
        setOriginalSettings(response.data)
      } catch (error) {
        toast.error('Failed to fetch settings')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSettings()
  }, [])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings({ ...settings, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!settings.weatherApiKey.trim()) {
      newErrors.weatherApiKey = 'API key is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsSaving(true)
    
    try {
      await axios.post('/settings', settings)
      setOriginalSettings(settings)
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
      
      // Handle specific validation errors from server
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setIsSaving(false)
    }
  }
  
  const hasChanges = () => {
    return JSON.stringify(settings) !== JSON.stringify(originalSettings)
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="weatherApiKey" className="form-label">
            Update Weather API Key
              </label>
              <input
                id="weatherApiKey"
                name="weatherApiKey"
                type="text"
                className={`form-input ${errors.weatherApiKey ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                value={settings?.weatherApiKey}
                onChange={handleChange}
              />
              {errors.weatherApiKey && (
                <p className="mt-1 text-sm text-error-600">{errors.weatherApiKey}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                API key used for fetching weather data.
              </p>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSaving || !hasChanges()}
                className={`btn ${
                  hasChanges() ? 'btn-primary' : 'btn-outline cursor-not-allowed opacity-70'
                } flex items-center`}
              >
                {isSaving ? (
                  <>
                    <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="-ml-1 mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings