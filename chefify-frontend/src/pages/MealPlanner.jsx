import { useState } from 'react'
import RecipeCard from '../components/recipe/RecipeCard'

const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [meals, setMeals] = useState({
    '2025-11-26': {
      breakfast: { id: 1, name: "Overnight Oats", calories: 350 },
      lunch: { id: 2, name: "Quinoa Salad", calories: 420 },
      dinner: { id: 3, name: "Grilled Salmon", calories: 550 }
    },
    '2025-11-27': {
      breakfast: { id: 4, name: "Avocado Toast", calories: 320 },
      lunch: null,
      dinner: { id: 5, name: "Chicken Stir Fry", calories: 480 }
    }
  })

  const daysOfWeek = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    daysOfWeek.push(date)
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const getFormattedDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getMealForDay = (date, mealType) => {
    const dateStr = formatDate(date)
    return meals[dateStr] ? meals[dateStr][mealType] : null
  }

  const addMeal = (date, mealType, meal) => {
    const dateStr = formatDate(date)
    setMeals(prev => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        [mealType]: meal
      }
    }))
  }

  const removeMeal = (date, mealType) => {
    const dateStr = formatDate(date)
    setMeals(prev => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        [mealType]: null
      }
    }))
  }

  const getTotalCalories = (date) => {
    const dateStr = formatDate(date)
    const dayMeals = meals[dateStr] || {}
    return Object.values(dayMeals).reduce((total, meal) => {
      return meal ? total + meal.calories : total
    }, 0)
  }

  const generateShoppingList = () => {
    const shoppingList = []
    Object.values(meals).forEach(dayMeals => {
      Object.values(dayMeals).forEach(meal => {
        if (meal && !shoppingList.includes(meal.name)) {
          shoppingList.push(meal.name)
        }
      })
    })
    return shoppingList
  }

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' }
  ]

  const sampleRecipes = [
    { 
      id: 1, 
      name: "Overnight Oats", 
      calories: 350,
      title: "Overnight Oats",
      description: "A healthy and filling breakfast option that's easy to prepare.",
      cookTime: "5 mins prep",
      difficulty: "Easy",
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 2, 
      name: "Quinoa Salad", 
      calories: 420,
      title: "Quinoa Salad",
      description: "A nutritious salad packed with protein and fresh vegetables.",
      cookTime: "20 mins",
      difficulty: "Easy",
      category: "Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 3, 
      name: "Grilled Salmon", 
      calories: 550,
      title: "Grilled Salmon",
      description: "Perfectly grilled salmon with herbs and lemon.",
      cookTime: "25 mins",
      difficulty: "Medium",
      category: "Seafood",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 4, 
      name: "Avocado Toast", 
      calories: 320,
      title: "Avocado Toast",
      description: "Creamy avocado on toasted bread with a sprinkle of salt.",
      cookTime: "5 mins",
      difficulty: "Easy",
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 5, 
      name: "Chicken Stir Fry", 
      calories: 480,
      title: "Chicken Stir Fry",
      description: "Quick and flavorful stir fry with chicken and vegetables.",
      cookTime: "15 mins",
      difficulty: "Medium",
      category: "Chicken",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 6, 
      name: "Pasta Primavera", 
      calories: 450,
      title: "Pasta Primavera",
      description: "Fresh pasta with seasonal vegetables and light sauce.",
      cookTime: "25 mins",
      difficulty: "Medium",
      category: "Pasta",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 7, 
      name: "Berry Smoothie", 
      calories: 200,
      title: "Berry Smoothie",
      description: "Refreshing smoothie made with mixed berries and yogurt.",
      cookTime: "5 mins",
      difficulty: "Easy",
      category: "Drinks",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    { 
      id: 8, 
      name: "Caesar Salad", 
      calories: 380,
      title: "Caesar Salad",
      description: "Classic Caesar salad with romaine lettuce and croutons.",
      cookTime: "10 mins",
      difficulty: "Easy",
      category: "Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    }
  ]

  const handleViewRecipe = (recipe) => {
    // In a real app, this would open a modal or navigate to the recipe detail page
    alert(`Viewing recipe: ${recipe.title}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meal Planner</h1>
        <p className="text-gray-600">Plan your meals for the week</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">This Week</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
                  &larr;
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
                  &rarr;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-6">
              {daysOfWeek.map((date, index) => (
                <div 
                  key={index} 
                  className={`text-center p-2 rounded-lg cursor-pointer ${
                    formatDate(date) === formatDate(selectedDate) 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="font-semibold">{getDayName(date)}</div>
                  <div className="text-sm">{getFormattedDate(date)}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {mealTypes.map(mealType => (
                <div key={mealType.id} className="flex items-center">
                  <div className="w-24 font-medium text-gray-700">{mealType.name}</div>
                  <div className="flex-1 mx-4">
                    {getMealForDay(selectedDate, mealType.id) ? (
                      <div className="flex justify-between items-center bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div>
                          <div className="font-medium">{getMealForDay(selectedDate, mealType.id).name}</div>
                          <div className="text-sm text-gray-600">{getMealForDay(selectedDate, mealType.id).calories} calories</div>
                        </div>
                        <button 
                          onClick={() => removeMeal(selectedDate, mealType.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
                        No meal planned
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      // In a real app, this would open a modal to select a recipe
                      const randomRecipe = sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)]
                      addMeal(selectedDate, mealType.id, randomRecipe)
                    }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total Calories:</span>
                <span className="text-xl font-bold text-orange-500">{getTotalCalories(selectedDate)} kcal</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recipe Suggestions</h2>
            <div className="grid grid-cols-1 gap-4">
              {sampleRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  showRemoveButton={false}
                  showViewButton={true}
                  onView={handleViewRecipe}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Shopping List</h2>
            <div className="space-y-2">
              {generateShoppingList().length > 0 ? (
                generateShoppingList().map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" className="mr-3 h-4 w-4 text-orange-500 rounded" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No items in your shopping list</p>
              )}
            </div>
            <button className="w-full mt-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Print List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlanner