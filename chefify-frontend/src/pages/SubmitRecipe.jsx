import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/utils/Input'
import TextArea from '../components/utils/TextArea'
import Button from '../components/utils/Button'
import Alert from '../components/utils/Alert'
import { createRecipe } from '../services/api'

const SubmitRecipe = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    difficulty: 'Easy',
    category: 'Vegetarian',
    ingredients: [''],
    instructions: ['']
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions]
    newInstructions[index] = value
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients]
      newIngredients.splice(index, 1)
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }))
    }
  }

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = [...formData.instructions]
      newInstructions.splice(index, 1)
      setFormData(prev => ({
        ...prev,
        instructions: newInstructions
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Recipe description is required'
    }
    
    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Preparation time is required'
    }
    
    if (!formData.cookTime.trim()) {
      newErrors.cookTime = 'Cooking time is required'
    }
    
    const emptyIngredients = formData.ingredients.filter(ing => !ing.trim())
    if (emptyIngredients.length > 0) {
      newErrors.ingredients = 'All ingredient fields must be filled'
    }
    
    const emptyInstructions = formData.instructions.filter(inst => !inst.trim())
    if (emptyInstructions.length > 0) {
      newErrors.instructions = 'All instruction fields must be filled'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await createRecipe(formData)
      setSubmitSuccess(true)
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        prepTime: '',
        cookTime: '',
        difficulty: 'Easy',
        category: 'Vegetarian',
        ingredients: [''],
        instructions: ['']
      })
      
      // Navigate to recipes page after 3 seconds
      setTimeout(() => {
        navigate('/recipes')
      }, 3000)
    } catch (error) {
      console.error('Error submitting recipe:', error)
      setErrors({ submit: 'Failed to submit recipe. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit a Recipe</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share your favorite recipe with the Chefify community
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-8">
          <Alert variant="success">
            Recipe submitted successfully! Thank you for sharing your recipe with the community.
          </Alert>
        </div>
      )}

      {errors.submit && (
        <div className="mb-8">
          <Alert variant="error">
            {errors.submit}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Input
            label="Recipe Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <Input
            label="Preparation Time"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            error={errors.prepTime}
            placeholder="e.g., 15 mins"
            required
          />
          
          <Input
            label="Cooking Time"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            error={errors.cookTime}
            placeholder="e.g., 30 mins"
            required
          />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Chicken">Chicken</option>
              <option value="Beef">Beef</option>
              <option value="Pork">Pork</option>
              <option value="Seafood">Seafood</option>
              <option value="Dessert">Dessert</option>
              <option value="Breakfast">Breakfast</option>
            </select>
          </div>
        </div>

        <TextArea
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          rows={4}
          required
        />

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm text-orange-600 hover:text-orange-800"
            >
              + Add Ingredient
            </button>
          </div>
          
          {errors.ingredients && (
            <p className="text-sm text-red-600 mb-2">{errors.ingredients}</p>
          )}
          
          <div className="space-y-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={`Ingredient ${index + 1}`}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm text-orange-600 hover:text-orange-800"
            >
              + Add Step
            </button>
          </div>
          
          {errors.instructions && (
            <p className="text-sm text-red-600 mb-2">{errors.instructions}</p>
          )}
          
          <div className="space-y-2">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="mt-3 text-sm font-medium text-gray-500">
                  {index + 1}.
                </span>
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={`Step ${index + 1}`}
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/recipes')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SubmitRecipe