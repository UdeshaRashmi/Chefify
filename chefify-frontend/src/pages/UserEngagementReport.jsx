import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserEngagementReport = () => {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data for user engagement
  const engagementData = {
    overview: [
      { name: "Active Users", value: "1,284", change: "+5.2%", changeType: "positive" },
      { name: "Session Duration", value: "8m 42s", change: "+1.2%", changeType: "positive" },
      { name: "Pages per Session", value: "4.2", change: "-0.3%", changeType: "negative" },
      { name: "Bounce Rate", value: "32.4%", change: "-2.1%", changeType: "positive" }
    ],
    userActivity: [
      { hour: "00:00", users: 12 },
      { hour: "04:00", users: 8 },
      { hour: "08:00", users: 45 },
      { hour: "12:00", users: 120 },
      { hour: "16:00", users: 180 },
      { hour: "20:00", users: 220 },
      { hour: "24:00", users: 65 }
    ],
    topPages: [
      { page: "/recipes", views: 2450, avgTime: "5m 20s" },
      { page: "/recipes/mediterranean-quinoa-bowl", views: 1876, avgTime: "7m 15s" },
      { page: "/meal-planner", views: 1543, avgTime: "4m 30s" },
      { page: "/favorites", views: 1204, avgTime: "3m 45s" },
      { page: "/", views: 987, avgTime: "2m 10s" }
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
          <h1 className="text-3xl font-bold text-gray-800">User Engagement Report</h1>
          <p className="text-gray-600 mt-2">Detailed insights into how users interact with your platform</p>
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
        {engagementData.overview.map((stat, index) => (
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Activity by Hour</h2>
          <div className="h-80 flex items-end space-x-2 justify-center">
            {engagementData.userActivity.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2">{data.hour}</div>
                <div 
                  className="w-8 bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-colors"
                  style={{ height: `${(data.users / 250) * 200}px` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{data.users}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Pages</h2>
          <div className="space-y-4">
            {engagementData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-lg font-bold text-gray-400 w-8">#{index + 1}</div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{page.page}</h3>
                    <p className="text-sm text-gray-500">{page.avgTime} avg. time</p>
                  </div>
                </div>
                <div className="text-gray-900 font-medium">{page.views} views</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Engagement Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  New User Retention (Day 1)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  42.5%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +3.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '42.5%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  New User Retention (Week 1)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  28.7%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +1.8%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '28.7%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Returning User Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  64.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  -1.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: '64.2%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Daily Active Users
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,284
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +5.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '85.6%' }}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserEngagementReport