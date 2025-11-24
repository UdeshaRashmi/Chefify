import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Suggestions from './pages/Suggestions'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App