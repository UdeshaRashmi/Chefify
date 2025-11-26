import { useState } from 'react'
import RecipeDetail from './RecipeDetail'

const RecipeList = ({ recipes, title, showViewButton = true }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe)
  }

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                  {recipe.cookTime}
                </span>
                <span className="text-gray-500">
                  {recipe.category}
                </span>
              </div>
              {showViewButton && (
                <button 
                  onClick={() => handleViewRecipe(recipe)}
                  className="w-full mt-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  View Recipe
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  )
}

export default RecipeList