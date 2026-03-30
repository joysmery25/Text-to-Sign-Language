import React from 'react'

export default function LessonCard({lesson}){
  return (
    <article className="p-4 rounded-xl glass-card shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{lesson.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{lesson.topic} • {lesson.length}</p>
        </div>
        <div className="text-xs text-slate-400">{lesson.date}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{lesson.description}</p>
    </article>
  )
}
