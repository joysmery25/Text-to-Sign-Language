import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function AdminEditSubject(){
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const { subjects, addSubject, editSubject, deleteSubject } = useData()
  const [form, setForm] = useState({ name: '', icon: '📚', color: 'blue' })

  useEffect(()=>{
    if(!isNew){
      const s = subjects.find(x => x.id === parseInt(id))
      if(s) setForm({ name: s.name, icon: s.icon, color: s.color })
    }
  }, [id, isNew, subjects])

  const onSave = (e)=>{
    e.preventDefault()
    if(form.name.trim()){
      if(isNew){
        addSubject(form.name, form.color, form.icon)
      } else {
        editSubject(parseInt(id), form.name, form.color, form.icon)
      }
      navigate('/admin/dashboard')
    }
  }

  const onDelete = ()=>{
    if(!isNew){
      deleteSubject(parseInt(id))
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="space-y-6">
      <div className="glass-card card-hero p-6 rounded-xl">
        <h1 className="text-2xl font-bold">{isNew ? '➕ Add Subject' : '✏️ Edit Subject'}</h1>
      </div>

      <form onSubmit={onSave} className="glass-card p-6 rounded-xl">
        <label className="block mb-2 font-medium">Name</label>
        <input className="w-full px-3 py-2 rounded border" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />

        <label className="block mt-4 mb-2 font-medium">Icon</label>
        <input className="w-full px-3 py-2 rounded border" value={form.icon} onChange={e=>setForm({...form, icon: e.target.value})} />

        <label className="block mt-4 mb-2 font-medium">Color</label>
        <input className="w-full px-3 py-2 rounded border" value={form.color} onChange={e=>setForm({...form, color: e.target.value})} />

        <div className="flex gap-2 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/dashboard')} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          {!isNew && <button type="button" onClick={onDelete} className="ml-auto px-3 py-2 bg-red-500 text-white rounded">Delete</button>}
        </div>
      </form>
    </div>
  )
}
