import React from 'react'
import { Link } from 'react-router-dom'

const TOPICS = {
  MATHEMATICS: ['Algebra','Geometry','Calculus','Trigonometry'],
  SCIENCE: ['Physics','Chemistry','Biology','Environmental Science'],
  TECHNOLOGY: ['AI Basics','Programming','Data Science','Cyber Security'],
  ENGINEERING: ['Mechanical','Electrical','Civil','Robotics']
}

function TopicCard({title, subs}){
  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm transform hover:-translate-y-2 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">{title[0]}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Explore {subs.length} subtopics</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {subs.map(s=> (
          <Link key={s} to={`/lesson/${encodeURIComponent(title)}/${encodeURIComponent(s)}`} className="text-sm px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition text-left">{s}</Link>
        ))}
      </div>
    </div>
  )
}

export default function Topics(){
  return (
    <div className="space-y-6">
      <header className="p-4 rounded-lg glass-card border border-transparent">
        <h2 className="text-2xl font-semibold">STEM Topics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Browse main topics and open specific subtopic lessons.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(TOPICS).map(([k,v]) => (
          <TopicCard key={k} title={k} subs={v} />
        ))}
      </section>
    </div>
  )
}
