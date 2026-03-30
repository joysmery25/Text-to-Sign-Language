import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useData } from '../context/DataContext'
import Loader from '../components/Loader'

export default function AdminEditSubtopic() {
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const { subtopics, topics, addSubtopic, editSubtopic, deleteSubtopic } = useData()
  const [form, setForm] = useState({ topicId: topics[0]?.id || 1, title: '', description: '', image: '', videoUrl: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isNew) {
      const s = subtopics.find(x => x.id === parseInt(id))
      if (s) setForm({ topicId: s.topicId, title: s.title, description: s.description, image: s.image, videoUrl: s.videoUrl })
    }
  }, [id, isNew, subtopics])

  const onSave = (e) => {
    e.preventDefault()
    if (form.title.trim()) {
      if (isNew) {
        addSubtopic(form.topicId, form.title, form.description, form.image, form.videoUrl)
      } else {
        editSubtopic(parseInt(id), form.title, form.description, form.image, form.videoUrl)
      }
      navigate('/admin/dashboard')
    }
  }

  const handleGenerate = async () => {
    if (!form.description) return alert("Please enter description first")
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/generate-video', {
        topic: form.description
      })
      if (response.data && response.data.video_url) {
        setForm({ ...form, videoUrl: response.data.video_url })
      }
    } catch (err) {
      console.error('Video generation failed', err)
      alert("Generation failed. Make sure backend is running on port 8000.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = () => {
    if (!isNew) {
      deleteSubtopic(parseInt(id))
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="space-y-6">
      {loading && <Loader />}
      <div className="glass-card card-hero p-6 rounded-xl">
        <h1 className="text-2xl font-bold">{isNew ? '➕ Add Subtopic' : '✏️ Edit Subtopic'}</h1>
      </div>

      <form onSubmit={onSave} className="glass-card p-6 rounded-xl">
        <label className="block mb-2 font-medium">Topic</label>
        <select className="w-full px-3 py-2 rounded border" value={form.topicId} onChange={e => setForm({ ...form, topicId: parseInt(e.target.value) })}>
          {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <label className="block mt-4 mb-2 font-medium">Title</label>
        <input className="w-full px-3 py-2 rounded border" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />

        <label className="block mt-4 mb-2 font-medium">Description</label>
        <textarea className="w-full px-3 py-2 rounded border" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

        <label className="block mt-4 mb-2 font-medium">Image (emoji)</label>
        <input className="w-full px-3 py-2 rounded border" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />

        <label className="block mt-4 mb-2 font-medium">Video URL</label>
        <input className="w-full px-3 py-2 rounded border" value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} />

        {/* Generate Video Button Section */}
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700 rounded">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">AI Video Generation</p>
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition-colors"
          >
            🤖 Generate Video
          </button>
        </div>

        {/* Video Player - Full Width */}
        {form.videoUrl && (
          <div className="mt-6 flex justify-center items-center">
            <div className="w-full max-w-4xl rounded-lg overflow-hidden bg-black shadow-2xl border border-slate-300 dark:border-slate-600">
              <video key={form.videoUrl} controls src={form.videoUrl} className="w-full h-auto" controlsList="nodownload" />
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          {!isNew && <button type="button" onClick={onDelete} className="ml-auto px-3 py-2 bg-red-500 text-white rounded">Delete</button>}
        </div>
      </form>
    </div>
  )
}
