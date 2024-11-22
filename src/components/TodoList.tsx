import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Todo } from "../types/todo";
import { calculateDueDays, formatDateTime } from "../utils/dateUtils";
import {
  moveTodoUp,
  moveTodoDown,
  bringToTop,
  toggleTodoComplete,
} from "../utils/todoOperations";

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setEditTodo: (todo: Todo | null) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  setEditTodo,
}) => {
  const handleEdit = ({ id }: { id: string }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    if (findTodo) setEditTodo(findTodo);
  };

  const handleDelete = ({ id }: { id: string }) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    setEditTodo(null);
  };

  const handleComplete = (todo: Todo) => {
    setTodos(toggleTodoComplete(todos, todo.id));
  };

  const handleMoveUp = (index: number) => {
    setTodos(moveTodoUp(todos, index));
  };

  const handleMoveDown = (index: number) => {
    setTodos(moveTodoDown(todos, index));
  };

  const handleBringToTop = (id: string) => {
    setTodos(bringToTop(todos, id));
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <li className="list-item" key={todo.id}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              value={todo.title}
              className={!todo.completed ? "list" : "list complete"}
              onChange={(event) => event.preventDefault()}
            />

            <span
              style={{
                fontSize: "0.8rem",
                color: "gray",
                marginTop: "4px",
              }}
            >
              {calculateDueDays(todo.datetime)}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={formatDateTime(todo.datetime)}
              className={!todo.completed ? "list" : "list complete"}
              onChange={(event) => event.preventDefault()}
            />
          </div>
          <IconButton color="primary" onClick={() => handleComplete(todo)}>
            <Tooltip
              id="my-tooltip1"
              title={!todo.completed ? "Set Complete" : "Set Incomplete"}
            >
              {!todo.completed ? <CheckCircleIcon /> : <RemoveIcon />}
            </Tooltip>
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEdit(todo)}>
            <Tooltip id="my-tooltip" title="Edit task todo!">
              <EditIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(todo)}>
            <Tooltip id="my-tooltip" title="Delete task todo!">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleMoveUp(index)}
            disabled={index === 0}
          >
            <Tooltip id="my-tooltip" title="Move Task todo Up!">
              <ArrowUpwardIcon
                sx={{
                  color: index === 0 ? "grey.400" : "inherit",
                }}
              />
            </Tooltip>
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleMoveDown(index)}
            disabled={index === todos.length - 1}
          >
            <Tooltip id="my-tooltip" title="Move Task todo Down!">
              <ArrowDownwardIcon
                sx={{
                  color: index === todos.length - 1 ? "grey.400" : "inherit",
                }}
              />
            </Tooltip>
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleBringToTop(todo.id)}
            disabled={index === 0}
          >
            <Tooltip id="my-tooltip" title="Move Task todo to top priority!">
              <KeyboardDoubleArrowUpIcon
                sx={{
                  color: index === 0 ? "grey.400" : "inherit",
                }}
              />
            </Tooltip>
          </IconButton>{" "}
        </li>
      ))}{" "}
    </div>
  );
};

export default TodoList;
