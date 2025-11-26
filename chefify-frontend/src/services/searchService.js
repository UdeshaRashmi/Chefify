// Search service for advanced recipe searching and filtering

/**
 * Normalize text for search comparison
 * @param {string} text 
 * @returns {string}
 */
const normalizeText = (text) => {
  if (!text) return ''
  return text.toString().toLowerCase().trim()
}

/**
 * Check if text contains all search terms
 * @param {string} text 
 * @param {string[]} searchTerms 
 * @returns {boolean}
 */
const containsAllTerms = (text, searchTerms) => {
  const normalizedText = normalizeText(text)
  return searchTerms.every(term => normalizedText.includes(term))
}

/**
 * Calculate search relevance score
 * @param {Object} recipe 
 * @param {string} query 
 * @returns {number}
 */
const calculateRelevanceScore = (recipe, query) => {
  // Guard clause for missing recipe
  if (!recipe) return 0
  
  if (!query) return recipe.rating || 0
  
  const normalizedQuery = normalizeText(query)
  const title = normalizeText(recipe.title || '')
  const description = normalizeText(recipe.description || '')
  const ingredients = recipe.ingredients ? recipe.ingredients.map(normalizeText).join(' ') : ''
  const category = normalizeText(recipe.category || '')
  
  let score = 0
  
  // Exact title match gets highest score
  if (title === normalizedQuery) {
    score += 100
  } 
  // Title starts with query
  else if (title.startsWith(normalizedQuery)) {
    score += 75
  } 
  // Title contains query
  else if (title.includes(normalizedQuery)) {
    score += 50
  }
  
  // Description matches
  if (description.includes(normalizedQuery)) {
    score += 25
  }
  
  // Ingredients match
  if (ingredients.includes(normalizedQuery)) {
    score += 20
  }
  
  // Category match
  if (category.includes(normalizedQuery)) {
    score += 15
  }
  
  // Partial term matches
  const queryTerms = normalizedQuery.split(' ').filter(term => term.length > 0)
  if (queryTerms.length > 0) {
    if (containsAllTerms(title, queryTerms)) score += 30
    if (containsAllTerms(description, queryTerms)) score += 15
    if (containsAllTerms(ingredients, queryTerms)) score += 10
    if (containsAllTerms(category, queryTerms)) score += 5
  }
  
  // Boost by rating
  score += (recipe.rating || 0) * 2
  
  return score
}

/**
 * Filter recipes based on search criteria
 * @param {Object[]} recipes 
 * @param {string} query 
 * @param {Object} filters 
 * @returns {Object[]}
 */
export const filterRecipes = (recipes, query, filters) => {
  // Guard clauses
  if (!recipes || !Array.isArray(recipes)) return []
  
  let results = [...recipes]
  
  // Apply text search
  if (query && query.trim() !== '') {
    const searchTerms = normalizeText(query).split(' ').filter(term => term.length > 0)
    
    results = results.filter(recipe => {
      // Guard clause for missing recipe
      if (!recipe) return false
      
      const title = normalizeText(recipe.title || '')
      const description = normalizeText(recipe.description || '')
      const ingredients = recipe.ingredients ? recipe.ingredients.map(normalizeText).join(' ') : ''
      const category = normalizeText(recipe.category || '')
      
      // Match all search terms in any field
      return searchTerms.every(term => 
        title.includes(term) || 
        description.includes(term) || 
        ingredients.includes(term) ||
        category.includes(term)
      )
    })
  }
  
  // Apply filters
  if (filters) {
    if (filters.category) {
      results = results.filter(recipe => {
        if (!recipe) return false
        return normalizeText(recipe.category || '') === normalizeText(filters.category)
      })
    }
    
    if (filters.difficulty) {
      results = results.filter(recipe => {
        if (!recipe) return false
        return normalizeText(recipe.difficulty || '') === normalizeText(filters.difficulty)
      })
    }
    
    if (filters.maxCookTime) {
      const maxTime = parseInt(filters.maxCookTime)
      results = results.filter(recipe => {
        if (!recipe) return false
        const cookTimeMatch = (recipe.cookTime || '').match(/\d+/)
        if (!cookTimeMatch) return false
        const cookTime = parseInt(cookTimeMatch[0])
        return cookTime <= maxTime
      })
    }
  }
  
  return results
}

/**
 * Sort recipes based on sort criteria
 * @param {Object[]} recipes 
 * @param {string} sortBy 
 * @param {string} query 
 * @returns {Object[]}
 */
export const sortRecipes = (recipes, sortBy, query) => {
  // Guard clauses
  if (!recipes || !Array.isArray(recipes)) return []
  
  const results = [...recipes]
  
  switch (sortBy) {
    case 'name':
      results.sort((a, b) => {
        if (!a || !b) return 0
        return normalizeText(a.title || '').localeCompare(normalizeText(b.title || ''))
      })
      break
      
    case 'cookTime':
      results.sort((a, b) => {
        if (!a || !b) return 0
        const timeA = parseInt((a.cookTime || '').match(/\d+/)?.[0] || '0')
        const timeB = parseInt((b.cookTime || '').match(/\d+/)?.[0] || '0')
        return timeA - timeB
      })
      break
      
    case 'difficulty':
      {
        const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
        results.sort((a, b) => {
          if (!a || !b) return 0
          const diffA = normalizeText(a.difficulty || '')
          const diffB = normalizeText(b.difficulty || '')
          return difficultyOrder[diffA] - difficultyOrder[diffB]
        })
        break
      }
      
    case 'rating':
      results.sort((a, b) => {
        if (!a || !b) return 0
        return (b.rating || 0) - (a.rating || 0)
      })
      break
      
    case 'relevance':
    default:
      // Sort by relevance score when searching
      if (query && query.trim() !== '') {
        results.sort((a, b) => {
          if (!a || !b) return 0
          const scoreA = calculateRelevanceScore(a, query)
          const scoreB = calculateRelevanceScore(b, query)
          return scoreB - scoreA
        })
      } else {
        // Default to rating when no query
        results.sort((a, b) => {
          if (!a || !b) return 0
          return (b.rating || 0) - (a.rating || 0)
        })
      }
      break
  }
  
  return results
}

/**
 * Perform complete search with filtering and sorting
 * @param {Object[]} recipes 
 * @param {string} query 
 * @param {Object} filters 
 * @param {string} sortBy 
 * @returns {Object[]}
 */
export const searchRecipes = (recipes, query, filters, sortBy) => {
  // Guard clauses
  if (!recipes || !Array.isArray(recipes)) return []
  
  let results = filterRecipes(recipes, query, filters)
  results = sortRecipes(results, sortBy, query)
  return results
}

export default {
  filterRecipes,
  sortRecipes,
  searchRecipes
}