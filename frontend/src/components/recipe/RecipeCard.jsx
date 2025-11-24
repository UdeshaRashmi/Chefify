import React from 'react';

const RecipeCard = ({ recipe, showMatch = false }) => {
  return (
    <div className="card">
      {showMatch && recipe.matchPercentage && (
        <div className="match-badge" style={{ marginBottom: '10px' }}>
          {recipe.matchPercentage}% Match
        </div>
      )}
      
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        />
      )}
      
      <h3 style={{ marginBottom: '10px', color: '#333' }}>{recipe.name}</h3>
      <p style={{ color: '#666', marginBottom: '15px', fontSize: '0.9rem' }}>
        {recipe.description}
      </p>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Ingredients:</strong>
        <div className="ingredient-tags">
          {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
            <span key={index} className="ingredient-tag">
              {ingredient.name}
            </span>
          ))}
          {recipe.ingredients.length > 4 && (
            <span className="ingredient-tag">+{recipe.ingredients.length - 4} more</span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          <div>⏱️ {recipe.prepTime + recipe.cookTime} mins</div>
          <div>🍽️ {recipe.servings} servings</div>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          {recipe.difficulty} • {recipe.category}
        </div>
      </div>

      {showMatch && recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#fff3cd', borderRadius: '5px' }}>
          <strong>Missing:</strong> {recipe.missingIngredients.slice(0, 3).map(ing => ing.name).join(', ')}
          {recipe.missingIngredients.length > 3 && ` +${recipe.missingIngredients.length - 3} more`}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;