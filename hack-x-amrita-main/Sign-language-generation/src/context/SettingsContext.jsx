import React, { createContext, useState } from 'react'

export const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem('theme') === 'dark' || false,
    fontSize: localStorage.getItem('fontSize') || 'M',
    highContrast: localStorage.getItem('highContrast') === 'true' || false
  })

  const updateSettings = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)

    if (key === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    if (key === 'fontSize') {
      localStorage.setItem('fontSize', value)
      document.documentElement.style.fontSize = {
        'S': '14px',
        'M': '16px',
        'L': '18px'
      }[value] || '16px'
    }

    if (key === 'highContrast') {
      localStorage.setItem('highContrast', value)
      if (value) {
        document.documentElement.classList.add('high-contrast')
      } else {
        document.documentElement.classList.remove('high-contrast')
      }
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return ctx
}
