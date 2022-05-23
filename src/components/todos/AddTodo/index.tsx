import React, {
  Dispatch, FC, SetStateAction, useState,
} from 'react';

import {
  Box, Button, Input, Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { saveTodoOnServer } from '../../../store/slices/todos';

import SortTodo from '../../SortTodo';

import { TStatus } from '../../../types/types';
import { useAppDispatch } from '../../../types/hooks/hooks';

const styles = {
  SortDropDown: {
    position: 'absolute',
    top: '15px',
    left: '5px',
    zIndex: '100',
  },
  ButtonAddTodo: {
    lineHeight: '13px',
    marginRight: '5px',
    fontFamily: 'serif',
    fontSize: '14px',
    textTransform: 'capitalize',
  },
  ButtonSaveTodo: {
    backgroundColor: 'green',
    marginRight: '-5px',
    fontFamily: 'serif',
    fontSize: '14px',
    lineHeight: '13px',
    letterSpacing: '0px',
    textTransform: 'capitalize',
  },
  TodoPanel: {
    display: 'flex',
    width: '100%',
    height: '30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

interface IProps {
  addTodoInList: (name: string) => void;
  setFilter: Dispatch<SetStateAction<TStatus>>;
  filter: TStatus;
}

const AddTodo: FC<IProps> = ({
  addTodoInList, setFilter, filter,
}) => {
  const [newTodo, setNewTodo] = useState('');
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (newTodo === '') {
      setIsError(true);
      return;
    }
    setIsError(false);
    addTodoInList(newTodo);
    setNewTodo('');
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };
  const saveTodosInServer = () => {
    enqueueSnackbar('Save Todos', {
      variant: 'success',
    });
    dispatch(saveTodoOnServer());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      <Box sx={styles.TodoPanel}>
        <Input
          placeholder="Todo"
          inputProps={{
            'aria-label': 'Description',
          }}
          onChange={onChangeInput}
          value={newTodo}
          sx={{ width: '100%' }}
        />
        <Button
          sx={styles.ButtonAddTodo}
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >
          Add Todos
        </Button>
        <Button
          sx={styles.ButtonSaveTodo}
          variant="contained"
          size="small"
          onClick={saveTodosInServer}
        >
          Save Todos
        </Button>
        {isError && (
          <Typography sx={{ marginLeft: '10px' }} variant="caption" color="error">
            Error, must enter a value!
          </Typography>
        )}
      </Box>
      <Box />
      <Box sx={styles.SortDropDown}>
        <SortTodo
          filter={filter}
          setFilter={setFilter}
        />
      </Box>
    </Box>
  );
};

export default AddTodo;
