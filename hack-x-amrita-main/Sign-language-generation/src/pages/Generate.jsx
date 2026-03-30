import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Avatar from '../components/Avatar'
import Toast from '../components/Toast'
import { generateSignVideo } from '../api/isl_video_generator_api'

const SUBJECTS = ['MATHEMATICS', 'SCIENCE', 'TECHNOLOGY', 'ENGINEERING']
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']

export default function Generate() {
  const [text, setText] = useState('Explain Newton\'s second law and an example problem.')
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0])
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [toast, setToast] = useState(null)

  const onGenerate = async () => {
    if (!text) {
      setToast({ message: 'Please enter some text', type: 'error' })
      return
    }
    setLoading(true)
    setVideoUrl('')
    try {
      const response = await axios.post('http://localhost:8000/generate-video', {
        topic: text
      })
      if (response.data && response.data.video_url) {
        setVideoUrl(response.data.video_url)
        setToast({ message: 'Video generated successfully!', type: 'success' })
      } else {
        setToast({ message: 'Backend did not return a video URL', type: 'error' })
      }
    } catch (err) {
      console.error('Generation error', err)
      setToast({ message: 'Failed to generate video. Make sure backend is running on port 8000.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const onDownload = () => {
    if (!output) return
    const blob = new Blob([output.explanation], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${subject}-${difficulty}-signs.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {loading && <Loader />}

      <header className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-semibold">Sign Language Generation</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Convert educational text into sign language lesson outputs (frontend demo).</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl glass-card border border-transparent">
          <label className="text-sm font-medium">Enter educational text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={6} className="mt-2 w-full rounded-md border border-slate-200 dark:border-slate-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />

          {videoUrl && (
            <div className="mt-4 rounded-xl overflow-hidden bg-black shadow-2xl border border-slate-800">
              <video key={videoUrl} controls src={videoUrl} className="w-full h-full max-h-[500px]" autoPlay />
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300">Select subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="mt-2 w-full p-2 rounded-md border bg-white dark:bg-slate-900">
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300">Select difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="mt-2 w-full p-2 rounded-md border bg-white dark:bg-slate-900">
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="flex items-end">
              <button onClick={onGenerate} className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow hover:scale-105 transform transition">Generate</button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-4 rounded-xl glass-card border border-transparent text-center">
            <h4 className="font-semibold">Quick Preview</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">See an animated avatar and video placeholder after generation.</p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-transparent">
            <h4 className="font-semibold">Options</h4>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={() => navigator.clipboard && navigator.clipboard.writeText(text)} className="px-3 py-2 rounded-md border">Copy Input</button>
              <button onClick={onDownload} className="px-3 py-2 rounded-md bg-blue-600 text-white">Download Explanation</button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
