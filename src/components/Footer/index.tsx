import React from 'react';

import { Box } from '@mui/material';
import Moment from 'react-moment';

import Animation from '../Animation';

const styles = {
  Footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color.background',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%',
    height: '70px',
    overflow: 'hidden',
    zIndex: 1,
    fontSize: '20px',
  },
};

const Footer = () => (
  <Box sx={styles.Footer}>
    <Box />
    <Moment format="HH:mm" interval={1000} />
    <Animation />
  </Box>
);

export default Footer;
