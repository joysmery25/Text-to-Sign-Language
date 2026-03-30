import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load auth from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      try {
        setAuth(JSON.parse(stored))
      } catch (e) {
        setAuth(null)
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password, role) => {
    const token = `token_${Date.now()}`
    const authData = { email, role, token }
    setAuth(authData)
    localStorage.setItem('auth', JSON.stringify(authData))
    return authData
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
