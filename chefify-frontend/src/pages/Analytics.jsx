import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatsCard from '../components/admin/StatsCard'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const navigate = useNavigate()
  
  const analyticsData = {
    overview: [
      { name: "Total Recipes", value: "142", change: "+12%", changeType: "positive" },
      { name: "Active Users", value: "1,284", change: "+5.2%", changeType: "positive" },
      { name: "New Recipes", value: "28", change: "-2.1%", changeType: "negative" },
      { name: "Avg. Rating", value: "4.7", change: "+0.3", changeType: "positive" }
    ],
    popularRecipes: [
      { id: 1, title: "Mediterranean Quinoa Bowl", views: 1242, saves: 324, rating: 4.8 },
      { id: 2, title: "Spicy Thai Basil Chicken", views: 987, saves: 276, rating: 4.6 },
      { id: 3, title: "Classic Beef Lasagna", views: 876, saves: 243, rating: 4.9 },
      { id: 4, title: "Vegetable Stir Fry", views: 765, saves: 198, rating: 4.5 },
      { id: 5, title: "Chocolate Chip Cookies", views: 654, saves: 234, rating: 4.7 }
    ],
    userActivity: [
      { day: "Mon", users: 120, recipes: 42 },
      { day: "Tue", users: 150, recipes: 56 },
      { day: "Wed", users: 180, recipes: 68 },
      { day: "Thu", users: 140, recipes: 52 },
      { day: "Fri", users: 190, recipes: 72 },
      { day: "Sat", users: 220, recipes: 89 },
      { day: "Sun", users: 200, recipes: 81 }
    ]
  }

  const handleViewReport = (reportType) => {
    // Navigate to detailed report pages based on report type
    switch(reportType) {
      case 'User Engagement':
        navigate('/analytics/user-engagement')
        break
      case 'Recipe Performance':
        navigate('/analytics/recipe-performance')
        break
      case 'Traffic Sources':
        navigate('/analytics/traffic-sources')
        break
      default:
        navigate('/analytics')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track user engagement and content performance</p>
        </div>
        <div className="mt-4 md:mt-0">
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
        {analyticsData.overview.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Activity</h2>
          <div className="h-80 flex items-end space-x-2 justify-center">
            {analyticsData.userActivity.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2">{data.day}</div>
                <div 
                  className="w-10 bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-colors"
                  style={{ height: `${(data.users / 250) * 200}px` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{data.users}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Recipes</h2>
          <div className="space-y-4">
            {analyticsData.popularRecipes.map((recipe, index) => (
              <div key={recipe.id} className="flex items-center">
                <div className="text-lg font-bold text-gray-400 w-8">#{index + 1}</div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                  <div className="flex text-sm text-gray-500 mt-1">
                    <span className="mr-4">{recipe.views} views</span>
                    <span>{recipe.saves} saves</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-900">{recipe.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2">User Engagement</h3>
            <p className="text-gray-600 text-sm mb-4">Track how users interact with your platform</p>
            <button 
              onClick={() => handleViewReport('User Engagement')}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              View Report →
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Recipe Performance</h3>
            <p className="text-gray-600 text-sm mb-4">Analyze which recipes are most popular</p>
            <button 
              onClick={() => handleViewReport('Recipe Performance')}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              View Report →
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Traffic Sources</h3>
            <p className="text-gray-600 text-sm mb-4">See where your visitors are coming from</p>
            <button 
              onClick={() => handleViewReport('Traffic Sources')}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              View Report →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics