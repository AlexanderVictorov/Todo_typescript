import React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const SortTodo = ({ filter, setFilter }) => {
  const handleChangeFilter = (event) => setFilter(event.target.value);

  return (
    <Box>
      <FormControl size="small" fullWidth sx={{ minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label">Sort Todos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Todo"
          onChange={handleChangeFilter}
        >
          <MenuItem value="all">All todos</MenuItem>
          <MenuItem value="done">Completed Todos</MenuItem>
          <MenuItem value="active">Not Completed Todos</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortTodo;
