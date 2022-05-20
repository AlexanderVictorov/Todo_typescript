import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../context/context';

import Layout from '../Layout';
import NoMatch from '../../pages/NoMatch/NoMatch';
import Login from '../../pages/Login';
import Registration from '../../pages/Registration';
import TodoList from '../todos/TodoList';
import TodoInfo from '../../pages/TodoInfo';
import ErrorRegistration from '../../pages/ErrorRegistration';
import Trashcan from '../../pages/Trashcan';

import ROUTE_LINKS from './routeLink';

const MyRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    isAuth
      ? (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Login />} />
            <Route path={ROUTE_LINKS.login} element={<Login />} />
            <Route path={ROUTE_LINKS.registration} element={<Registration />} />
            <Route path={ROUTE_LINKS.todo} element={<TodoList />} />
            <Route path={ROUTE_LINKS.todoId} element={<TodoInfo />} />
            <Route path={ROUTE_LINKS.exit} element={<Login />} />
            <Route path={ROUTE_LINKS.otherRoutes} element={<NoMatch />} />
            <Route path={ROUTE_LINKS.trash} element={<Trashcan />} />
          </Route>
        </Routes>
      )
      : (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Login />} />
            <Route path={ROUTE_LINKS.login} element={<Login />} />
            <Route path={ROUTE_LINKS.todo} element={<ErrorRegistration />} />
            <Route path={ROUTE_LINKS.registration} element={<Registration />} />
            <Route path={ROUTE_LINKS.otherRoutes} element={<NoMatch />} />
          </Route>
        </Routes>
      )
  );
};

export default MyRoutes;
