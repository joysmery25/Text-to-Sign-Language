import React from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { subjects, topics, subtopics } = useData()
  const navigate = useNavigate()

  // Mock data for platform analytics
  const platformStats = {
    totalStudents: 48,
    activeToday: 21,
    deafLearners: 30,
    nonDeafLearners: 18,
    dailyVisits: 120,
    videoPlays: 87,
    savedLessons: 42
  }

  // Mock data for active lessons
  const activeLessons = [
    { id: 1, title: 'Introduction to Sign Language', subject: 'Sign Language', studentsActive: 5, duration: '15 mins' },
    { id: 2, title: 'Basic Alphabet & Numbers', subject: 'Body Language', studentsActive: 8, duration: '22 mins' },
    { id: 3, title: 'Facial Expressions', subject: 'Expressions', studentsActive: 3, duration: '10 mins' },
    { id: 4, title: 'Common Phrases', subject: 'Sign Language', studentsActive: 6, duration: '18 mins' },
    { id: 5, title: 'Day-to-day Vocabulary', subject: 'Vocabulary', studentsActive: 4, duration: '12 mins' }
  ]

  // AdminDashboard now focused on analytics & admin actions only.
  // Content editing moved to separate admin edit pages.

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded relative overflow-hidden text-white">
        <h1 className="text-3xl font-bold uppercase tracking-wider">Management Dashboard</h1>
        <p className="text-sm text-slate-400 mt-2">System Control Panel & Analytics</p>
      </div>

      {/* PLATFORM OVERVIEW */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-4">PLATFORM OVERVIEW</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded shadow-sm text-center">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">48</div>
            <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Total Students</div>
          </div>
          <div className="bg-white dark:bg-slate-800 border-t-4 border-t-green-500 border-x border-b border-slate-200 dark:border-slate-700 p-6 rounded shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">21</div>
            <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Active Today</div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600">30</div>
            <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Deaf Students</div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded shadow-sm text-center">
            <div className="text-3xl font-bold text-sky-600">18</div>
            <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Non-Deaf Students</div>
          </div>
        </div>
      </section>

      {/* CONTENT STATISTICS */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-4">CONTENT STATISTICS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Subjects Count</span>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{subjects.length}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Topics Count</span>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{topics.length}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Subtopics Count</span>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{subtopics.length}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Videos Count</span>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{subtopics.length}</span>
          </div>
        </div>
      </section>

      {/* USER ACTIVITY */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-4">USER ACTIVITY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Daily Visits</span>
              <span className="font-bold text-xl text-slate-800 dark:text-slate-100">120</span>
            </div>
            <div className="w-full bg-slate-100 rounded-none h-2 dark:bg-slate-700 overflow-hidden">
              <div className="bg-blue-600 h-2" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Video Plays</span>
              <span className="font-bold text-xl text-slate-800 dark:text-slate-100">87</span>
            </div>
            <div className="w-full bg-slate-100 rounded-none h-2 dark:bg-slate-700 overflow-hidden">
              <div className="bg-indigo-600 h-2" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase">Saved Lessons</span>
              <span className="font-bold text-xl text-slate-800 dark:text-slate-100">42</span>
            </div>
            <div className="w-full bg-slate-100 rounded-none h-2 dark:bg-slate-700 overflow-hidden">
              <div className="bg-teal-600 h-2" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT LEVELS */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-4">STUDENT LEVELS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 border-l-4 border-l-slate-400 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">Beginner</p>
            <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">22</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border-l-4 border-l-sky-500 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">Intermediate</p>
            <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">17</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border-l-4 border-l-indigo-500 border border-slate-200 dark:border-slate-700 p-4 rounded shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">Advanced</p>
            <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">9</p>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-4">QUICK ACTIONS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/edit/subject/new')}
            className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            Add Subject
          </button>
          <button
            onClick={() => navigate('/admin/edit/topic/new')}
            className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            Add Topic
          </button>
          <button
            onClick={() => navigate('/admin/edit/subtopic/new')}
            className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            Add Subtopic
          </button>
          <button
            onClick={() => navigate('/generate')}
            className="p-3 bg-slate-900 border border-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 text-sm font-semibold rounded shadow-sm hover:opacity-90 transition"
          >
            Generate Video
          </button>
        </div>
      </section>
    </div>
  )
}
