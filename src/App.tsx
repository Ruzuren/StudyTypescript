import { useState } from 'react'
import { Header } from './components/Header'
import { TodoContext } from './context/TodoContext'
import TodoContainer from './components/TodoContainer.tsx'
import useTodos from './hooks/useTodos'
import './App.css'
import { Todo } from './types/todo.ts'

const App = () => {
  const { todos, setTodos } = useTodos()
  const [editTodo, setEditTodo] = useState<Todo | null>(null)

  return (
    <TodoContext.Provider value={{ todos, setTodos, editTodo, setEditTodo }}>
      <div className="container">
        <div className="app-wrapper">
          <Header />
          <TodoContainer />
        </div>
      </div>
    </TodoContext.Provider>
  )
}

export default App