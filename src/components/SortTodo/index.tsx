import React, { Dispatch, FC, SetStateAction } from 'react';

import {
  Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { TStatus } from '../../types/types';

interface IProps {
  filter: string,
  setFilter: Dispatch<SetStateAction<TStatus>>
}

const SortTodo: FC<IProps> = ({ filter, setFilter }) => {
  const handleChangeFilter = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFilter(event.target.value as TStatus);
  };

  return (
    <Box>
      <FormControl size="small" fullWidth sx={{ minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label">Sort Todos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Index"
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
