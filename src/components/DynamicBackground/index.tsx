import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../types/hooks/hooks';

const styles = {
  BackgroundLight: {
    width: '100%',
    height: '100%',
    background: 'url(https://img.wallpapersafari.com/desktop/1920/1080/0/44/w87d5A.jpg)',
    position: 'fixed',
    top: '0px',
    left: '0px',
  },
  BackgroundDark: {
    width: '100%',
    height: '100%',
    background: 'url(https://cdn.wallpapersafari.com/66/20/UChNSy.jpg)',
    position: 'fixed',
    top: '0px',
    left: '0px',
  },
};

const DynamicBackground = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <Box sx={theme === 'light'
      ? styles.BackgroundLight
      : styles.BackgroundDark}
    />
  );
};

export default DynamicBackground;
