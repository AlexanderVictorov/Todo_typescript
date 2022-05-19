import React from 'react';

import { Box, Typography } from '@mui/material';

import Navigation from '../../pages/Navigation';
import Animation from '../Animation';

const styles = {
  Header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '70px',
    overflow: 'hidden',
    zIndex: 1,
  },
};

const Header = () => (
  <Box sx={styles.Header}>
    <Box>
      <Typography variant="h5">Todos App</Typography>
      <Navigation />
    </Box>
    <Animation />
  </Box>
);

export default Header;
