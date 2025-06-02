import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Users from './pages/Users'
import Settings from './pages/Settings'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            background: '#fff',
            color: '#111827',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login\" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        
        <Route element={<Layout />}>
          <Route path="/users" element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App