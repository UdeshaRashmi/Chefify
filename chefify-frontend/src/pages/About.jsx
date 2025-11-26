import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Chefify</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover, create, and share amazing recipes with our global community of food lovers
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Chefify was born from a simple idea: everyone should have access to delicious, 
              easy-to-follow recipes that bring joy to their kitchen. What started as a passion 
              project between friends has grown into a vibrant community of food enthusiasts 
              sharing their culinary adventures.
            </p>
            <p className="text-gray-600 mb-6">
              Our platform connects home cooks with professional chefs, food bloggers, and 
              culinary experts from around the world. We believe that cooking should be 
              accessible, fun, and inspiring for everyone, regardless of their skill level.
            </p>
            <p className="text-gray-600">
              Today, Chefify features thousands of recipes spanning cuisines from every corner 
              of the globe, with new additions every day. Our mission remains the same: to 
              make cooking an enjoyable experience that brings people together.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500">Our Team Image</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thousands of Recipes</h3>
          <p className="text-gray-600">
            From quick weeknight dinners to elaborate weekend feasts, find the perfect recipe for any occasion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Driven</h3>
          <p className="text-gray-600">
            Share your creations, get feedback, and connect with fellow food lovers around the world.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assured</h3>
          <p className="text-gray-600">
            Every recipe is tested and verified by our culinary team to ensure delicious results every time.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          Ready to embark on your culinary journey? Join thousands of home cooks and food enthusiasts 
          who are already sharing their passion for cooking.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/submit-recipe"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-orange-600 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Share Your Recipe
          </Link>
          <Link
            to="/recipes"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About