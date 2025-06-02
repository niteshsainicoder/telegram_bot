import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated()
  
  if (!auth) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin/login" replace />
  }
  
  // Render the protected component if authenticated
  return children
}

export default PrivateRoute