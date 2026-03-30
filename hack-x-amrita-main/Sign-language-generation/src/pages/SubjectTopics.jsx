import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export default function SubjectTopics() {
  const params = useParams()
  const { subject } = params // subject is the subject name in URL
  const { auth } = useAuth()
  const { subjects, topics, deleteSubject, deleteTopic } = useData()
  const navigate = useNavigate()

  // If no subject name in URL, show all subjects (Home page)
  if (!subject) {
    return (
      <div className="space-y-6">
        <div className="glass-card card-hero p-6 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">🎓 Welcome to STEM Sign Learning</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Choose a subject to explore sign language lessons and build your knowledge</p>
          </div>
          {auth && auth.role === 'admin' && (
            <button
              onClick={() => navigate('/admin/edit/subject/new')}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition shadow-sm"
            >
              ➕ Add Subject
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map(subject => (
            <div key={subject.id} className="relative">
              <Link
                to={`/subjects/${encodeURIComponent(subject.name)}/topics`}
                className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden block"
              >
                <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">{subject.icon}</div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{subject.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">📚 {topics.filter(t => t.subjectId === subject.id).length} topics</p>
                <div className="mt-4 flex items-center text-sky-600 dark:text-sky-400 font-semibold text-sm">
                  Explore →
                </div>
              </Link>
              {/* admin edit buttons */}
              {auth && auth.role === 'admin' && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/admin/edit/subject/${subject.id}`) }}
                    title="Edit Subject"
                    className="p-2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (confirm('Delete this subject?')) deleteSubject(subject.id) }}
                    title="Delete Subject"
                    className="p-2 rounded bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-800 hover:bg-red-100 transition"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // If subject name provided, show topics for that subject
  const decoded = decodeURIComponent(subject || '')
  const subjectObj = subjects.find(s => s.name.toLowerCase() === decoded.toLowerCase())
  const subjectTopics = subjectObj ? topics.filter(t => t.subjectId === subjectObj.id) : []

  if (!subjectObj) return <div className="text-center py-12 text-gray-600 dark:text-gray-300">Subject not found</div>

  return (
    <div className="space-y-6">
      <div className="glass-card card-hero p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{subjectObj.icon}</span>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">STEM / {subjectObj.name}</div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{subjectObj.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Explore {subjectTopics.length} topics in this subject</p>
          </div>
        </div>
        {auth && auth.role === 'admin' && (
          <button
            onClick={() => navigate('/admin/edit/topic/new')}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition shadow-sm"
          >
            ➕ Add Topic
          </button>
        )}
      </div>

      {subjectTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectTopics.map((topic, idx) => (
            <div key={topic.id} className="relative">
              <Link
                to={`/subjects/${encodeURIComponent(subjectObj.name)}/topics/${encodeURIComponent(topic.name)}/subtopics`}
                className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden block relative"
              >
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors pr-16">{topic.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{topic.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">🎯 Intermediate</span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">View →</span>
                </div>
              </Link>
              {auth && auth.role === 'admin' && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/admin/edit/topic/${topic.id}`) }}
                    title="Edit Topic"
                    className="p-2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (confirm('Delete this topic?')) deleteTopic(topic.id) }}
                    title="Delete Topic"
                    className="p-2 rounded bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-800 hover:bg-red-100 transition"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-xl">
          <p className="text-gray-600 dark:text-gray-300">No topics available for this subject yet.</p>
        </div>
      )
      }

      <Link to="/subjects" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-sm transition-colors">
        ← Back to subjects
      </Link>
    </div >
  )
}


