import { useState } from 'react'

const CategoryManager = ({ onClose }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Vegetarian", recipeCount: 24 },
    { id: 2, name: "Chicken", recipeCount: 18 },
    { id: 3, name: "Beef", recipeCount: 15 },
    { id: 4, name: "Seafood", recipeCount: 12 },
    { id: 5, name: "Dessert", recipeCount: 9 },
    { id: 6, name: "Breakfast", recipeCount: 7 }
  ])
  
  const [newCategory, setNewCategory] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const newCat = {
        id: Date.now(),
        name: newCategory.trim(),
        recipeCount: 0
      }
      setCategories([...categories, newCat])
      setNewCategory('')
    }
  }

  const handleStartEdit = (category) => {
    setEditingId(category.id)
    setEditValue(category.name)
  }

  const handleSaveEdit = () => {
    if (editValue.trim() !== '') {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, name: editValue.trim() } : cat
      ))
      setEditingId(null)
      setEditValue('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const handleDelete = (id) => {
    // Check if category has recipes
    const category = categories.find(cat => cat.id === id)
    if (category.recipeCount > 0) {
      alert(`Cannot delete "${category.name}" because it has ${category.recipeCount} recipes. Please reassign recipes first.`)
      return
    }
    
    setCategories(categories.filter(cat => cat.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Add New Category */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Add New Category</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Existing Categories</h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    {editingId === category.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.recipeCount} recipes</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(category)}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            disabled={category.recipeCount > 0}
                            className={`${category.recipeCount > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-red-500 hover:text-red-700'}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">How to Use</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click the pencil icon to edit a category name</li>
                <li>• Categories with recipes cannot be deleted</li>
                <li>• Add new categories to organize your recipes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryManager