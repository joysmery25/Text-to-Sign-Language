import React, {useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Lesson(){
  const { topic, subtopic } = useParams()
  const decodedTopic = decodeURIComponent(topic)
  const decodedSub = decodeURIComponent(subtopic)
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-6">
      {loading && <Loader />}

      <div className="flex items-center justify-between p-4 rounded-lg glass-card border border-transparent">
        <div>
          <h2 className="text-xl font-bold">{decodedSub}</h2>
          <div className="text-sm text-slate-500 dark:text-slate-400">Part of {decodedTopic}</div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/topics" className="text-sm text-blue-600 dark:text-blue-400">Back to Topics</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
          <h3 className="font-semibold">Explanation</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">This is a placeholder explanation for <strong>{decodedSub}</strong>. In a real app this would contain a concise lesson with definitions, examples, and step-by-step cues for representing the concept in sign language.</p>

          <div className="mt-6">
            <h4 className="font-medium">Diagram</h4>
            <div className="mt-3 h-40 rounded-md border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">Diagram placeholder</div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
          <h3 className="font-semibold">Sign Language Video</h3>
          <div className="mt-3 h-40 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">Video placeholder</div>
          </div>

            <div className="mt-6">
            <h4 className="font-medium">Actions</h4>
            <div className="mt-3 flex gap-3">
              <button className="px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700">Save Lesson</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
