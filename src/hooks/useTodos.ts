import { useState, useEffect } from 'react'
import type { Todo } from '../types/todo'

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return { todos, setTodos }
}

export default useTodos
