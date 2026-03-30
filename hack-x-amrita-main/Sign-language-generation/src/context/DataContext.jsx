import React, { createContext, useState } from 'react'
import { mockData } from '../data/mockData'

export const DataContext = createContext()

export function DataProvider({ children }) {
  const [subjects, setSubjects] = useState(mockData.subjects)
  const [topics, setTopics] = useState(mockData.topics)
  const [subtopics, setSubtopics] = useState(mockData.subtopics)

  // Add Subject
  const addSubject = (name, color, icon) => {
    const newSubject = {
      id: Math.max(...subjects.map(s => s.id), 0) + 1,
      name,
      color,
      icon
    }
    setSubjects([...subjects, newSubject])
    return newSubject
  }

  // Add Topic
  const addTopic = (subjectId, name, description) => {
    const newTopic = {
      id: Math.max(...topics.map(t => t.id), 0) + 1,
      subjectId,
      name,
      description
    }
    setTopics([...topics, newTopic])
    return newTopic
  }

  // Add Subtopic
  const addSubtopic = (topicId, title, description, image, videoUrl) => {
    const newSubtopic = {
      id: Math.max(...subtopics.map(s => s.id), 0) + 1,
      topicId,
      title,
      description,
      image,
      videoUrl
    }
    setSubtopics([...subtopics, newSubtopic])
    return newSubtopic
  }

  // Edit Subject
  const editSubject = (id, name, color, icon) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, name, color, icon } : s))
  }

  // Edit Topic
  const editTopic = (id, name, description) => {
    setTopics(topics.map(t => t.id === id ? { ...t, name, description } : t))
  }

  // Edit Subtopic
  const editSubtopic = (id, title, description, image, videoUrl) => {
    setSubtopics(subtopics.map(s => s.id === id ? { ...s, title, description, image, videoUrl } : s))
  }

  // Delete
  const deleteSubject = (id) => setSubjects(subjects.filter(s => s.id !== id))
  const deleteTopic = (id) => setTopics(topics.filter(t => t.id !== id))
  const deleteSubtopic = (id) => setSubtopics(subtopics.filter(s => s.id !== id))

  return (
    <DataContext.Provider value={{
      subjects, topics, subtopics,
      addSubject, addTopic, addSubtopic,
      editSubject, editTopic, editSubtopic,
      deleteSubject, deleteTopic, deleteSubtopic
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = React.useContext(DataContext)
  if (!ctx) {
    throw new Error('useData must be used within DataProvider')
  }
  return ctx
}
