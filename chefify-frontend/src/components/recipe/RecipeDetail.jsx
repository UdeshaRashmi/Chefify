import { useState } from 'react'

const RecipeDetail = ({ recipe, onClose }) => {
  const [servings, setServings] = useState(4)
  
  // Mock recipe data with full details
  const fullRecipe = {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description || "A delicious recipe that's perfect for any occasion.",
    cookTime: recipe.cookTime || "30 mins",
    prepTime: "15 mins",
    difficulty: recipe.difficulty || "Medium",
    category: recipe.category || "General",
    image: recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 24,
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup sugar",
      "1/2 cup butter, melted",
      "2 eggs",
      "1 teaspoon vanilla extract",
      "1 teaspoon baking powder",
      "1/4 teaspoon salt",
      "1/2 cup milk"
    ],
    instructions: [
      "Preheat the oven to 350°F (175°C).",
      "In a large bowl, mix together flour, sugar, baking powder, and salt.",
      "In another bowl, whisk together melted butter, eggs, vanilla, and milk.",
      "Gradually mix the wet ingredients into the dry ingredients until just combined.",
      "Pour the batter into a greased 9x9 inch baking pan.",
      "Bake for 25-30 minutes or until a toothpick inserted in the center comes out clean.",
      "Allow to cool before serving."
    ],
    nutrition: {
      calories: 280,
      protein: "5g",
      carbs: "42g",
      fat: "12g"
    }
  }

  const adjustServings = (amount) => {
    setServings(Math.max(1, servings + amount))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{fullRecipe.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Recipe Image */}
          <div className="mb-6">
            <img 
              src={fullRecipe.image} 
              alt={fullRecipe.title} 
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-500">Prep Time</div>
              <div className="font-semibold">{fullRecipe.prepTime}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-500">Cook Time</div>
              <div className="font-semibold">{fullRecipe.cookTime}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-500">Difficulty</div>
              <div className="font-semibold">{fullRecipe.difficulty}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-500">Servings</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <button 
                  onClick={() => adjustServings(-1)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="font-semibold">{servings}</span>
                <button 
                  onClick={() => adjustServings(1)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {fullRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1.5 mr-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
              <ol className="space-y-4">
                {fullRecipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nutrition Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-600">{fullRecipe.nutrition.calories}</div>
                <div className="text-sm text-gray-500">Calories</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-600">{fullRecipe.nutrition.protein}</div>
                <div className="text-sm text-gray-500">Protein</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-600">{fullRecipe.nutrition.carbs}</div>
                <div className="text-sm text-gray-500">Carbs</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-600">{fullRecipe.nutrition.fat}</div>
                <div className="text-sm text-gray-500">Fat</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Save Recipe
            </button>
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail