const StatsCard = ({ stat }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
        <p className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {stat.change}
        </p>
      </div>
    </div>
  )
}

export default StatsCard