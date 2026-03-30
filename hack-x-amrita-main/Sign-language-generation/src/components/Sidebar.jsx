import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LinkItem({ to, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => `block px-4 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 ${isActive ? 'bg-slate-100 dark:bg-slate-800 font-semibold' : ''}`}>
      {label}
    </NavLink>
  )
}

export default function Sidebar({ open, onClose }) {
  const { auth } = useAuth()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/topics', label: 'Topics' },
    { to: '/features', label: 'Features' },
    // show Generate only for admin users
    ...(auth && auth.role === 'admin' ? [{ to: '/generate', label: 'Generate' }] : []),
    { to: '/about', label: 'About' }
  ]

  return (
    <>
      <aside className="hidden md:block w-64 border-r border-transparent glass-card h-full">
        <div className="p-6">
          <nav className="space-y-1">
            {links.map(l => <LinkItem key={l.to} to={l.to} label={l.label} />)}
          </nav>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
        <div className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
          <div className="p-6">
            <nav className="space-y-1">
              {links.map(l => <LinkItem key={l.to} to={l.to} label={l.label} onClick={onClose} />)}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
