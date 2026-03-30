import React from 'react'
import FeatureCard from '../components/FeatureCard'

const features = [
  {key:'text2sign', title: 'AI text to sign conversion', desc: 'Automatically map educational text to sign sequences and cues.', icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V11H3v8a2 2 0 002 2z"/></svg>)},
  {key:'avatar', title: 'Animated avatar learning', desc: 'Visual, looping avatar demonstrates signs with timing and expression.', icon:(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.953M12 14L5.84 10.578A12.083 12.083 0 006 20.953"/></svg>)},
  {key:'diagrams', title: 'Visual diagrams', desc: 'Diagrams paired with gestures to aid conceptual understanding.', icon:(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg>)},
  {key:'accessible', title: 'Accessible education', desc: 'Designed for inclusive learning with clear visuals and controls.', icon:(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>)},
  {key:'multilang', title: 'Multi-language support', desc: 'Map STEM terms across languages for wider accessibility.', icon:(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m-6 6h12M9 9v2m-6 6h12M9 15v2"/></svg>)}
]

export default function Features(){
  return (
    <div className="space-y-6">
      <header className="p-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl card-hero glass-card">
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="mt-2 opacity-90">Powerful building blocks for an AI-driven sign language learning experience.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {features.map(f=> (
          <FeatureCard key={f.key} title={f.title} desc={f.desc} icon={f.icon} />
        ))}
      </section>
    </div>
  )
}
