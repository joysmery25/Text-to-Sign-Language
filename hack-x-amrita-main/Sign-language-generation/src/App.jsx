import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { SettingsProvider } from './context/SettingsContext'
import { AdminRoute, UserRoute } from './components/ProtectedRoutes'
import RoleSelect from './pages/RoleSelect'
import AdminLogin from './pages/AdminLogin'
import UserLogin from './pages/UserLogin'
import AdminDashboard from './pages/AdminDashboard'
import ModernNavbar from './components/ModernNavbar'
import StudentDashboard from './pages/StudentDashboard'
import SubjectTopics from './pages/SubjectTopics'
import TopicSubtopics from './pages/TopicSubtopics'
import SubtopicViewer from './pages/SubtopicViewer'
import Settings from './pages/Settings'
import Home from './pages/Home'
import Topics from './pages/Topics'
import Lesson from './pages/Lesson'
import Features from './pages/Features'
import Generate from './pages/Generate'
import Saved from './pages/Saved'
import About from './pages/About'
import AdminEditSubject from './pages/AdminEditSubject'
import AdminEditTopic from './pages/AdminEditTopic'
import AdminEditSubtopic from './pages/AdminEditSubtopic'

function AppRoutes(){
  const [mobileOpen, setMobileOpen] = useState(false)
  const { auth } = useAuth()

  useEffect(()=>{
    if(!localStorage.getItem('theme')){
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      if(prefersDark) document.documentElement.classList.add('dark')
    } else if(localStorage.getItem('theme') === 'dark'){
      document.documentElement.classList.add('dark')
    }
  }, [])

  if (!auth) {
    return (
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="*" element={<Navigate to="/role-select" />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <ModernNavbar onMenu={() => setMobileOpen(true)} />
      <main className="flex-1 p-6 md:p-10 md:ml-64">
        <Routes>
          <Route path="/" element={<SubjectTopics />} />
          <Route path="/subjects" element={<SubjectTopics />} />
          {/* use subject/topic names in URL (STEM / SubjectName / TopicName) */}
          <Route path="/subjects/:subject/topics" element={<SubjectTopics />} />
          <Route path="/subjects/:subject/topics/:topic/subtopics" element={<TopicSubtopics />} />
          <Route path="/subjects/:subject/topics/:topic/subtopics/:subtopicId" element={<SubtopicViewer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/edit/subject/:id" element={<AdminRoute><AdminEditSubject /></AdminRoute>} />
          <Route path="/admin/edit/topic/:id" element={<AdminRoute><AdminEditTopic /></AdminRoute>} />
          <Route path="/admin/edit/subtopic/:id" element={<AdminRoute><AdminEditSubtopic /></AdminRoute>} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/lesson/:topic/:subtopic" element={<Lesson />} />
          <Route path="/features" element={<Features />} />
          <Route path="/generate" element={<AdminRoute><Generate /></AdminRoute>} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/subjects" />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <SettingsProvider>
            <Routes>
              <Route path="/" element={<RoleSelect />} />
              <Route path="/role-select" element={<RoleSelect />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </SettingsProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
