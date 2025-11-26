import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const Suggestions = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    suggestion: '',
    preference: 'recipe'
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: user?.name || '', email: user?.email || '', suggestion: '', preference: 'recipe' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Recipe Suggestions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a great recipe idea or want to suggest improvements? We'd love to hear from you!
        </p>
      </div>
      
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-green-800">Thank you for your suggestion!</h3>
          <p className="mt-1 text-green-700">
            We appreciate your feedback and will review your suggestion shortly.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="preference" className="block text-sm font-medium text-gray-700 mb-1">
                Suggestion Type
              </label>
              <select
                id="preference"
                name="preference"
                value={formData.preference}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="recipe">New Recipe Idea</option>
                <option value="feature">Feature Request</option>
                <option value="improvement">Improvement Suggestion</option>
                <option value="bug">Report a Bug</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
                Your Suggestion
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                rows={5}
                value={formData.suggestion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Please share your detailed suggestion..."
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Submit Suggestion
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Suggestions