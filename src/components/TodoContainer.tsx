import { useState } from 'react'
import Form from './Form'
import TodoList from './TodoList'
import FilteredList from './FilteredList'
import { useTodoContext } from '../context/TodoContext'

const TodoContainer = () => {
  const [query, setQuery] = useState('')
  const { todos, setTodos, editTodo, setEditTodo } = useTodoContext()

  return (
    <>
      <Form 
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
      <TodoList 
        todos={todos}
        setTodos={setTodos}
        setEditTodo={setEditTodo}
      />
      <FilteredList
        todos={todos}
        query={query}
        setQuery={setQuery}
      />
    </>
  )
}
export default TodoContainer