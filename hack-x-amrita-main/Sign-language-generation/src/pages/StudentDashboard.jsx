import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function StudentDashboard() {
  const { subjects, topics } = useData()
  const [stats, setStats] = useState({
    progress: 0,
    topicsLearned: 0,
    savedLessons: 0,
    streakDays: 0,
    lessonsCompleted: 0
  })

  useEffect(() => {
    const savedLessons = JSON.parse(localStorage.getItem('savedLessons') || '[]')
    const totalTopics = topics.length || 12
    const topicsLearned = Math.floor(totalTopics * 0.35)
    const progress = Math.round((savedLessons.length / totalTopics) * 100) || 25
    const streakDays = parseInt(localStorage.getItem('streakDays') || '0')
    const lessonsCompleted = savedLessons.length

    setStats({
      progress: progress,
      topicsLearned: topicsLearned,
      savedLessons: savedLessons.length,
      streakDays: streakDays,
      lessonsCompleted: lessonsCompleted
    })
  }, [topics])

  return (
    <div className="space-y-6">
      <div className="glass-card card-hero p-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Your learning progress and achievements</p>
      </div>

      {/* Motivational Section */}
      <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">Keep going! 🚀</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">You're doing great with your learning journey</p>
          </div>
          <div className="text-5xl">✨</div>
        </div>
      </div>

      {/* Streak & Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning Streak */}
        <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-orange-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Learning Streak</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">{stats.streakDays}</p>
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Days in a row</p>
            </div>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Lessons Completed</p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{stats.lessonsCompleted}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Great effort!</p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning Progress */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Learning Progress</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.progress}%</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Topics Learned */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Topics Learned</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.topicsLearned}</p>
            </div>
            <div className="text-2xl">🎯</div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Keep learning more!</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Weekly Progress</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={idx} className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">{day}</p>
              <div className={`h-12 rounded-lg ${idx < 5 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.slice(0, 4).map(subject => (
            <Link key={subject.id} to={`/subjects/${encodeURIComponent(subject.name)}/topics`} className="glass-card p-6 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-3">{subject.icon}</div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{subject.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to explore</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

