import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export default function TopicSubtopics() {
  const { subject, topic } = useParams()
  const { subjects, topics, subtopics, deleteSubtopic } = useData()
  const [savedLessons, setSavedLessons] = useState([])

  const decodedSubject = decodeURIComponent(subject || '')
  const decodedTopic = decodeURIComponent(topic || '')
  const subjectObj = subjects.find(s => s.name.toLowerCase() === decodedSubject.toLowerCase())
  const topicObj = topics.find(t => t.name.toLowerCase() === decodedTopic.toLowerCase() && subjectObj && t.subjectId === subjectObj.id)
  const topicSubtopics = topicObj ? subtopics.filter(s => s.topicId === topicObj.id) : []
  const { auth } = useAuth()
  const navigate = useNavigate()

  // Check saved lessons on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedLessons') || '[]')
    setSavedLessons(saved)
  }, [])

  if (!topicObj) return <div className="text-center py-12 text-gray-600 dark:text-gray-300">Topic not found</div>

  return (
    <div className="space-y-6">
      <div className="glass-card card-hero p-6 rounded-xl">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">STEM / {subjectObj ? subjectObj.name : 'Subject'} / {topicObj.name}</div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{topicObj.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{topicObj.description}</p>
          </div>
          {auth && auth.role === 'admin' && (
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin/edit/subtopic/new')}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition shadow-sm flex items-center gap-2"
              >
                <span>➕</span> Add Subtopic
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">📚 {topicSubtopics.length} lessons available</span>
        </div>
      </div>

      {topicSubtopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicSubtopics.map((subtopic, idx) => {
            const isSaved = savedLessons.includes(subtopic.id)
            return (
              <Link
                key={subtopic.id}
                to={`/subjects/${encodeURIComponent(subjectObj.name)}/topics/${encodeURIComponent(topicObj.name)}/subtopics/${subtopic.id}`}
                className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden relative"
              >
                {/* admin explicit edit buttons */}
                {auth && auth.role === 'admin' && (
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log(`POST /generate-video ${subtopic.id}`) }}
                      title="Generate Video"
                      className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition"
                    >
                      ⚙️
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/admin/edit/subtopic/${subtopic.id}`) }}
                      title="Edit Subtopic"
                      className="p-2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (confirm('Delete this subtopic?')) deleteSubtopic(subtopic.id) }}
                      title="Delete Subtopic"
                      className="p-2 rounded bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-800 hover:bg-red-100 transition"
                    >
                      🗑️
                    </button>
                  </div>
                )}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{subtopic.image}</div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors pr-20">{subtopic.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{subtopic.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">⏱️ 5 min lesson</span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold text-sm">Learn →</span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-xl">
          <div className="text-4xl mb-3">📖</div>
          <p className="text-gray-600 dark:text-gray-300">No lessons available for this topic yet.</p>
        </div>
      )}

      <Link to="/subjects" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-sm transition-colors">
        ← Back to subjects
      </Link>
    </div>
  )
}

