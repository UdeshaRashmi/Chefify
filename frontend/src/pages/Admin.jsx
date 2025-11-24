import React, { useState, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import RecipeForm from '../components/admin/RecipeForm';
import RecipeList from '../components/recipe/RecipeList';

const Admin = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const response = await recipeAPI.getAllRecipes();
      if (response.success) {
        setRecipes(response.data);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      alert('Error loading recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (recipeData) => {
    try {
      const response = await recipeAPI.createRecipe(recipeData);
      if (response.success) {
        alert('Recipe created successfully!');
        setShowForm(false);
        loadRecipes();
      } else {
        alert('Error creating recipe: ' + response.message);
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Error creating recipe');
    }
  };

  const handleUpdateRecipe = async (recipeData) => {
    try {
      const response = await recipeAPI.updateRecipe(editingRecipe._id, recipeData);
      if (response.success) {
        alert('Recipe updated successfully!');
        setEditingRecipe(null);
        loadRecipes();
      } else {
        alert('Error updating recipe: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Error updating recipe');
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const response = await recipeAPI.deleteRecipe(recipeId);
        if (response.success) {
          alert('Recipe deleted successfully!');
          loadRecipes();
        } else {
          alert('Error deleting recipe: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Error deleting recipe');
      }
    }
  };

  const startEditing = (recipe) => {
    setEditingRecipe(recipe);
  };

  const cancelEditing = () => {
    setEditingRecipe(null);
  };

  if (editingRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Edit Recipe</h1>
            <button 
              onClick={cancelEditing}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel Editing
            </button>
          </div>
          <RecipeForm
            onSubmit={handleUpdateRecipe}
            initialData={editingRecipe}
            isEditing={true}
          />
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Add New Recipe</h1>
            <button 
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          <RecipeForm onSubmit={handleCreateRecipe} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Recipe Management</h1>
            <p className="text-gray-600 mt-2">Manage your recipe collection</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            + Add New Recipe
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{recipes.length}</div>
            <div className="text-gray-600">Total Recipes</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {recipes.filter(r => r.difficulty === 'Easy').length}
            </div>
            <div className="text-gray-600">Easy Recipes</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {recipes.filter(r => r.category === 'Dinner').length}
            </div>
            <div className="text-gray-600">Dinner Recipes</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(recipes.map(r => r.category)).size}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>

        {/* Recipes List */}
        <div className="space-y-4">
          {recipes.map(recipe => (
            <div key={recipe._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.difficulty}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      ⏱️ {recipe.prepTime + recipe.cookTime}m
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.ingredients.length} ingredients
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => startEditing(recipe)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center text-3xl text-gray-400 mx-auto mb-4">
              📝
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No recipes yet</h3>
            <p className="text-gray-500 mb-6">Click "Add New Recipe" to create your first recipe!</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              + Create Your First Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;