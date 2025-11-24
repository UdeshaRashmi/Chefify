 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeAPI } from '../services/api';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [stats, setStats] = useState({ recipes: 0, categories: 0 });

  useEffect(() => {
    loadFeaturedRecipes();
    loadStats();
  }, []);

  const loadFeaturedRecipes = async () => {
    try {
      const response = await recipeAPI.getAllRecipes({ limit: 3 });
      if (response.success) {
        setFeaturedRecipes(response.data);
      }
    } catch (error) {
      console.error('Error loading featured recipes:', error);
    }
  };

  const loadStats = async () => {
    try {
      const recipesResponse = await recipeAPI.getAllRecipes();
      const categoriesResponse = await recipeAPI.getCategories();
      
      if (recipesResponse.success && categoriesResponse.success) {
        setStats({
          recipes: recipesResponse.total || 0,
          categories: categoriesResponse.data?.length || 0
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-pattern"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Delicious
                </span>
                <br />
                Recipes
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Chefify helps you create amazing meals using ingredients you already own. 
                No more food waste, just delicious discoveries!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/suggestions" 
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  🍳 Get Recipe Suggestions
                </Link>
                <Link 
                  to="/recipes" 
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  📚 Browse All Recipes
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold absolute -top-3 right-8">
                  🔥 Popular
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                    🍝
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pasta Carbonara</h3>
                  <p className="text-blue-100 mb-4">Creamy pasta with bacon and cheese</p>
                  <div className="flex justify-center gap-4 text-sm text-blue-200">
                    <span>⏱️ 25 min</span>
                    <span>🍽️ 4 servings</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🍽️</div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.recipes}+</div>
              <div className="text-gray-600 font-semibold">Recipes</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🥬</div>
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.categories}</div>
              <div className="text-gray-600 font-semibold">Categories</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">100%</div>
              <div className="text-gray-600 font-semibold">Satisfaction</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <div className="text-3xl font-bold text-red-600 mb-2">Quick</div>
              <div className="text-gray-600 font-semibold">Preparation</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Three simple steps to transform your ingredients into delicious meals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 text-6xl font-bold text-white/20">1</div>
              <div className="text-5xl mb-6">📝</div>
              <h3 className="text-2xl font-bold mb-4">Enter Your Ingredients</h3>
              <p className="text-blue-100 leading-relaxed">
                List what you have in your kitchen - we'll find the perfect recipes
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 text-6xl font-bold text-white/20">2</div>
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4">Get Smart Suggestions</h3>
              <p className="text-pink-100 leading-relaxed">
                Our AI matches your ingredients with delicious recipes
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 text-6xl font-bold text-white/20">3</div>
              <div className="text-5xl mb-6">👨‍🍳</div>
              <h3 className="text-2xl font-bold mb-4">Cook & Enjoy</h3>
              <p className="text-cyan-100 leading-relaxed">
                Follow easy step-by-step instructions and enjoy your meal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Featured Recipes</h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Handpicked delicious recipes to get you started
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <div key={recipe._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                  {recipe.image && (
                    <img 
                      src={recipe.image} 
                      alt={recipe.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.category}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.difficulty}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        ⏱️ {recipe.prepTime + recipe.cookTime}m
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/recipes" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              >
                View All Recipes →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Cook Something Amazing?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of home cooks who discover new recipes every day
          </p>
          <Link 
            to="/suggestions" 
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Cooking Now 🚀
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;