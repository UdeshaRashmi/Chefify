import { useState } from 'react'
import StatsCard from './StatsCard'
import RecipeList from './RecipeList'
import UserList from './UserList'
import CategoryManager from './CategoryManager'
import SettingsManager from './SettingsManager'

const AdminPanel = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
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
                <StatsCard key={index} stat={stat} />
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
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recipes Content */}
        {activeTab === 'recipes' && (
          <RecipeList 
            recipes={recipes}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            onCreate={() => setShowRecipeForm(true)}
          />
        )}

        {/* Users Content */}
        {activeTab === 'users' && (
          <UserList 
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
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
              {/* Recipe form would go here */}
              <p>Recipe form content would be displayed here</p>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowRecipeForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
                >
                  Save Recipe
                </button>
              </div>
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

export default AdminPanel