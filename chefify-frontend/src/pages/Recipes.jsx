import { useState, useEffect } from 'react'
import RecipeList from '../components/recipe/RecipeList'
import SearchBar from '../components/recipe/SearchBar'

const Recipes = () => {
  // Mock data for recipes
  const mockRecipes = [
    {
      id: 1,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with tofu",
      cookTime: "20 mins",
      difficulty: "Easy",
      category: "Vegetarian",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Chicken Alfredo Pasta",
      description: "Creamy pasta with grilled chicken and parmesan cheese",
      cookTime: "30 mins",
      difficulty: "Medium",
      category: "Chicken",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Beef Tacos",
      description: "Authentic Mexican tacos with seasoned ground beef",
      cookTime: "25 mins",
      difficulty: "Easy",
      category: "Beef",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Salmon Teriyaki",
      description: "Grilled salmon glazed with homemade teriyaki sauce",
      cookTime: "35 mins",
      difficulty: "Medium",
      category: "Seafood",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Greek Salad",
      description: "Fresh salad with feta cheese, olives, and Mediterranean dressing",
      cookTime: "15 mins",
      difficulty: "Easy",
      category: "Vegetarian",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      title: "Chocolate Brownies",
      description: "Rich and fudgy chocolate brownies with walnuts",
      cookTime: "45 mins",
      difficulty: "Easy",
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    }
  ]

  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Vegetarian', 'Chicken', 'Beef', 'Seafood', 'Dessert']

  // Filter recipes when category or search query changes
  useEffect(() => {
    const filterRecipes = () => {
      let result = mockRecipes
      
      if (selectedCategory !== 'All') {
        result = result.filter(recipe => recipe.category === selectedCategory)
      }
      
      if (searchQuery) {
        result = result.filter(recipe => 
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      setFilteredRecipes(result)
    }
    
    filterRecipes()
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Recipes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover a wide variety of delicious recipes for every occasion. Filter by category or search for specific dishes.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              placeholder="Search recipes..." 
            />
          </div>
          <div className="flex items-center">
            <select
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe List */}
      {filteredRecipes.length > 0 ? (
        <RecipeList recipes={filteredRecipes} showViewButton={true} />
      ) : (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No recipes found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default Recipes