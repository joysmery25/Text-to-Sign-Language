import React from 'react'

export default function Loader(){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="p-6 rounded-xl glass-card flex flex-col items-center gap-4">
        <div className="loader-spinner"></div>
        <div className="text-sm text-slate-700 dark:text-slate-200">Generating sign language lesson...</div>
      </div>
    </div>
  )
}
