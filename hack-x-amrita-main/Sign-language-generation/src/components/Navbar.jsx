import React from 'react'

export default function Navbar({onMenu}){
  const toggleTheme = ()=>{
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-transparent glass-card card-hero">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold cta-shadow">AI</div>
          <div>
            <div className="font-semibold">AI-based STEM Sign</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Learning Platform</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a.75.75 0 01.75.75v1.5A.75.75 0 0110 5a.75.75 0 01-.75-.75v-1.5A.75.75 0 0110 2zM10 14a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
