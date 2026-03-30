import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AdminRoute({ children }) {
  const { auth, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!auth || auth.role !== 'admin') {
    return <Navigate to="/admin-login" />
  }

  return children
}

export function UserRoute({ children }) {
  const { auth, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!auth || auth.role !== 'user') {
    return <Navigate to="/user-login" />
  }

  return children
}
