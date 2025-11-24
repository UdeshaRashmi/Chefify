import React, { useState } from 'react';
import { recipeAPI } from '../services/api';
import IngredientInput from '../components/recipe/IngredientInput';
import RecipeList from '../components/recipe/RecipeList';

const Recipes = () => {
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients);
  };

  const getSuggestions = async () => {
    if (ingredients.length === 0) {
      alert('Please add some ingredients first!');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await recipeAPI.getSuggestions(ingredients);
      if (response.success) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert('Error getting recipe suggestions');
    } finally {
      setLoading(false);
    }
  };

  const popularIngredients = [
    'chicken', 'tomato', 'pasta', 'rice', 'potato', 'onion', 'garlic',
    'cheese', 'egg', 'milk', 'flour', 'sugar', 'butter', 'oil', 'salt'
  ];

  const addPopularIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      const newIngredients = [...ingredients, ingredient];
      setIngredients(newIngredients);
      handleIngredientsChange(newIngredients);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Recipe Suggestions</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tell us what ingredients you have, and we'll find the perfect recipes!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Ingredient Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-4">
                  📝
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Ingredients</h2>
                <p className="text-gray-600">Add ingredients you have in your kitchen</p>
              </div>
              
              <IngredientInput onIngredientsChange={handleIngredientsChange} />
              
              {ingredients.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Ready to find recipes with:</h4>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                      <span key={index} className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={getSuggestions}
                disabled={ingredients.length === 0 || loading}
                className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  ingredients.length === 0 || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-1 hover:shadow-2xl'
                } text-white flex items-center justify-center gap-3`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Finding Recipes...
                  </>
                ) : (
                  <>
                    🍳 Find Recipes
                    {ingredients.length > 0 && (
                      <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                        {ingredients.length} ingredients
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Popular Ingredients */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Popular Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {popularIngredients.map(ingredient => (
                    <button
                      key={ingredient}
                      onClick={() => addPopularIngredient(ingredient)}
                      disabled={ingredients.includes(ingredient)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        ingredients.includes(ingredient)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105'
                      }`}
                    >
                      {ingredient}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {!hasSearched ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white text-center h-full flex items-center justify-center">
                <div className="max-w-md">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                    👨‍🍳
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Ready to Cook Something Amazing?</h2>
                  <p className="text-white/80 mb-6">
                    Add your ingredients on the left and discover recipes you can make right now!
                  </p>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg">💡</span>
                      <p className="text-white/90 text-sm">Add as many ingredients as you have for better matches</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-300 text-lg">🔥</span>
                      <p className="text-white/90 text-sm">We'll show you recipes with the highest match percentage first</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-300 text-lg">⭐</span>
                      <p className="text-white/90 text-sm">See exactly what ingredients you're missing for each recipe</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {suggestions.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Found {suggestions.length} Recipe{suggestions.length !== 1 ? 's' : ''}
                      <span className="ml-3 text-lg font-semibold">
                        {suggestions[0]?.matchPercentage === 100 ? ' 🎉 Perfect Match!' : 
                         suggestions[0]?.matchPercentage >= 80 ? ' 👍 Great Matches' : 
                         ' ✅ Good Options'}
                      </span>
                    </h2>
                    <p className="text-gray-600">Sorted by best match to your ingredients</p>
                  </div>
                )}
                <RecipeList recipes={suggestions} loading={loading} showMatch={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;