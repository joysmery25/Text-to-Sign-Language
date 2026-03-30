import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserLogin() {
  const [email, setEmail] = React.useState('user@signstem.com')
  const [password, setPassword] = React.useState('user123')
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'user@signstem.com' && password === 'user123') {
      login(email, password, 'user')
      navigate('/subjects')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full glass-card p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Student Login</h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">Learn STEM with sign language</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-400"
            />
          </div>

          {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
          <strong>Demo:</strong> user@signstem.com / user123
        </div>
      </div>
    </div>
  )
}

