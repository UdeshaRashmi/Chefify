import { useState } from 'react'
import RecipeCard from '../components/recipe/RecipeCard'

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      description: "A healthy and flavorful bowl packed with fresh vegetables and herbs.",
      cookTime: "25 mins",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.8
    },
    {
      id: 2,
      title: "Classic Beef Lasagna",
      description: "Layers of pasta, rich meat sauce, and creamy béchamel.",
      cookTime: "1 hr 20 mins",
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.9
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with tofu",
      cookTime: "20 mins",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.5
    },
    {
      id: 4,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade cookies with melty chocolate chips.",
      cookTime: "25 mins",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.7
    }
  ])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id))
  }

  const handleViewRecipe = (recipe) => {
    // In a real app, this would open a modal or navigate to the recipe detail page
    alert(`Viewing recipe: ${recipe.title}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
        <p className="text-gray-600">Your saved recipes collection</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">Start exploring recipes and save your favorites!</p>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Browse Recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              showRemoveButton={true}
              showViewButton={true}
              onRemove={removeFavorite}
              onView={handleViewRecipe}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites