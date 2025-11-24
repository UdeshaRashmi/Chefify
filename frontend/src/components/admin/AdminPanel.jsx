import React, { useState, useEffect } from 'react';
import { recipeAPI } from '../../services/api';
import RecipeForm from './RecipeForm';
import RecipeList from '../recipe/RecipeList';

const AdminPanel = () => {
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
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Edit Recipe</h1>
          <button onClick={cancelEditing} className="btn btn-secondary">
            Cancel Editing
          </button>
        </div>
        <RecipeForm
          onSubmit={handleUpdateRecipe}
          initialData={editingRecipe}
          isEditing={true}
        />
      </div>
    );
  }

  if (showForm) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Add New Recipe</h1>
          <button onClick={() => setShowForm(false)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
        <RecipeForm onSubmit={handleCreateRecipe} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Recipe Management</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Add New Recipe
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Total Recipes: {recipes.length}</p>
      </div>

      <div>
        {recipes.map(recipe => (
          <div key={recipe._id} className="card" style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="ingredient-tag">{recipe.category}</span>
                  <span className="ingredient-tag">{recipe.difficulty}</span>
                  <span className="ingredient-tag">{recipe.prepTime + recipe.cookTime} mins</span>
                  <span className="ingredient-tag">{recipe.ingredients.length} ingredients</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => startEditing(recipe)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteRecipe(recipe._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>No recipes yet</h3>
          <p>Click "Add New Recipe" to create your first recipe!</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;