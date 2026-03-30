import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { mockData } from '../data/mockData'
import Loader from '../components/Loader'

export default function SubtopicViewer() {
  const { subject, topic, subtopicId } = useParams()
  const { subjects, topics, subtopics } = useData()
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const decodedSubject = decodeURIComponent(subject || '')
  const decodedTopic = decodeURIComponent(topic || '')
  const subjectObj = subjects.find(s => s.name.toLowerCase() === decodedSubject.toLowerCase())
  const topicObj = topics.find(t => t.name.toLowerCase() === decodedTopic.toLowerCase() && subjectObj && t.subjectId === subjectObj.id)
  const stId = parseInt(subtopicId)
  const subtopic = subtopics.find(s => s.id === stId)
  const { auth } = useAuth()
  const { editSubtopic } = useData()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

  // Video access rules:
  // - Admin: sees video ONLY if it was generated (i.e. not equal to mockData's default for this ID)
  // - Student: always sees default videoUrl from mockData
  const videoSrc = (() => {
    if (!subtopic) return ''

    // Check if the current videoUrl in state is actually different from the mock default
    const originalMock = mockData.subtopics.find(s => s.id === subtopic.id)
    const isDefault = originalMock && subtopic.videoUrl === originalMock.videoUrl

    if (auth && auth.role === 'admin') {
      // If it's a default video, admin should see 'No Video' view with Generate button
      return isDefault ? '' : subtopic.videoUrl
    }

    // Students see whatever is in subtopic state, or fallback to mock
    return subtopic.videoUrl || (originalMock ? originalMock.videoUrl : (mockData.subtopics[0]?.videoUrl || ''))
  })()

  // Check if lesson is saved on component mount
  useEffect(() => {
    const savedLessons = JSON.parse(localStorage.getItem('savedLessons') || '[]')
    setIsSaved(savedLessons.includes(stId))

    if (subtopic) {
      setEditedTitle(subtopic.title)
      setEditedDescription(subtopic.description)
    }
  }, [stId, subtopic])

  const handleSaveEdit = () => {
    editSubtopic(subtopic.id, editedTitle, editedDescription, subtopic.image, subtopic.videoUrl)
    setIsEditing(false)
  }

  const handleSaveLesson = () => {
    const savedLessons = JSON.parse(localStorage.getItem('savedLessons') || '[]')
    if (!savedLessons.includes(stId)) {
      savedLessons.push(stId)
      localStorage.setItem('savedLessons', JSON.stringify(savedLessons))
      setIsSaved(true)
    }
  }

  const handleGenerateVideo = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/generate-video', {
        topic: editedDescription || subtopic.description
      })
      if (response.data && response.data.video_url) {
        editSubtopic(subtopic.id, editedTitle || subtopic.title, editedDescription || subtopic.description, subtopic.image, response.data.video_url)
      } else {
        alert(response.data.message || "Failed to generate video")
      }
    } catch (err) {
      console.error('Video generation failed', err)
      alert("Backend error. Please check if the server is running on Port 8000.")
    } finally {
      setLoading(false)
    }
  }

  if (!subtopic) return <div className="text-center py-12 text-gray-600">Subtopic not found</div>

  return (
    <div className="space-y-6">
      {loading && <Loader />}
      <div className="glass-card card-hero p-6 relative overflow-hidden">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">STEM / {subjectObj ? subjectObj.name : 'Subject'} / {topicObj ? topicObj.name : 'Topic'}</div>
        {auth && auth.role === 'admin' && (
          <div className="absolute top-4 right-4 flex gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSaveEdit} className="px-3 py-1 rounded bg-green-600 text-white text-sm font-bold shadow-sm hover:bg-green-700 transition">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 rounded bg-gray-500 text-white text-sm font-bold shadow-sm hover:bg-gray-600 transition">Cancel</button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 rounded bg-white/90 dark:bg-slate-800 text-sm font-bold text-blue-600 border border-blue-200 shadow-sm"
              >
                ✏️ Edit Content
              </button>
            )}
          </div>
        )}
        <div className="flex items-center gap-4">
          <span className="text-4xl">{subtopic.image}</span>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full text-3xl font-bold bg-white dark:bg-slate-800 border border-blue-400 rounded px-2 py-1 text-slate-900 dark:text-white"
              />
            ) : (
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{subtopic.title}</h1>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{subtopic.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lesson Content</h2>
              {auth && auth.role === 'admin' && (
                <button
                  onClick={handleGenerateVideo}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded-lg text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2"
                >
                  ⚙️ Generate AI Video
                </button>
              )}
            </div>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full h-32 bg-white dark:bg-slate-800 border border-blue-400 rounded px-2 py-1 text-gray-600 dark:text-gray-300"
              />
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300">{subtopic.description}</p>
                {(!auth || auth.role !== 'admin') && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">In a real system, this page would show detailed lesson content, diagrams, and step-by-step explanations of the sign language gestures for "{subtopic.title}".</p>
                )}
              </>
            )}
          </div>

          <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sign Language Video</h2>
              {auth && auth.role === 'admin' && videoSrc && (
                <button
                  onClick={handleGenerateVideo}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 px-3 py-1 rounded text-xs font-bold hover:bg-slate-200 transition"
                >
                  🔄 Regenerate
                </button>
              )}
            </div>
            <div className="w-full rounded-xl overflow-hidden bg-black/5">
              {auth && auth.role === 'admin' && !videoSrc ? (
                <div className="flex flex-col items-center justify-center p-12 bg-gray-100 dark:bg-slate-800 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                  <div className="text-4xl mb-4">📹</div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Custom Video Required</h3>
                  <p className="text-sm text-gray-500 mt-2">Use the "Generate AI Video" button above to create sign content for this lesson.</p>
                </div>
              ) : (
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                  {videoSrc ? (
                    videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={videoSrc}
                        title={subtopic.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        key={videoSrc}
                        src={videoSrc}
                        controls
                        className="w-full h-full max-h-[600px]"
                        autoPlay
                      />
                    )
                  ) : (
                    <div className="text-gray-400">No video source available</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          {(!auth || auth.role !== 'admin') && (
            <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Lesson Info</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Difficulty:</span>
                  <span className="ml-2">🎯 Intermediate</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Duration:</span>
                  <span className="ml-2">⏱️ 5 minutes</span>
                </div>
              </div>
            </div>
          )}

          <Link to="/subjects" className="text-sky-600 dark:text-sky-400 text-sm hover:underline block font-medium">
            ← Back to subjects
          </Link>
        </aside>
      </div>
    </div>
  )
}


