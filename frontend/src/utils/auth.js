// Token management in localStorage
export const setToken = (token) => {
  localStorage.setItem('adminToken', token)
}

export const getToken = () => {
  return localStorage.getItem('adminToken')
}

export const removeToken = () => {
  localStorage.removeItem('adminToken')
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken()
  return !!token
}

// Decode JWT token to get user information
export const decodeToken = () => {
  try {
    const token = getToken()
    if (!token) return null
    
    // Split the token and get the payload part
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    
    // Decode the payload
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}