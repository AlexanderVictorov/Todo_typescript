import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Paper,
} from '@mui/material';

import AddTodo from '../AddTodo/AddTodo';
import List from '../List/List';
import ShowPagination from '../../Pagination/ShowPagination';
import {
  addTodo,
  changeTodos,
  fetchTodos,
} from '../../../store/slices/todos';
import emptyTrash from '../../../images/emtyTrash.png';
import fullTrash from '../../../images/fullTrash.png';

import ROUTE_LINKS from '../../MyRouters/routeLink';

const styles = {
  Paper: {
    padding: '15px',
    margin: 'auto',
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
    zIndex: 1,
  },
  Wastebasket: {
    position: 'absolute',
    bottom: '80px',
    right: '10px',
    cursor: 'pointer',
  },
};

const TodoList = () => {
  const [trashCondition, setTrashCondition] = useState(false);
  const [filter, setFilter] = useState('all');
  const [InWastebasket, setInWastebasket] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoPerPage] = useState(4);

  const todoArray = useSelector((state) => state.todos.todos || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterTodo = useMemo(() => {
    switch (filter) {
      case 'all':
        return todoArray.filter((todo) => todo.status !== 'trash');
      case 'done':
        return todoArray.filter((todo) => todo.status === 'done');
      case 'active':
        return todoArray.filter((todo) => todo.status === 'active');
      default:
        return null;
    }
  }, [filter, todoArray]);

  const lastTodoIndex = currentPage * todoPerPage;
  const firstTodoIndex = lastTodoIndex - todoPerPage;
  const currentTodoPage = filterTodo.slice(firstTodoIndex, lastTodoIndex);

  useEffect(() => {
    const trashStatusInTodo = todoArray.find((todo) => todo.status === 'trash');
    if (!trashStatusInTodo) return;
    setTrashCondition(true);
  }, [trashCondition, todoArray]);
  useEffect(() => {
    if (todoArray.length) return;
    dispatch(fetchTodos());
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const addTodoInList = (todo) => {
    dispatch(addTodo({
      id: Date.now(),
      name: todo,
      status: 'active',
      validity: Infinity,
      overdue: false,
    }));
  };
  const navigatingToTheWastebasket = () => navigate(ROUTE_LINKS.trash);
  const updateTodo = (id, newText) => {
    dispatch(changeTodos({ id, newText }));
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = () => {
    setInWastebasket(true);
  };

  return (
    <Grid
      container
      spacing={0}
    >
      <Grid
        item
        xs={12}
        sx={{ padding: '15px' }}
      >
        <Paper sx={styles.Paper}>
          <AddTodo
            filter={filter}
            setFilter={setFilter}
            addTodoInList={addTodoInList}
          />
        </Paper>
        <Box
          sx={styles.Wastebasket}
          onClick={navigatingToTheWastebasket}
          onDragOver={(e) => onDragOver(e)}
          onDrop={onDrop}
        >
          {trashCondition
            ? <img src={fullTrash} alt="iconTrash" />
            : <img src={emptyTrash} alt="iconTrash" />}
        </Box>
      </Grid>
      <Grid
        className="Vlad"
        item
        xs={12}
        sx={styles.Paper}
      >
        <List
          InWastebasket={InWastebasket}
          updateTodo={updateTodo}
          list={currentTodoPage}
        />
        <ShowPagination
          paginate={paginate}
          todoPerPage={todoPerPage}
          total={filterTodo.length}
        />
      </Grid>
    </Grid>
  );
};

export default TodoList;
