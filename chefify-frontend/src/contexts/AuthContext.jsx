import { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  
  const [user, setUser] = useState(() => {
    // Initialize user data if authenticated
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      return { id: 1, name: 'John Doe', email: 'john@example.com' }
    }
    return null
  })
  
  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, we'll accept any non-empty email and password
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
      setUser({ id: 1, name: 'John Doe', email })
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  }

  const signup = async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, we'll accept any valid input
    if (name && email && password && password.length >= 6) {
      localStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
      setUser({ id: 1, name, email })
      return { success: true }
    } else {
      return { success: false, error: 'Invalid input' }
    }
  }

  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }