import React from 'react'
import { Link } from 'react-router-dom'

export default function About(){
  return (
    <div className="space-y-6">
      <header className="p-6 rounded-lg glass-card border border-transparent">
        <h1 className="text-3xl font-bold">About AI-based STEM Sign</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">A hackathon-ready frontend showcasing how AI can bridge STEM education and sign language learning.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-semibold">Problem statement</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Many STEM resources are inaccessible to learners who rely on sign language. Educators lack tools to quickly convert lessons into clear, teachable gestures and visuals.</p>
        </div>

        <div className="p-6 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-semibold">Solution overview</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">We demonstrate an AI-assisted pipeline: convert text → map to sign gestures → present animated avatar + diagrams. The UI focuses on clarity, speed, and accessibility.</p>
        </div>

        <div className="p-6 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-semibold">Target users</h3>
          <ul className="mt-3 list-disc ml-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Educators creating accessible STEM lessons</li>
            <li>Students learning via sign language</li>
            <li>Developers and researchers building assistive tools</li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-semibold">Real world impact</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Lower barriers to STEM for deaf and hard-of-hearing learners, enable scalable content creation, and encourage inclusive classroom practices.</p>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-3">
        <Link to="/features" className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">See Features</Link>
        <a href="#" className="px-4 py-2 rounded-md border">Contact</a>
      </div>
    </div>
  )
}
