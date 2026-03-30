import React, {useState, useRef} from 'react'
import Loader from '../components/Loader'
import LessonCard from '../components/LessonCard'

const initialLessons = [
  {id:1, title: 'Kinematics Signs', topic: 'Physics', length: '5m', date: 'Feb 18', description: 'Basic motion-related signs for velocity and acceleration.'},
  {id:2, title: 'Algebra Symbols', topic: 'Mathematics', length: '8m', date: 'Feb 16', description: 'Signs for algebraic operations and variables.'},
  {id:3, title: 'Periodic Table Intro', topic: 'Chemistry', length: '6m', date: 'Feb 10', description: 'Core element names and group signs.'}
]

export default function Home(){
  const [text, setText] = useState('Introduce basic Newtonian mechanics: force, mass, acceleration.')
  const [fileName, setFileName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lessons, setLessons] = useState(initialLessons)
  const fileRef = useRef()

  const onUpload = (e)=>{
    const f = e.target.files && e.target.files[0]
    if(f) setFileName(f.name)
  }

  // Generation removed for student view — only admins can trigger generation

  return (
    <div className="space-y-8">
      {loading && <Loader />}

      <div className="hero-wrap">
        <div className="hero-blob" />
        <div className="hero-blob-2" />
        <div className="hero-inner glass-card card-hero animate-slide-up">
          <div className="max-w-[980px] text-center mx-auto">
            <h1 className="hero-title">AI-powered Sign Language for STEM</h1>
            <p className="hero-sub mt-3">Convert lessons into clear, animated sign demonstrations — faster, inclusive, and scalable for educators and learners.</p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={()=>window.location.href='/topics'} className="px-5 py-3 rounded-lg glass-card">Explore Topics</button>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad">
        <div className="max-w-[1100px] mx-auto">
          <div className="feature-grid">
            <div className="glass-card card-compact">
              <h3 className="font-semibold">AI Text → Sign</h3>
              <p className="muted mt-2">Automatically map lesson text to sign cues and timing.</p>
            </div>
            <div className="glass-card card-compact">
              <h3 className="font-semibold">Animated Avatar</h3>
              <p className="muted mt-2">Looping avatar demonstrates gestures with expression control.</p>
            </div>
            <div className="glass-card card-compact">
              <h3 className="font-semibold">Accessible Diagrams</h3>
              <p className="muted mt-2">Visual aids synced to gestures for concept clarity.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <label className="text-sm font-medium">Quick input</label>
              <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} className="mt-2 w-full rounded-md border border-slate-200 dark:border-slate-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
              <div className="mt-4 flex items-center gap-3">
                <label className="inline-flex items-center px-4 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border cursor-pointer">
                  <input ref={fileRef} onChange={onUpload} accept=".pdf,.txt" type="file" className="hidden" />
                  <span className="text-sm">Upload PDF/Text</span>
                </label>
                <button onClick={()=> fileRef.current && fileRef.current.click()} className="px-4 py-2 rounded-md border">Choose file</button>
                <div className="ml-auto">
                  {/* Student generation removed — admin-only feature */}
                </div>
              </div>
              {fileName && <div className="mt-3 muted">Uploaded: {fileName}</div>}
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold">Generated Preview</h3>
              <p className="muted mt-3">This is a demo preview. Real generation will show animated avatars, videos and downloadable explanations.</p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="glass-card p-4 text-center">
              <h4 className="font-semibold">Recent Lessons</h4>
              <div className="mt-4 space-y-3">
                {lessons.map(l=> <LessonCard key={l.id} lesson={l} />)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="max-w-[1100px] mx-auto site-footer">
        <div>
          <div className="font-semibold">AI-based STEM Sign</div>
          <div className="muted text-sm">Inclusive STEM education • Demo build</div>
        </div>
        <div className="muted text-sm">© {new Date().getFullYear()} AI STEM Sign</div>
      </footer>
    </div>
  )
}
