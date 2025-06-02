import { useState } from 'react'
import { FiTrash2, FiUserX, FiUserCheck } from 'react-icons/fi'
import ConfirmDialog from './ConfirmDialog'

const UserTable = ({ users, onBlockUser, onUnblockUser, onDeleteUser, isLoading }) => {
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'danger',
  })
  
  const closeDialog = () => {
    setDialogConfig({ ...dialogConfig, isOpen: false })
  }
  
  // Setup dialog for blocking a user
  const handleBlockClick = (user) => {
    setDialogConfig({
      isOpen: true,
      title: 'Block User',
      message: `Are you sure you want to block ${user.username}? They will no longer be able to access the system.`,
      onConfirm: () => {
        onBlockUser(user._id)
        closeDialog()
      },
      type: 'warning',
      confirmText: 'Block User',
    })
  }
  
  // Setup dialog for unblocking a user
  const handleUnblockClick = (user) => {
    setDialogConfig({
      isOpen: true,
      title: 'Unblock User',
      message: `Are you sure you want to unblock ${user.username}? They will regain access to the system.`,
      onConfirm: () => {
        onUnblockUser(user._id)
        closeDialog()
      },
      type: 'success',
      confirmText: 'Unblock User',
    })
  }
  
  // Setup dialog for deleting a user
  const handleDeleteClick = (user) => {
    setDialogConfig({
      isOpen: true,
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.username}? This action cannot be undone.`,
      onConfirm: () => {
        onDeleteUser(user.id)
        closeDialog()
      },
      type: 'danger',
      confirmText: 'Delete User',
    })
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center">
        <div className="animate-pulse flex flex-col w-full">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    )
  }
  
  // Empty state
  if (!users.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No users found</p>
      </div>
    )
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Telegram ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subscription
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.telegramId || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.subscribed 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.subscribed ? 'Subscribed' : 'Not Subscribed'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.blocked 
                    ? 'bg-error-100 text-error-800' 
                    : 'bg-success-100 text-success-800'
                }`}>
                  {user.blocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  {user.blocked ? (
                    <button
                      onClick={() => handleUnblockClick(user)}
                      className="text-success-600 hover:text-success-800 p-1 rounded-full hover:bg-success-50 transition-colors"
                      title="Unblock User"
                    >
                      <FiUserCheck className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockClick(user)}
                      className="text-warning-600 hover:text-warning-800 p-1 rounded-full hover:bg-warning-50 transition-colors"
                      title="Block User"
                    >
                      <FiUserX className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="text-error-600 hover:text-error-800 p-1 rounded-full hover:bg-error-50 transition-colors"
                    title="Delete User"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        onClose={closeDialog}
        onConfirm={dialogConfig.onConfirm}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmText={dialogConfig.confirmText}
        type={dialogConfig.type}
      />
    </div>
  )
}

export default UserTable