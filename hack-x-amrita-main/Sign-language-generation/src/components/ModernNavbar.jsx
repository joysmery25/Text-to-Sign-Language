import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ModernNavbar({ onMenu }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, auth } = useAuth()

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    logout()
    navigate('/role-select')
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header className="fixed top-0 left-0 z-40 w-full md:w-64 bg-white/70 backdrop-blur border-b border-gray-200 dark:bg-slate-900/70 dark:border-slate-700">
      <div className="flex flex-col h-full">
        {/* Back button and title */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            title="Go back"
          >
            ←
          </button>
          <Link to="/subjects" className="font-semibold text-slate-900 dark:text-white text-sm truncate">STEM Sign</Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
          <NavLink to="/subjects" label="Home" />
          {auth && auth.role === 'admin' ? (
            <NavLink to="/admin/dashboard" label="Admin Dashboard" />
          ) : (
            <NavLink to="/dashboard" label="Dashboard" />
          )}
          <NavLink to="/settings" label="Settings" />
        </nav>

        {/* Logout button */}
        <div className="px-2 py-4 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg text-sm text-white bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

function NavLink({ to, label }) {
  const location = useLocation()
  const isActive = location.pathname === to || (to === '/subjects' && location.pathname === '/')
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-sky-600 dark:text-sky-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
    >
      {label}
    </Link>
  )
}
