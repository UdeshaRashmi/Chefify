import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-600">Chefify</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/recipes" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                Recipes
              </Link>
              <Link to="/search" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                Search
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/suggestions" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                    Suggestions
                  </Link>
                  <Link to="/favorites" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                    Favorites
                  </Link>
                  <Link to="/meal-planner" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                    Meal Planner
                  </Link>
                  <Link to="/submit-recipe" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                    Submit Recipe
                  </Link>
                </>
              )}
              <Link to="/about" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex text-sm rounded-full focus:outline-none"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Admin Panel
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600">
                  Sign Up
                </Link>
              </div>
            )}
            
            <div className="ml-4 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/recipes" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Recipes
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Search
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/suggestions" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Suggestions
                </Link>
                <Link to="/favorites" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Favorites
                </Link>
                <Link to="/meal-planner" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Meal Planner
                </Link>
                <Link to="/submit-recipe" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Submit Recipe
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/about" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header