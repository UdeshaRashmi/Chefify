const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  quantity: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: ''
  }
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true,
    maxlength: [100, 'Recipe name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: [String],
    required: [true, 'Instructions are required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one instruction is required'
    }
  },
  prepTime: {
    type: Number, // in minutes
    required: [true, 'Preparation time is required'],
    min: [1, 'Preparation time must be at least 1 minute']
  },
  cookTime: {
    type: Number, // in minutes
    required: [true, 'Cooking time is required'],
    min: [0, 'Cooking time cannot be negative']
  },
  totalTime: {
    type: Number // in minutes
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer', 'Beverage']
  },
  cuisine: {
    type: String,
    default: 'International'
  },
  servings: {
    type: Number,
    required: [true, 'Servings is required'],
    min: [1, 'Servings must be at least 1']
  },
  image: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  nutrition: {
    calories: { type: Number, min: 0 },
    protein: { type: Number, min: 0 }, // in grams
    carbs: { type: Number, min: 0 },   // in grams
    fat: { type: Number, min: 0 }      // in grams
  }
}, {
  timestamps: true
});

// Calculate total time before saving
recipeSchema.pre('save', function(next) {
  this.totalTime = this.prepTime + this.cookTime;
  next();
});

// Create text index for search functionality
recipeSchema.index({
  name: 'text',
  description: 'text',
  'ingredients.name': 'text',
  tags: 'text'
});

// Static method to find recipes by ingredients
recipeSchema.statics.findByIngredients = function(ingredientNames) {
  return this.find({
    'ingredients.name': { 
      $in: ingredientNames.map(name => new RegExp(name, 'i'))
    },
    isActive: true
  });
};

// Instance method to get matching ingredients
recipeSchema.methods.getMatchingIngredients = function(userIngredients) {
  const recipeIngredientNames = this.ingredients.map(ing => ing.name.toLowerCase());
  const userIngredientNames = userIngredients.map(ing => ing.toLowerCase());
  
  return recipeIngredientNames.filter(ing => 
    userIngredientNames.includes(ing)
  );
};

module.exports = mongoose.model('Recipe', recipeSchema);
