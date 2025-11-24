import { useState } from 'react'

const Suggestions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      setFormData({ name: '', email: '', suggestion: '', preference: 'recipe' })
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/5 bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Share Your Ideas</h2>
            <p className="mb-6 opacity-90">
              Help us improve Chefify by sharing your suggestions for new recipes, features, or improvements.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3">Suggest new recipe categories</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3">Request specific dietary options</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3">Recommend cooking techniques</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5 p-8">
            {submitted ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your suggestion has been received. We appreciate your feedback!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suggestion Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preference"
                        value="recipe"
                        checked={formData.preference === 'recipe'}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-700">New Recipe</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preference"
                        value="feature"
                        checked={formData.preference === 'feature'}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-700">Feature Request</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preference"
                        value="improvement"
                        checked={formData.preference === 'improvement'}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-700">Improvement</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preference"
                        value="other"
                        checked={formData.preference === 'other'}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-700">Other</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">Your Suggestion</label>
                  <textarea
                    id="suggestion"
                    name="suggestion"
                    value={formData.suggestion}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us your ideas..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  Submit Suggestion
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Popular Suggestions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Requests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Vegan Options</h3>
            <p className="text-gray-600 text-sm">
              More plant-based recipes and vegan alternatives for popular dishes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Meals</h3>
            <p className="text-gray-600 text-sm">
              30-minute meals for busy professionals and families.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredient Search</h3>
            <p className="text-gray-600 text-sm">
              Find recipes based on ingredients you already have at home.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggestions