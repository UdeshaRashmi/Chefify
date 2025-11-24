import React, { useState } from 'react';

const IngredientInput = ({ onIngredientsChange }) => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim().toLowerCase())) {
      const newIngredients = [...ingredients, ingredient.trim().toLowerCase()];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
      setIngredient('');
    }
  };

  const removeIngredient = (ingToRemove) => {
    const newIngredients = ingredients.filter(ing => ing !== ingToRemove);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient (e.g., tomato, chicken, pasta)"
          className="form-input"
          style={{ flex: 1 }}
        />
        <button onClick={addIngredient} className="btn btn-primary">
          Add
        </button>
      </div>
      
      {ingredients.length > 0 && (
        <div>
          <h4>Your Ingredients:</h4>
          <div className="ingredient-tags">
            {ingredients.map((ing, index) => (
              <span key={index} className="ingredient-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {ing}
                <button
                  onClick={() => removeIngredient(ing)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;