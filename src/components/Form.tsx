import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Tooltip, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "../types/todo";
import useTimeZone from "../hooks/useTimeZone";
import { todoSchema, FormData } from "../schemas/todoSchema";

interface FormProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  editTodo: Todo | null;
  setEditTodo: (todo: Todo | null) => void;
}

const Form: React.FC<FormProps> = ({
  todos,
  setTodos,
  editTodo,
  setEditTodo,
}) => {
  const { gmt7Time } = useTimeZone();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: editTodo?.title || "",
      datetime: gmt7Time.toISOString().slice(0, 16),
    },
  });

  React.useEffect(() => {
    if (editTodo) {
      setValue("title", editTodo.title);
      setValue("datetime", editTodo.datetime);
    }
  }, [editTodo, setValue]);

  const updateTodo = (
    title: string,
    id: string,
    completed: boolean,
    datetime: string
  ) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed, datetime } : todo
    );
    setTodos(newTodo);
    setEditTodo(null);
  };

  function handleCancel(): void {
    reset({
      title: "",
      datetime: gmt7Time.toISOString().slice(0, 16),
    });
    setEditTodo(null);
  }

  const onFormSubmit = (data: FormData) => {
    if (!editTodo) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: data.title,
          completed: false,
          datetime: data.datetime,
        },
      ]);
    } else {
      updateTodo(data.title, editTodo.id, editTodo.completed, data.datetime);
    }
    reset({
      title: "",
      datetime: gmt7Time.toISOString().slice(0, 16),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Tooltip
        title={errors.title?.message || "Enter your task here"}
        open={!!errors.title}
        placement="top"
      >
        <TextField
          {...register("title")}
          placeholder="Enter your task"
          error={!!errors.title}
          variant="outlined"
          size="small"
          sx={{ marginRight: 1 }}
        />
      </Tooltip>

      <TextField
        {...register("datetime")}
        type="datetime-local"
        error={!!errors.datetime}
        variant="outlined"
        size="small"
        sx={{ marginRight: 1 }}
      />

      <Tooltip title={editTodo ? "Update task" : "Add new task"}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={editTodo ? <UpdateIcon /> : <AddIcon />}
          sx={{ margin: "0 8px" }}
        >
          {editTodo ? "Update" : "Add"}
        </Button>
      </Tooltip>

      {editTodo && (
        <Tooltip title="Cancel editing">
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </Tooltip>
      )}
    </form>
  );
};
export default Form;
