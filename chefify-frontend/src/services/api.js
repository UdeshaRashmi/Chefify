// Mock API service for Chefify application

const API_BASE_URL = '/api'

// Mock data
const mockRecipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    description: "A healthy and flavorful bowl packed with fresh vegetables and herbs.",
    cookTime: "25 mins",
    prepTime: "15 mins",
    difficulty: "Easy",
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 124,
    ingredients: [
      "1 cup quinoa",
      "2 cups water",
      "1 cucumber, diced",
      "1 tomato, diced",
      "1/2 red onion, finely chopped",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Rinse quinoa under cold water until water runs clear.",
      "Combine quinoa and water in a saucepan. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes.",
      "Remove from heat and let stand covered for 5 minutes. Fluff with a fork and let cool.",
      "In a large bowl, combine cooled quinoa, cucumber, tomato, and red onion.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over quinoa mixture and toss to combine.",
      "Serve immediately or refrigerate until ready to serve."
    ]
  },
  {
    id: 2,
    title: "Spicy Thai Basil Chicken",
    description: "Authentic Thai stir-fry with aromatic basil and chilies.",
    cookTime: "15 mins",
    prepTime: "10 mins",
    difficulty: "Medium",
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 89,
    ingredients: [
      "1 lb ground chicken",
      "3 cloves garlic, minced",
      "2-3 Thai chilies, sliced",
      "1 cup Thai basil leaves",
      "2 tbsp fish sauce",
      "1 tbsp soy sauce",
      "1 tsp sugar",
      "2 tbsp vegetable oil"
    ],
    instructions: [
      "Heat oil in a wok or large skillet over high heat.",
      "Add garlic and chilies, stir-fry for 30 seconds until fragrant.",
      "Add ground chicken and cook, breaking it up, until no longer pink.",
      "Add fish sauce, soy sauce, and sugar. Stir to combine.",
      "Add Thai basil leaves and stir-fry until wilted.",
      "Serve immediately over steamed rice."
    ]
  },
  {
    id: 3,
    title: "Classic Beef Lasagna",
    description: "Layers of pasta, rich meat sauce, and creamy cheese baked to perfection.",
    cookTime: "60 mins",
    prepTime: "30 mins",
    difficulty: "Hard",
    category: "Beef",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 210,
    ingredients: [
      "12 lasagna noodles",
      "1 lb ground beef",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "24 oz marinara sauce",
      "15 oz ricotta cheese",
      "2 cups mozzarella cheese, shredded",
      "1/2 cup parmesan cheese, grated",
      "2 tbsp olive oil",
      "1 tsp dried oregano",
      "1 tsp dried basil"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Cook lasagna noodles according to package directions.",
      "Heat olive oil in a large skillet over medium heat.",
      "Add onion and garlic, cook until softened.",
      "Add ground beef and cook until browned.",
      "Stir in marinara sauce, oregano, and basil. Simmer for 15 minutes.",
      "In a bowl, mix ricotta, 1 cup mozzarella, and parmesan.",
      "Spread a thin layer of meat sauce in the bottom of a 9x13 baking dish.",
      "Layer noodles, ricotta mixture, and meat sauce, repeating until ingredients are used.",
      "Top with remaining mozzarella cheese.",
      "Cover with foil and bake for 25 minutes.",
      "Remove foil and bake for an additional 10 minutes until cheese is bubbly.",
      "Let rest for 10 minutes before serving."
    ]
  },
  {
    id: 4,
    title: "Vegetable Stir Fry",
    description: "Quick and colorful vegetable stir fry with a savory sauce.",
    cookTime: "15 mins",
    prepTime: "15 mins",
    difficulty: "Easy",
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 76,
    ingredients: [
      "2 tbsp vegetable oil",
      "1 bell pepper, sliced",
      "1 carrot, julienned",
      "1 cup broccoli florets",
      "1 zucchini, sliced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, minced",
      "3 tbsp soy sauce",
      "1 tbsp honey",
      "1 tsp sesame oil",
      "1 tbsp cornstarch",
      "2 green onions, sliced"
    ],
    instructions: [
      "Heat 1 tbsp oil in a wok or large skillet over high heat.",
      "Add vegetables and stir-fry for 3-4 minutes until crisp-tender.",
      "Remove vegetables and set aside.",
      "Heat remaining oil in the same pan.",
      "Add garlic and ginger, stir-fry for 30 seconds.",
      "In a small bowl, whisk together soy sauce, honey, sesame oil, and cornstarch.",
      "Pour sauce into the pan and cook until thickened.",
      "Return vegetables to the pan and toss to coat.",
      "Garnish with green onions and serve immediately."
    ]
  },
  {
    id: 5,
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies that are soft and chewy.",
    cookTime: "12 mins",
    prepTime: "15 mins",
    difficulty: "Easy",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 156,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a bowl, whisk together flour, baking soda, and salt.",
      "In a separate large bowl, cream together butter and both sugars until light and fluffy.",
      "Beat in eggs one at a time, then add vanilla.",
      "Gradually mix in flour mixture until just combined.",
      "Stir in chocolate chips.",
      "Drop rounded tablespoons of dough onto ungreased baking sheets.",
      "Bake for 9-12 minutes until golden brown.",
      "Cool on baking sheet for 5 minutes before transferring to wire rack."
    ]
  }
]

const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2025-01-15"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "User",
    status: "Active",
    joinDate: "2025-03-22"
  }
]

const mockCategories = [
  { id: 1, name: "Vegetarian", recipeCount: 24 },
  { id: 2, name: "Chicken", recipeCount: 18 },
  { id: 3, name: "Beef", recipeCount: 15 },
  { id: 4, name: "Seafood", recipeCount: 12 },
  { id: 5, name: "Dessert", recipeCount: 9 },
  { id: 6, name: "Breakfast", recipeCount: 7 }
]

const mockBlogPosts = [
  {
    id: 1,
    title: "5 Tips for Perfect Pasta",
    author: "Chef Maria",
    date: "2025-11-20",
    status: "Published",
    views: 1242,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    id: 2,
    title: "Healthy Cooking on a Budget",
    author: "Chef James",
    date: "2025-11-15",
    status: "Published",
    views: 987,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  }
]

const mockFAQs = [
  {
    id: 1,
    question: "How do I submit a recipe?",
    category: "Recipes",
    status: "Active",
    answer: "To submit a recipe, go to the 'Submit Recipe' page and fill out the form with all the details."
  },
  {
    id: 2,
    question: "What are the image requirements?",
    category: "Technical",
    status: "Active",
    answer: "Images should be in JPG or PNG format, with a minimum resolution of 800x600 pixels."
  }
]

// Recipe API functions
export const getRecipes = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockRecipes
}

export const getRecipeById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockRecipes.find(recipe => recipe.id === parseInt(id))
}

export const createRecipe = async (recipeData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newRecipe = {
    id: mockRecipes.length + 1,
    ...recipeData
  }
  mockRecipes.push(newRecipe)
  return newRecipe
}

export const updateRecipe = async (id, recipeData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockRecipes.findIndex(recipe => recipe.id === parseInt(id))
  if (index !== -1) {
    mockRecipes[index] = { ...mockRecipes[index], ...recipeData }
    return mockRecipes[index]
  }
  throw new Error('Recipe not found')
}

export const deleteRecipe = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockRecipes.findIndex(recipe => recipe.id === parseInt(id))
  if (index !== -1) {
    mockRecipes.splice(index, 1)
    return true
  }
  throw new Error('Recipe not found')
}

// User API functions
export const getUsers = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockUsers
}

export const getUserById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockUsers.find(user => user.id === parseInt(id))
}

export const createUser = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newUser = {
    id: mockUsers.length + 1,
    ...userData
  }
  mockUsers.push(newUser)
  return newUser
}

export const updateUser = async (id, userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockUsers.findIndex(user => user.id === parseInt(id))
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...userData }
    return mockUsers[index]
  }
  throw new Error('User not found')
}

export const deleteUser = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockUsers.findIndex(user => user.id === parseInt(id))
  if (index !== -1) {
    mockUsers.splice(index, 1)
    return true
  }
  throw new Error('User not found')
}

// Category API functions
export const getCategories = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockCategories
}

export const createCategory = async (categoryData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const newCategory = {
    id: mockCategories.length + 1,
    ...categoryData
  }
  mockCategories.push(newCategory)
  return newCategory
}

export const updateCategory = async (id, categoryData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockCategories.findIndex(category => category.id === parseInt(id))
  if (index !== -1) {
    mockCategories[index] = { ...mockCategories[index], ...categoryData }
    return mockCategories[index]
  }
  throw new Error('Category not found')
}

export const deleteCategory = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockCategories.findIndex(category => category.id === parseInt(id))
  if (index !== -1) {
    mockCategories.splice(index, 1)
    return true
  }
  throw new Error('Category not found')
}

// Blog Post API functions
export const getBlogPosts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockBlogPosts
}

export const getBlogPostById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockBlogPosts.find(post => post.id === parseInt(id))
}

export const createBlogPost = async (postData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newPost = {
    id: mockBlogPosts.length + 1,
    ...postData
  }
  mockBlogPosts.push(newPost)
  return newPost
}

export const updateBlogPost = async (id, postData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockBlogPosts.findIndex(post => post.id === parseInt(id))
  if (index !== -1) {
    mockBlogPosts[index] = { ...mockBlogPosts[index], ...postData }
    return mockBlogPosts[index]
  }
  throw new Error('Blog post not found')
}

export const deleteBlogPost = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockBlogPosts.findIndex(post => post.id === parseInt(id))
  if (index !== -1) {
    mockBlogPosts.splice(index, 1)
    return true
  }
  throw new Error('Blog post not found')
}

// FAQ API functions
export const getFAQs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockFAQs
}

export const getFAQById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockFAQs.find(faq => faq.id === parseInt(id))
}

export const createFAQ = async (faqData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const newFAQ = {
    id: mockFAQs.length + 1,
    ...faqData
  }
  mockFAQs.push(newFAQ)
  return newFAQ
}

export const updateFAQ = async (id, faqData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockFAQs.findIndex(faq => faq.id === parseInt(id))
  if (index !== -1) {
    mockFAQs[index] = { ...mockFAQs[index], ...faqData }
    return mockFAQs[index]
  }
  throw new Error('FAQ not found')
}

export const deleteFAQ = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockFAQs.findIndex(faq => faq.id === parseInt(id))
  if (index !== -1) {
    mockFAQs.splice(index, 1)
    return true
  }
  throw new Error('FAQ not found')
}

export default {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ
}