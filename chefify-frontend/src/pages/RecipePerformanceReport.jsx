import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RecipePerformanceReport = () => {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data for recipe performance
  const performanceData = {
    overview: [
      { name: "Total Recipes", value: "142", change: "+12%", changeType: "positive" },
      { name: "Avg. Rating", value: "4.7", change: "+0.3", changeType: "positive" },
      { name: "Recipe Views", value: "24,560", change: "+8.4%", changeType: "positive" },
      { name: "Recipe Saves", value: "3,876", change: "+5.7%", changeType: "positive" }
    ],
    topRecipes: [
      { id: 1, title: "Mediterranean Quinoa Bowl", category: "Vegetarian", views: 1242, saves: 324, rating: 4.8, difficulty: "Easy" },
      { id: 2, title: "Spicy Thai Basil Chicken", category: "Chicken", views: 987, saves: 276, rating: 4.6, difficulty: "Medium" },
      { id: 3, title: "Classic Beef Lasagna", category: "Beef", views: 876, saves: 243, rating: 4.9, difficulty: "Hard" },
      { id: 4, title: "Vegetable Stir Fry", category: "Vegetarian", views: 765, saves: 198, rating: 4.5, difficulty: "Easy" },
      { id: 5, title: "Chocolate Chip Cookies", category: "Dessert", views: 654, saves: 234, rating: 4.7, difficulty: "Easy" }
    ],
    categoryPerformance: [
      { category: "Vegetarian", recipes: 32, views: 4250, saves: 876 },
      { category: "Chicken", recipes: 28, views: 3876, saves: 654 },
      { category: "Beef", recipes: 24, views: 3245, saves: 567 },
      { category: "Seafood", recipes: 18, views: 2109, saves: 432 },
      { category: "Dessert", recipes: 15, views: 1876, saves: 321 }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => navigate('/analytics')}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Analytics
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Recipe Performance Report</h1>
          <p className="text-gray-600 mt-2">Detailed insights into recipe popularity and engagement</p>
        </div>
        <div>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.overview.map((stat, index) => (
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Recipes</h2>
          <div className="space-y-4">
            {performanceData.topRecipes.map((recipe, index) => (
              <div key={recipe.id} className="flex items-center">
                <div className="text-lg font-bold text-gray-400 w-8">#{index + 1}</div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                  <div className="flex text-sm text-gray-500 mt-1">
                    <span className="mr-3">{recipe.category}</span>
                    <span className="mr-3">{recipe.difficulty}</span>
                    <span>{recipe.views} views</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-900">{recipe.rating}</span>
                  <span className="ml-3 text-gray-900">{recipe.saves} saves</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance by Category</h2>
          <div className="space-y-4">
            {performanceData.categoryPerformance.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{category.category}</h3>
                  <p className="text-sm text-gray-500">{category.recipes} recipes</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{category.views}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{category.saves}</p>
                    <p className="text-xs text-gray-500">saves</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recipe Engagement Metrics</h2>
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
                  Views
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saves
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.topRecipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{recipe.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{recipe.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{recipe.views}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{recipe.saves}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-900">{recipe.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-orange-500 rounded-full" 
                        style={{ width: `${Math.min(100, (recipe.saves / recipe.views) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {((recipe.saves / recipe.views) * 100).toFixed(1)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecipePerformanceReport