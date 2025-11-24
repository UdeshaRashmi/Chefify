import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, loading, showMatch = false }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>No recipes found</h3>
        <p>Try adjusting your search criteria or check back later for new recipes.</p>
      </div>
    );
  }

  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe._id || recipe.id} 
          recipe={recipe} 
          showMatch={showMatch}
        />
      ))}
    </div>
  );
};

export default RecipeList;