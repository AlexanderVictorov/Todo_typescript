import { createTheme } from '@mui/material';

const lightThemeOptions = {
  type: 'light',
  dictionary: 'light',
  palette: {
    primary: {
      main: '#1769aa',
    },
    color: {
      white: '#ffffff',
      icon: '#1769aa',
      background: '#80cbc4',
    },
  },
};
const darkThemeOptions = {
  type: 'dark',
  dictionary: 'dark',
  palette: {
    primary: {
      main: '#bdbdbd',
    },
    color: {
      white: '#006064',
      icon: '#bdbdbd',
      background: '#00838f',
    },
  },
};
export const light = () => (createTheme(lightThemeOptions));
export const dark = () => (createTheme(darkThemeOptions));
