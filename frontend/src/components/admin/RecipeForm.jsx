import React, { useState } from 'react';

const RecipeForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    ingredients: initialData.ingredients || [{ name: '', quantity: '', unit: '' }],
    instructions: initialData.instructions || [''],
    prepTime: initialData.prepTime || '',
    cookTime: initialData.cookTime || '',
    difficulty: initialData.difficulty || 'Medium',
    category: initialData.category || 'Dinner',
    servings: initialData.servings || '',
    image: initialData.image || '',
    tags: initialData.tags ? initialData.tags.join(', ') : ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '' }]
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData(prev => ({ ...prev, instructions: updatedInstructions }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, instructions: updatedInstructions }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag),
      prepTime: parseInt(formData.prepTime),
      cookTime: parseInt(formData.cookTime),
      servings: parseInt(formData.servings)
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      
      <div className="form-group">
        <label className="form-label">Recipe Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="form-input"
              style={{ flex: 2 }}
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
              required
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="btn btn-danger"
              disabled={formData.ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="btn btn-secondary">
          Add Ingredient
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">Instructions</label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <textarea
              placeholder={`Step ${index + 1}`}
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              className="form-textarea"
              style={{ minHeight: '60px' }}
              required
            />
            <button
              type="button"
              onClick={() => removeInstruction(index)}
              className="btn btn-danger"
              disabled={formData.instructions.length === 1}
              style={{ marginTop: '5px' }}
            >
              Remove Step
            </button>
          </div>
        ))}
        <button type="button" onClick={addInstruction} className="btn btn-secondary">
          Add Instruction Step
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="form-group">
          <label className="form-label">Preparation Time (minutes)</label>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleInputChange}
            className="form-input"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleInputChange}
            className="form-input"
            min="0"
            required
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="form-group">
          <label className="form-label">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Servings</label>
        <input
          type="number"
          name="servings"
          value={formData.servings}
          onChange={handleInputChange}
          className="form-input"
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL (optional)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="form-input"
          placeholder="quick, healthy, italian, vegetarian"
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        {isEditing ? 'Update Recipe' : 'Create Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;