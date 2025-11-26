import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import RecipeForm from '../components/admin/RecipeForm'
import CategoryManager from '../components/admin/CategoryManager'
import SettingsManager from '../components/admin/SettingsManager'

const Admin = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [showSettingsManager, setShowSettingsManager] = useState(false)

  const stats = [
    { name: "Total Recipes", value: "142", change: "+12%", changeType: "positive" },
    { name: "Active Users", value: "1,284", change: "+5.2%", changeType: "positive" },
    { name: "New Recipes", value: "28", change: "-2.1%", changeType: "negative" },
    { name: "Avg. Rating", value: "4.7", change: "+0.3", changeType: "positive" }
  ]

  const recipes = [
    { id: 1, title: "Mediterranean Quinoa Bowl", category: "Vegetarian", status: "Published" },
    { id: 2, title: "Spicy Thai Basil Chicken", category: "Chicken", status: "Published" },
    { id: 3, title: "Classic Beef Lasagna", category: "Beef", status: "Draft" }
  ]

  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "User", status: "Active" },
    { id: 3, name: "James Wilson", email: "james@example.com", role: "User", status: "Inactive" }
  ]

  const handleCreateRecipe = (recipeData) => {
    console.log('Creating recipe:', recipeData)
    setShowRecipeForm(false)
  }

  const handleEditRecipe = (recipe) => {
    console.log('Editing recipe:', recipe)
  }

  const handleDeleteRecipe = (recipeId) => {
    console.log('Deleting recipe:', recipeId)
  }

  const handleEditUser = (user) => {
    console.log('Editing user:', user)
  }

  const handleDeleteUser = (userId) => {
    console.log('Deleting user:', userId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium mr-3">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-gray-700">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recipes'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recipes
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Users
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setShowRecipeForm(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Create Recipe
                </button>
                <button
                  onClick={() => setShowCategoryManager(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Manage Categories
                </button>
                <button
                  onClick={() => setShowSettingsManager(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Configure Settings
                </button>
                <button 
                  onClick={() => navigate('/analytics')}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recipes Content */}
        {activeTab === 'recipes' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recipe Management</h3>
                <button
                  onClick={() => setShowRecipeForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Add Recipe
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipe
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
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
                    {recipes.map((recipe) => (
                      <tr key={recipe.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{recipe.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{recipe.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            recipe.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {recipe.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditRecipe(recipe)}
                            className="text-orange-600 hover:text-orange-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Content */}
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Add User
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
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
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-orange-600 hover:text-orange-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showRecipeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create Recipe</h2>
                <button 
                  onClick={() => setShowRecipeForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <RecipeForm 
                onSave={handleCreateRecipe}
                onClose={() => setShowRecipeForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showCategoryManager && (
        <CategoryManager onClose={() => setShowCategoryManager(false)} />
      )}

      {showSettingsManager && (
        <SettingsManager onClose={() => setShowSettingsManager(false)} />
      )}
    </div>
  )
}

export default Admin