import React, { useMemo } from 'react';
import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MyRoutes from './components/MyRouters';
import Loader from './components/Loader';
import { useAppSelector } from './types/hooks/hooks';
import { dark, light } from './components/theme/MuiTheme';
import DynamicBackground from './components/DynamicBackground';

const App = () => {
  const loading = useAppSelector((state) => state.todos.loading);
  const theme = useAppSelector((state) => state.theme.theme);

  const customTheme = useMemo(() => (theme === 'light' ? light() : dark()), [theme]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        className="App"
      >
        {loading && <Loader />}
        <DynamicBackground />
        <MyRoutes />
      </Box>
    </ThemeProvider>
  );
};

export default App;
