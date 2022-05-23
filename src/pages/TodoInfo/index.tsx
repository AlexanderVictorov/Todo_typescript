import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Loader from '../../components/Loader';
import { fetchTodos } from '../../store/slices/todos';
import ROUTE_LINKS from '../../components/MyRouters/routeLink';
import { useAppSelector } from '../../types/hooks/hooks';
import { ITodo } from '../../types/types';

const styles = {
  Paper: {
    position: 'relative',
    margin: 'auto',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    width: '100%',
    maxWidth: '500px',
    textDecoration: 'none',
    zIndex: 1,
  },
  ButtonBackTodo: {
    marginLeft: 'auto', fontFamily: 'serif', fontSize: '12px', textTransform: 'capitalize',
  },
};

const TodoInfo = () => {
  // @ts-ignore
  const [todoInfo, setTodoInfo] = useState<ITodo>([]);
  const [curIndex, setCurIndex] = useState<number>(0);

  const loading = useAppSelector((state) => state.todos.loading || []);
  const todoArray = useAppSelector((state) => state.todos.todos || []);

  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoArray) return;
    dispatch(fetchTodos());
  }, [todoArray, loading]);
  useEffect(() => {
    if (!todoArray) return;
    const todoByIndex = todoArray.find((todo, inx: number) => {
      const { id } = params;
      const { id: id1 } = todo;
      if (id1 === id) {
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
    } else {
      const { id } = todoArray[0];
      navigate(`${ROUTE_LINKS.todo}/${id}`);
    }
  };
  const onPreviousTodo = () => {
    if (todoArray[curIndex - 1]) {
      const { id } = todoArray[curIndex - 1];
      navigate(`${ROUTE_LINKS.todo}/${id}`);
    } else {
      const { id } = todoArray[todoArray.length - 1];
      navigate(`${ROUTE_LINKS.todo}/${id}`);
    }
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
          {todoInfo.name}
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
        <Typography>Flip Through Todos</Typography>
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          onClick={onPreviousTodo}
        />
        <ArrowForwardIcon
          sx={{ cursor: 'pointer' }}
          onClick={onNextTodo}
        />
      </Box>
    </Box>
  );
};

export default TodoInfo;
