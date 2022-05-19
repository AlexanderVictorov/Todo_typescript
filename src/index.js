import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import { Collapse } from '@mui/material';

import App from './App';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={1000}
        TransitionComponent={Collapse}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
