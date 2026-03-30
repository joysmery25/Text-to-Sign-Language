import React from 'react'
import { Link } from 'react-router-dom'

export default function RoleSelect() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">STEM Sign Language</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Choose your role to continue</p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Login */}
          <Link 
            to="/admin-login"
            className="glass-card p-8 rounded-xl hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="mb-4">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Manage subjects, topics, and create STEM lessons
              </p>
            </div>
            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition">
              Admin Login
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Email: admin@signstem.com<br/>
              Password: admin123
            </p>
          </Link>

          {/* User Login */}
          <Link 
            to="/user-login"
            className="glass-card p-8 rounded-xl hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="mb-4">
              <div className="text-4xl mb-4">👨‍🎓</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Student</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Learn STEM subjects through interactive sign language lessons
              </p>
            </div>
            <button className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition">
              Student Login
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Email: user@signstem.com<br/>
              Password: user123
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>Making STEM education accessible to all • Sign Language • AI-Powered</p>
        </div>
      </div>
    </div>
  )
}
