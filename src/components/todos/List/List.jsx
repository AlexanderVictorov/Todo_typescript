import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@mui/material';

import { useSnackbar } from 'notistack';
import Todo from '../Todo/Todo';
import { changeStatus } from '../../../store/slices/todos';

const List = ({
  list, updateTodo, InWastebasket,
}) => {
  const [todoList, setTodoList] = useState(list);
  const [currentTodo, setCurrentTodo] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    setTodoList(list);
  }, [list]);

  const handleMoveToTrash = () => {
    enqueueSnackbar('Delete Todos', {
      variant: 'info',
    });
  };
  const dragStartHandler = (e, todo) => {
    e.target.style.opacity = '0.5';
    setCurrentTodo(todo);
  };
  const dragLeaveHandler = (e) => {
    e.target.style.opacity = '1';
  };
  const dragEndHandler = (e, todo) => {
    const { id } = todo;
    if (InWastebasket) {
      const statusTodoTrash = 'trash';
      dispatch(changeStatus({ id, statusTodoTrash }));
      handleMoveToTrash();
    }
    e.target.style.opacity = '1';
  };
  const dragOvertHandler = (e) => {
    e.preventDefault();
    e.target.style.opacity = '0.5';
  };
  const dropHandler = (e, todo) => {
    e.preventDefault();
    setTodoList((prev) => prev.map((item) => {
      if (item.id === currentTodo.id) {
        return todo;
      }
      if (item.id === todo.id) {
        return currentTodo;
      }
      return item;
    }));
    e.target.style.opacity = '1';
  };

  return (
    <Grid container>
      {todoList.map((todo, index) => (
        <Todo
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnd={dragEndHandler}
          onDragOver={dragOvertHandler}
          onDrop={dropHandler}
          validity={todo.validity}
          overdue={todo.overdue}
          index={index + 1}
          id={todo.id}
          name={todo.name}
          updateTodo={updateTodo}
          key={todo.id}
          todo={todo}
          status={todo.status}
        />
      ))}
    </Grid>
  );
};

export default List;
