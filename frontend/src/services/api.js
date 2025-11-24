const API_BASE_URL = '/api';

export const recipeAPI = {
  // Get all recipes
  getAllRecipes: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/recipes?${queryParams}`);
    return response.json();
  },

  // Get recipe by ID
  getRecipeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    return response.json();
  },

  // Get recipe suggestions
  getSuggestions: async (ingredients) => {
    const response = await fetch(`${API_BASE_URL}/recipes/suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });
    return response.json();
  },

  // Get categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/recipes/categories`);
    return response.json();
  },

  // Search recipes
  searchRecipes: async (query) => {
    const response = await fetch(`${API_BASE_URL}/recipes/search/${query}`);
    return response.json();
  },

  // Admin: Create recipe
  createRecipe: async (recipeData) => {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    return response.json();
  },

  // Admin: Update recipe
  updateRecipe: async (id, recipeData) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    return response.json();
  },

  // Admin: Delete recipe
  deleteRecipe: async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};