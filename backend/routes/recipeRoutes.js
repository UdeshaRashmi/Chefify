const express = require('express');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  suggestRecipes,
  getCategories,
  searchRecipes
} = require('../controllers/recipeController');

const router = express.Router();

// Get recipe categories
router.get('/categories', getCategories);

// Search recipes
router.get('/search/:query', searchRecipes);

// Suggest recipes based on ingredients
router.post('/suggest', suggestRecipes);

// Get all recipes with filtering and pagination
router.get('/', getAllRecipes);

// Get single recipe by ID
router.get('/:id', getRecipeById);

// Create new recipe
router.post('/', createRecipe);

// Update recipe
router.put('/:id', updateRecipe);

// Delete recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
