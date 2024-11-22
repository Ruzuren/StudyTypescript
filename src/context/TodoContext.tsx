import { createContext, useContext } from 'react'
import type { Todo } from '../types/todo'

interface TodoContextType {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  editTodo: Todo | null
  setEditTodo: (todo: Todo | null) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodoContext must be used within TodoProvider')
  return context
}
