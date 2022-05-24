import React from 'react';

import { Box, Typography } from '@mui/material';
import Navigation from '../../pages/Navigation';
import Animation from '../Animation';
import CustomizedSwitches from '../SwitchTheme';

const styles = {
  Header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color.background',
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
  <Box
    sx={styles.Header}
  >
    <Box>
      <Navigation />
    </Box>
    <Box>
      <CustomizedSwitches />
    </Box>
    <Animation />
  </Box>
);

export default Header;
