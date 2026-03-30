import React from 'react'
import { useSettings } from '../context/SettingsContext'

export default function Settings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="glass-card card-hero p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">⚙️ Settings</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Customize your learning experience and accessibility options</p>
      </div>

      <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">👁️ Display & Accessibility</h2>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">🌙 Dark Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Enable dark theme for comfortable reading</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.darkMode}
              onChange={(e) => updateSettings('darkMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">🎯 High Contrast Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Enhance visibility with bold colors and strong outlines</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.highContrast}
              onChange={(e) => updateSettings('highContrast', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-yellow-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">🔤 Text Size</h2>
        <div className="space-y-3">
          {['S', 'M', 'L'].map(size => (
            <label key={size} className="flex items-center p-4 rounded-lg cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300 border-2 border-transparent hover:border-sky-300 dark:hover:border-sky-600">
              <input 
                type="radio"
                name="fontSize"
                value={size}
                checked={settings.fontSize === size}
                onChange={(e) => updateSettings('fontSize', e.target.value)}
                className="w-4 h-4 text-sky-600 rounded focus:ring-2 focus:ring-sky-500 accent-sky-600"
              />
              <span className={`ml-3 font-semibold text-slate-900 dark:text-white transition-all ${size === 'S' ? 'text-sm' : size === 'L' ? 'text-lg' : 'text-base'}`}>
                {size === 'S' ? '📱 Small (14px)' : size === 'M' ? '💻 Medium (16px)' : '📺 Large (18px)'}
              </span>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${settings.fontSize === size ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {settings.fontSize === size ? '✓ Current' : 'Available'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 border-l-4 border-sky-500">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <span>ℹ️ About</span>
        </h2>
        <p className="text-base font-semibold text-slate-900 dark:text-white">STEM Sign Learning Platform v1.0</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">A comprehensive frontend demo for inclusive STEM education through sign language learning.</p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>✨ Built with React • Tailwind CSS • localStorage</span>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-bold">💡 Tip:</span> Your settings are saved automatically and synced across devices using your browser's local storage.
        </p>
      </div>
    </div>
  )
}

