import { useState, useEffect } from 'react'
import axios from '../api/axios'
import UserTable from '../components/UserTable'
import toast from 'react-hot-toast'
import { FiSearch, FiRefreshCw } from 'react-icons/fi'

const Users = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      
      try {
        const response = await axios.get('/users')
        setUsers(response.data)
        setFilteredUsers(response.data)
      } catch (error) {
        toast.error('Failed to fetch users')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUsers()
  }, [refreshTrigger])
  
  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users)
      return
    }
    
    const searchResults = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.telegramId && user.telegramId.toString().includes(searchTerm))
    )
    
    setFilteredUsers(searchResults)
  }, [searchTerm, users])
  
  // Handle blocking a user
  const handleBlockUser = async (userId) => {
    try {
      await axios.post(`/users/block/${userId}`)
      
      // Update user in state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, blocked: true } : user
      ))
      
      toast.success('User blocked successfully')
    } catch (error) {
      toast.error('Failed to block user')
    }
  }
  
  // Handle unblocking a user
  const handleUnblockUser = async (userId) => {
    try {
      await axios.post(`/users/unblock/${userId}`)
      
      // Update user in state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, blocked: false } : user
      ))
      
      toast.success('User unblocked successfully')
    } catch (error) {
      toast.error('Failed to unblock user')
    }
  }
  
  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`)
      
      // Remove user from state
      setUsers(users.filter(user => user.id !== userId))
      
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }
  
  const refreshUsers = () => {
    setRefreshTrigger(prev => prev + 1)
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10 pr-3 py-2"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={refreshUsers}
            className="btn btn-outline p-2"
            title="Refresh users"
          >
            <FiRefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <UserTable
          users={filteredUsers}
          onBlockUser={handleBlockUser}
          onUnblockUser={handleUnblockUser}
          onDeleteUser={handleDeleteUser}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Users