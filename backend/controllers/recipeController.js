const Recipe = require('../models/Recipe');

// @desc    Get all recipes with filtering and pagination
// @route   GET /api/recipes
// @access  Public
const getAllRecipes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      difficulty,
      cuisine,
      search,
      tags
    } = req.query;

    // Build filter object
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (cuisine) filter.cuisine = { $regex: cuisine, $options: 'i' };
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      filter.tags = { $in: tagArray };
    }
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with pagination
    const recipes = await Recipe.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Recipe.countDocuments(filter);

    res.json({
      success: true,
      count: recipes.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      },
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (!recipe.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not available'
      });
    }

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Public (should be protected in production)
const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Public (should be protected in production)
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete recipe (soft delete)
// @route   DELETE /api/recipes/:id
// @access  Public (should be protected in production)
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Suggest recipes based on available ingredients
// @route   POST /api/recipes/suggest
// @access  Public
const suggestRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of ingredients'
      });
    }

    // Convert ingredients to lowercase for case-insensitive matching
    const ingredientNames = ingredients.map(ing => 
      typeof ing === 'string' ? ing.trim().toLowerCase() : String(ing).toLowerCase()
    );

    // Find recipes that contain any of the provided ingredients
    const recipes = await Recipe.findByIngredients(ingredientNames);

    // Calculate match percentage and sort by best match
    const recipesWithMatch = recipes.map(recipe => {
      const matchingIngredients = recipe.getMatchingIngredients(ingredientNames);
      const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
      
      return {
        ...recipe.toObject(),
        matchPercentage: Math.round(matchPercentage),
        matchingIngredients,
        missingIngredients: recipe.ingredients
          .filter(ing => !matchingIngredients.includes(ing.name.toLowerCase()))
          .map(ing => ({
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit
          }))
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({
      success: true,
      count: recipesWithMatch.length,
      userIngredients: ingredientNames,
      data: recipesWithMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get recipe categories
// @route   GET /api/recipes/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Recipe.distinct('category', { isActive: true });
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Search recipes by name or ingredients
// @route   GET /api/recipes/search/:query
// @access  Public
const searchRecipes = async (req, res) => {
  try {
    const { query } = req.params;
    
    const recipes = await Recipe.find(
      { 
        $text: { $search: query },
        isActive: true 
      },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  suggestRecipes,
  getCategories,
  searchRecipes
};
