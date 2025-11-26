import { useState, useEffect, useMemo } from 'react'
import RecipeCard from '../components/recipe/RecipeCard'
import SearchBar from '../components/recipe/SearchBar'
import { getRecipes } from '../services/api'
import { searchRecipes } from '../services/searchService'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    maxCookTime: ''
  })
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const data = await getRecipes()
        setRecipes(data || [])
        setFilteredRecipes(data || [])
      } catch (error) {
        console.error('Error fetching recipes:', error)
        setRecipes([])
        setFilteredRecipes([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  // Get unique categories and difficulties for filter options
  const categories = useMemo(() => {
    if (!recipes || !Array.isArray(recipes)) return []
    const uniqueCategories = [...new Set(recipes.map(recipe => recipe?.category || '').filter(cat => cat !== ''))]
    return uniqueCategories.sort()
  }, [recipes])

  const difficulties = useMemo(() => {
    if (!recipes || !Array.isArray(recipes)) return []
    const uniqueDifficulties = [...new Set(recipes.map(recipe => recipe?.difficulty || '').filter(diff => diff !== ''))]
    return uniqueDifficulties.sort()
  }, [recipes])

  // Apply search whenever query, filters, or sort changes
  useEffect(() => {
    try {
      const results = searchRecipes(recipes, searchQuery, filters, sortBy)
      setFilteredRecipes(results)
    } catch (error) {
      console.error('Error searching recipes:', error)
      setFilteredRecipes([])
    }
  }, [searchQuery, filters, sortBy, recipes])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      difficulty: '',
      maxCookTime: ''
    })
    setSortBy('relevance')
    setSearchQuery('')
  }

  const hasActiveFilters = filters.category || filters.difficulty || filters.maxCookTime || sortBy !== 'relevance' || searchQuery

  // Handle loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  // Handle error state
  if (!recipes || !Array.isArray(recipes)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading recipes</h3>
          <p className="mt-1 text-gray-500">
            There was a problem loading the recipes. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Recipes</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find your perfect recipe by name, ingredient, category, or cooking time
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by recipe name, ingredient, or category..."
        />
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-sm text-orange-600 hover:text-orange-800 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="">All Levels</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Cook Time (mins)</label>
            <select
              value={filters.maxCookTime}
              onChange={(e) => handleFilterChange('maxCookTime', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="">Any Time</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name</option>
              <option value="cookTime">Cook Time</option>
              <option value="difficulty">Difficulty</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="text-gray-600">
          Found {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
        </p>
        {searchQuery && (
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Search results for: <span className="font-medium">"{searchQuery}"</span>
          </p>
        )}
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No recipes found</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery 
              ? `No recipes match your search for "${searchQuery}". Try different keywords or filters.`
              : 'Try adjusting your filters to find what you\'re looking for.'
            }
          </p>
          {hasActiveFilters && (
            <div className="mt-6">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search