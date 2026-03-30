import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function Saved(){
  const { subtopics, topics, subjects } = useData()
  const [savedLessons, setSavedLessons] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedLessons') || '[]')
    const savedSubtopics = subtopics.filter(s => saved.includes(s.id))
    setSavedLessons(savedSubtopics)
  }, [subtopics])

  return (
    <div className="space-y-6">
      <div className="glass-card card-hero p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">📚 Saved Lessons</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Your bookmarked STEM sign language lessons • {savedLessons.length} total</p>
      </div>

      {savedLessons.length === 0 ? (
        <div className="glass-card p-12 rounded-xl text-center hover:shadow-lg transition-all duration-300">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Saved Lessons Yet</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Save lessons from the subtopic viewer to see them here. Your saved lessons help you track progress and revisit important concepts.</p>
          <Link to="/subjects" className="inline-block px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
            🔍 Browse Subjects
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            You have <span className="text-sky-600 dark:text-sky-400 font-bold">{savedLessons.length}</span> saved lessons
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedLessons.map(lesson => {
              const topic = topics.find(t => t.id === lesson.topicId)
              const subject = topic ? subjects.find(s => s.id === topic.subjectId) : null
              const path = subject && topic ? `/subjects/${encodeURIComponent(subject.name)}/topics/${encodeURIComponent(topic.name)}/subtopics/${lesson.id}` : `/subjects`
              return (
                <Link 
                  key={lesson.id}
                  to={path}
                  className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-saved">SAVED</span>
                  </div>
                  
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{lesson.image}</div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{lesson.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">📖 Lesson</span>
                    <span className="text-sky-600 dark:text-sky-400 font-semibold text-sm">View →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

