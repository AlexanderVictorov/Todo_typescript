import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@mui/material';

import { useSnackbar } from 'notistack';
import { changeStatus } from '../../../store/slices/todos';

import { ITodo } from '../../../types/types';

import Todo from '../Todo';

interface IProps {
  list: ITodo[],
  updateTodo: (id: number, text: string) => void,
  InWastebasket: boolean
}

const List: FC<IProps> = ({
  list, updateTodo, InWastebasket,
}) => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [currentTodo, setCurrentTodo] = useState({});

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
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, todo: ITodo) => {
    e.currentTarget.style.opacity = '0.5';
    setCurrentTodo(todo);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>, todo: ITodo) => {
    const { id } = todo;
    if (InWastebasket) {
      const statusTodoTrash = 'trash';
      dispatch(changeStatus({ id, statusTodoTrash }));
      handleMoveToTrash();
    }
    e.currentTarget.style.opacity = '1';
  };
  const dragOvertHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.opacity = '0.5';
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>, todo: ITodo) => {
    e.preventDefault();
    setTodoList((prev: any[]) => prev.map((item) => {
      // @ts-ignore
      if (item.id === currentTodo.id) {
        return todo;
      }
      if (item.id === todo.id) {
        return currentTodo;
      }
      return item;
    }));
    e.currentTarget.style.opacity = '1';
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
          index={index + 1}
          updateTodo={updateTodo}
          key={todo.id}
          todo={todo}
        />
      ))}
    </Grid>
  );
};

export default List;
