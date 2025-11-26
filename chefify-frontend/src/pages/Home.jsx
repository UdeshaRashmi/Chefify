import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import RecipeCard from '../components/recipe/RecipeCard'
import SearchBar from '../components/recipe/SearchBar'

const Home = () => {
  const { isAuthenticated, user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  
  const featuredRecipes = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      description: "A healthy and flavorful bowl packed with fresh vegetables and herbs.",
      cookTime: 25,
      prepTime: 15,
      difficulty: "Easy",
      category: "Lunch",
      ingredients: ["quinoa", "cherry tomatoes", "cucumber", "red onion", "feta cheese", "olives"],
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Spicy Thai Basil Chicken",
      description: "Authentic Thai stir-fry with aromatic basil and chilies.",
      cookTime: 15,
      prepTime: 10,
      difficulty: "Medium",
      category: "Dinner",
      ingredients: ["chicken", "thai basil", "chili", "garlic", "fish sauce", "rice"],
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Classic Beef Lasagna",
      description: "Layers of pasta, rich meat sauce, and creamy béchamel.",
      cookTime: 60,
      prepTime: 30,
      difficulty: "Hard",
      category: "Dinner",
      ingredients: ["lasagna noodles", "ground beef", "tomato sauce", "ricotta cheese", "mozzarella", "parmesan"],
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover Amazing <span className="text-orange-600">Recipes</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Join our community of food lovers and explore thousands of delicious recipes from around the world.
        </p>
        
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/recipes" 
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Explore Recipes
            </Link>
            <Link 
              to="/submit-recipe" 
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Share Your Recipe
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Get Started - It's Free
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search recipes..."
        />
      </div>

      {/* Welcome Section for Authenticated Users */}
      {isAuthenticated && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600 mb-6">Ready to discover new recipes or cook something delicious?</p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/meal-planner" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Plan Your Meals
            </Link>
            <Link 
              to="/favorites" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Favorites
            </Link>
            <Link 
              to="/suggestions" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Get Suggestions
            </Link>
          </div>
        </div>
      )}

      {/* Featured Recipes */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Recipes</h2>
          <Link 
            to="/recipes" 
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            View All Recipes
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white">10K+</p>
            <p className="text-orange-100">Recipes</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">50K+</p>
            <p className="text-orange-100">Happy Cooks</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">100+</p>
            <p className="text-orange-100">Countries</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home