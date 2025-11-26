const RecipeCard = ({ 
  recipe, 
  onRemove, 
  showRemoveButton = false,
  showViewButton = true,
  onView 
}) => {
  // Fallback values for recipe properties
  const title = recipe.name || recipe.title || "Untitled Recipe";
  const description = recipe.description || "";
  const cookTime = recipe.cookTime || 0;
  const prepTime = recipe.prepTime || 0;
  const difficulty = recipe.difficulty || "Medium";
  const category = recipe.category || "";
  const ingredients = recipe.ingredients || [];
  const image = recipe.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80";
  const rating = recipe.rating || null;
  const reviews = recipe.reviews || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {difficulty}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        {/* Recipe metadata for better search visibility */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
            Cook: {cookTime} min
          </span>
          {prepTime > 0 && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              Prep: {prepTime} min
            </span>
          )}
          {category && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
        
        {/* Ingredients preview */}
        {ingredients.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {Array.isArray(ingredients) ? 
                ingredients.slice(0, 3).map(ing => 
                  typeof ing === 'string' ? ing : (ing.name || '')
                ).filter(Boolean).join(', ') : ''}
              {ingredients.length > 3 ? '...' : ''}
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm">
          {rating && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">{rating}</span>
              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-4 space-x-2">
          {showViewButton && onView && (
            <button 
              onClick={() => onView(recipe)}
              className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              View Recipe
            </button>
          )}
          {showRemoveButton && onRemove && (
            <button 
              onClick={() => onRemove(recipe.id)}
              className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard