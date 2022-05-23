import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { useSnackbar } from 'notistack';

import {
  changeStatus,
  deleteTodo,
  fetchTodos,
  saveTodoOnServer,
} from '../../store/slices/todos';
import Loader from '../../components/Loader';
import ROUTE_LINKS from '../../components/MyRouters/routeLink';

const styles = {
  Paper: {
    position: 'relative',
    margin: 'auto',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    width: '500px',
    textDecoration: 'none',
    zIndex: 1,
  },
};

const Trashcan = () => {
  const [trashTodo, setTrashTodo] = useState(null);

  const todoArray = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (todoArray) return;
    dispatch(fetchTodos());
  }, [todoArray]);
  useEffect(() => {
    if (!todoArray) return;
    const todoByStatus = todoArray.filter((todos) => todos.status === 'trash');
    if (todoByStatus.length === 0) {
      navigate(ROUTE_LINKS.todo);
    }
    if (!todoByStatus) return;
    setTrashTodo(todoByStatus);
  }, [todoArray]);

  const handleClickRestoreTodo = () => {
    enqueueSnackbar('Restore Todos', {
      variant: 'success',
    });
  };
  const handleClickRemoveTodo = () => {
    enqueueSnackbar('Remove Todos', {
      variant: 'info',
    });
  };
  const restoreTodo = (id) => {
    const statusTodoActive = 'active';
    dispatch(changeStatus({ id, statusTodoActive }));
    handleClickRestoreTodo();
    dispatch(saveTodoOnServer());
  };
  const removeTodo = (id) => {
    dispatch(deleteTodo(id));
    handleClickRemoveTodo();
    dispatch(saveTodoOnServer());
  };

  if (!trashTodo) return <Loader />;

  return (
    <>
      {trashTodo.map((todos) => (
        <Paper
          elevation={2}
          sx={styles.Paper}
          key={todos.id}
        >
          {todos.name}
          <Box sx={{ marginLeft: 'auto', cursor: 'pointer', display: 'flex' }}>
            <AutorenewIcon
              color="primary"
              aria-label="Restore"
              onClick={() => restoreTodo(todos.id)}
            />
            <DeleteIcon
              color="secondary"
              aria-label="Delete"
              onClick={() => removeTodo(todos.id)}
            />
          </Box>
        </Paper>
      ))}
    </>
  );
};

export default Trashcan;
