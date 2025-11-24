const express = require('express');
const router = express.Router();
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

// Public routes
router.get('/', getAllRecipes);
router.get('/categories', getCategories);
router.get('/search/:query', searchRecipes);
router.get('/:id', getRecipeById);

// Suggestion route (requires ingredients in request body)
router.post('/suggest', suggestRecipes);

// Admin routes (should be protected in production)
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
