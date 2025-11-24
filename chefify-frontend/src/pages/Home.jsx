import { useState } from 'react'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const featuredRecipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      description: "A healthy and flavorful bowl packed with fresh vegetables and herbs.",
      cookTime: "25 mins",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Spicy Thai Basil Chicken",
      description: "Authentic Thai stir-fry with aromatic basil and chilies.",
      cookTime: "15 mins",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Classic Beef Lasagna",
      description: "Layers of pasta, rich meat sauce, and creamy béchamel.",
      cookTime: "1 hr 20 mins",
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle search submission
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Recipes</h1>
          <p className="text-xl mb-8 opacity-90">Find, create, and share delicious recipes from around the world</p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recipes, ingredients, or cuisines..."
                className="flex-grow px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Recipes */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Recipes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {recipe.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{recipe.cookTime}</span>
                  <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                    View Recipe →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Chefify?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Easy to Use</h3>
            <p className="text-gray-600">Intuitive interface makes finding and creating recipes simple for everyone.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Save Favorites</h3>
            <p className="text-gray-600">Bookmark your favorite recipes and access them anytime from any device.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Meal Planning</h3>
            <p className="text-gray-600">Plan your weekly meals and generate shopping lists with one click.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home