import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/utils/Button'
import Input from '../components/utils/Input'
import Alert from '../components/utils/Alert'

const Profile = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateProfileForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors = {}
    
    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    
    if (!passwordData.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = 'Please confirm your new password'
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    
    if (!validateProfileForm()) {
      return
    }
    
    // Simulate profile update
    setSuccess('Profile updated successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    
    if (!validatePasswordForm()) {
      return
    }
    
    // Simulate password update
    setSuccess('Password updated successfully!')
    setTimeout(() => setSuccess(''), 3000)
    
    // Reset password form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Change Password
            </button>
          </nav>
        </div>

        <div className="p-6">
          {success && (
            <div className="mb-6">
              <Alert variant="success">
                {success}
              </Alert>
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-600 mb-4">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <Button variant="secondary" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
                  error={errors.name}
                  required
                />

                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  error={errors.email}
                  required
                />

                <Input
                  label="Location"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleProfileChange}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <Input
                label="Current Password"
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                error={errors.currentPassword}
                required
              />

              <Input
                label="New Password"
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                error={errors.newPassword}
                required
              />

              <Input
                label="Confirm New Password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                error={errors.confirmNewPassword}
                required
              />

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile