import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Suggestions from './pages/Suggestions'
import Admin from './pages/Admin'
import Analytics from './pages/Analytics'
import UserEngagementReport from './pages/UserEngagementReport'
import RecipePerformanceReport from './pages/RecipePerformanceReport'
import TrafficSourcesReport from './pages/TrafficSourcesReport'
import ContentManager from './pages/ContentManager'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import MealPlanner from './pages/MealPlanner'
import Search from './pages/Search'  // Using the enhanced version
import SubmitRecipe from './pages/SubmitRecipe'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
          <Header />
          
          {/* Main content */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/suggestions" element={
                <ProtectedRoute>
                  <Suggestions />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="/meal-planner" element={
                <ProtectedRoute>
                  <MealPlanner />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/analytics/user-engagement" element={<UserEngagementReport />} />
              <Route path="/analytics/recipe-performance" element={<RecipePerformanceReport />} />
              <Route path="/analytics/traffic-sources" element={<TrafficSourcesReport />} />
              <Route path="/content" element={<ContentManager />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/search" element={<Search />} />
              <Route path="/submit-recipe" element={
                <ProtectedRoute>
                  <SubmitRecipe />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App