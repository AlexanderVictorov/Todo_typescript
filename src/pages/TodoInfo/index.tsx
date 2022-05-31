import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box, Button, Paper, Typography,
} from '@mui/material';

import Loader from '../../components/Loader';
import { fetchTodos } from '../../store/slices/todos';
import ROUTE_LINKS from '../../components/MyRouters/routeLink';
import { useAppDispatch, useAppSelector } from '../../types/hooks/hooks';
import { ITodo } from '../../types/types';

const styles = {
  Paper: {
    backgroundColor: 'color.white',
    position: 'relative',
    margin: 'auto',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    width: '100%',
    maxWidth: '500px',
    textDecoration: 'none',
  },
  ButtonBackTodo: {
    marginLeft: 'auto', fontFamily: 'serif', fontSize: '14px', textTransform: 'capitalize',
  },
};

const TodoInfo = () => {
  const [todoInfo, setTodoInfo] = useState<ITodo | null>(null);
  const [curIndex, setCurIndex] = useState<number>(0);

  const loading = useAppSelector((state) => state.todos.loading || []);
  const todoArray = useAppSelector((state) => state.todos.todos || []);

  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todoArray) return;
    dispatch(fetchTodos());
  }, [todoArray, loading]);
  useEffect(() => {
    if (!todoArray) return;
    const todoByIndex = todoArray.find((todo, inx) => {
      const { id } = params;
      const { id: todoId } = todo;
      if (!id) return false;
      if (todoId === +id) {
        setCurIndex(inx);
        return true;
      }
      return false;
    });
    if (!todoByIndex) return;
    setTodoInfo(todoByIndex);
  }, [todoArray, params]);

  const onNextTodo = () => {
    if (todoArray[curIndex + 1]) {
      const { id } = todoArray[curIndex + 1];
      navigate(`${ROUTE_LINKS.todo}/${id}`);
      return;
    }
    const { id } = todoArray[0];
    navigate(`${ROUTE_LINKS.todo}/${id}`);
  };
  const onPreviousTodo = () => {
    if (todoArray[curIndex - 1]) {
      const { id } = todoArray[curIndex - 1];
      navigate(`${ROUTE_LINKS.todo}/${id}`);
      return;
    }
    const { id } = todoArray[todoArray.length - 1];
    navigate(`${ROUTE_LINKS.todo}/${id}`);
  };
  const backTodos = () => {
    navigate(ROUTE_LINKS.todo);
  };

  if (!todoInfo) return <Loader />;

  return (
    <Box sx={{ padding: '15px' }}>
      <Paper
        elevation={2}
        sx={styles.Paper}
      >
        <Typography>
          Info:
          {todoInfo?.name}
        </Typography>
        <Button
          sx={styles.ButtonBackTodo}
          onClick={backTodos}
          variant="contained"
          size="small"
        >
          Back Todos
        </Button>
      </Paper>
      <Box sx={{ padding: '10px' }}>
        <Button
          sx={styles.ButtonBackTodo}
          onClick={onPreviousTodo}
        >
          previous Todos
        </Button>
        <Button
          sx={styles.ButtonBackTodo}
          onClick={onNextTodo}
        >
          next Todos
        </Button>
      </Box>
    </Box>
  );
};

export default TodoInfo;
