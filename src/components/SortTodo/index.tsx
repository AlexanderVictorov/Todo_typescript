import React, { Dispatch, FC, SetStateAction } from 'react';

import {
  Box, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

interface IProps {
  filter: string,
  setFilter: Dispatch<SetStateAction<string>>
}

// const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

const SortTodo: FC<IProps> = ({ filter, setFilter }) => (
  <Box>
    <FormControl size="small" fullWidth sx={{ minWidth: 80 }}>
      <InputLabel id="demo-simple-select-label">Sort Todos</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter}
        label="Index"
        onChange={(event) => setFilter(event.target.value as string)}
      >
        <MenuItem value="all">All todos</MenuItem>
        <MenuItem value="done">Completed Todos</MenuItem>
        <MenuItem value="active">Not Completed Todos</MenuItem>
      </Select>
    </FormControl>
  </Box>
);
export default SortTodo;
