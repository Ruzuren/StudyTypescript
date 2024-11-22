import { Todo } from "../types/todo";

const moveTodoUp = (todos: Todo[], index: number): Todo[] => {
  if (index > 0) {
    const updatedTodos = [...todos];
    [updatedTodos[index], updatedTodos[index - 1]] = [
      updatedTodos[index - 1],
      updatedTodos[index],
    ];
    return updatedTodos;
  }
  return todos;
};
const moveTodoDown = (todos: Todo[], index: number): Todo[] => {
  if (index < todos.length - 1) {
    const updatedTodos = [...todos];
    [updatedTodos[index], updatedTodos[index + 1]] = [
      updatedTodos[index + 1],
      updatedTodos[index],
    ];
    return updatedTodos;
  }
  return todos;
};

const bringToTop = (todos: Todo[], id: string): Todo[] => {
  const updatedTodos = [...todos];
  const index = updatedTodos.findIndex((todo) => todo.id === id);
  if (index > 0) {
    const item = updatedTodos.splice(index, 1)[0];
    updatedTodos.unshift(item);
    return updatedTodos;
  }
  return todos;
};

const toggleTodoComplete = (todos: Todo[], todoId: string): Todo[] => {
  return todos.map((item) => {
    if (item.id === todoId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
};

export { moveTodoUp, moveTodoDown, bringToTop, toggleTodoComplete };
