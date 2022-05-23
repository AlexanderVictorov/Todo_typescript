import React from 'react';
import './App.css';

import MyRoutes from './components/MyRouters';
import Loader from './components/Loader';
import { useAppSelector } from './types/hooks/hooks';

const App = () => {
  const loading = useAppSelector((state) => state.todos.loading);

  return (
    <div className="App">
      {loading && <Loader />}
      <MyRoutes />
    </div>
  );
};

export default App;
