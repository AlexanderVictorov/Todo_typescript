import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

import MyRoutes from './components/MyRouters';
import Loader from './components/Loader';
import { AuthContext } from './context/context';
import { useAppSelector } from './types/hooks/hooks';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const loading = useAppSelector((state) => state.todos.loading);

  useEffect(() => {
    const authorizedUser = localStorage.getItem('isAuth');
    if (!authorizedUser) return;
    setIsAuth(true);
  }, []);

  const providerValue = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);

  return (
    <div className="App">
      {loading && <Loader />}
      <AuthContext.Provider value={providerValue}>
        <MyRoutes />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
