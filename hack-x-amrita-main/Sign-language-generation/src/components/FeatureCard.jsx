import React from 'react'

export default function FeatureCard({icon, title, desc}){
  return (
    <div className="p-6 rounded-2xl glass-card border border-slate-100 dark:border-slate-800 transform hover:-translate-y-3 hover:scale-[1.01] transition">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
        </div>
      </div>
    </div>
  )
}
