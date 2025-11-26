import { useState, useEffect } from 'react'

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search recipes..." }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Update local query when searchQuery prop changes
  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [localQuery, setSearchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Immediately apply the search when form is submitted
    setSearchQuery(localQuery)
  }

  const handleClear = () => {
    setLocalQuery('')
    setSearchQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar