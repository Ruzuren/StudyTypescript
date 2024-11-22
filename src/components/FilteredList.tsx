import React, { ChangeEvent } from 'react';
import { Todo } from "../types/todo";
import { 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Box 
} from '@mui/material';

interface FilteredListProps {
  todos: Todo[];
  query: string;
  setQuery: (query: string) => void;
}

const FilteredList: React.FC<FilteredListProps> = ({ todos, query, setQuery }) => {
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const getFilteredTodos = (query: string, todos: Todo[]): Todo[] => {
       if (!query) {
         return todos;
       }
       return todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
       );
    };

    const filteredTodos = getFilteredTodos(query, todos);

    return (
        <Box sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Filter your task"
                placeholder="Type to filter..."
                value={query}
                onChange={onInputChange}
                margin="normal"
                sx={{ mb: 2 }}
            />
            <Paper elevation={2}>
                <List>
                    {filteredTodos.map(value => (
                        <ListItem key={value.id}>
                            <ListItemText primary={value.title} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default FilteredList;