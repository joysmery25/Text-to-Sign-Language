import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function AdminEditTopic(){
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const { topics, subjects, addTopic, editTopic, deleteTopic } = useData()
  const [form, setForm] = useState({ subjectId: subjects[0]?.id || 1, name: '', description: '' })

  useEffect(()=>{
    if(!isNew){
      const t = topics.find(x => x.id === parseInt(id))
      if(t) setForm({ subjectId: t.subjectId, name: t.name, description: t.description })
    }
  }, [id, isNew, topics])

  const onSave = (e)=>{
    e.preventDefault()
    if(form.name.trim()){
      if(isNew){
        addTopic(form.subjectId, form.name, form.description)
      } else {
        editTopic(parseInt(id), form.name, form.description)
      }
      navigate('/admin/dashboard')
    }
  }

  const onDelete = ()=>{
    if(!isNew){
      deleteTopic(parseInt(id))
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="space-y-6">
      <div className="glass-card card-hero p-6 rounded-xl">
        <h1 className="text-2xl font-bold">{isNew ? '➕ Add Topic' : '✏️ Edit Topic'}</h1>
      </div>

      <form onSubmit={onSave} className="glass-card p-6 rounded-xl">
        <label className="block mb-2 font-medium">Subject</label>
        <select className="w-full px-3 py-2 rounded border" value={form.subjectId} onChange={e=>setForm({...form, subjectId: parseInt(e.target.value)})}>
          {subjects.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <label className="block mt-4 mb-2 font-medium">Name</label>
        <input className="w-full px-3 py-2 rounded border" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />

        <label className="block mt-4 mb-2 font-medium">Description</label>
        <textarea className="w-full px-3 py-2 rounded border" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />

        <div className="flex gap-2 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/dashboard')} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          {!isNew && <button type="button" onClick={onDelete} className="ml-auto px-3 py-2 bg-red-500 text-white rounded">Delete</button>}
        </div>
      </form>
    </div>
  )
}
