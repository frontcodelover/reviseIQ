import { createTheme } from '@mui/material/styles';

export const themeMuiCore = createTheme({
  palette: {
    mode: 'light', // Assuming a light mode as default
    primary: {
      main: '#00A76F',
      light: '#5BE49B', // A lighter shade of primary, you might need to adjust
      dark: '#007867', // A darker shade of primary
      contrastText: '#fff', // Adjust if needed based on the color
    },
    secondary: {
      main: '#8E33FF',
      light: '#C684FF', // A lighter shade of secondary
      dark: '#5119B7', // A darker shade of secondary
      contrastText: '#fff', // Adjust if needed based on the color
    },
    info: {
      main: '#00B8D9',
      light: '#61F3F3',
      dark: '#006C9C',
      contrastText: '#fff', // Adjust if needed
    },
    success: {
      main: '#22C55E',
      light: '#77ED8B',
      dark: '#118D57',
      contrastText: '#fff', // Adjust if needed
    },
    warning: {
      main: '#FFAB00',
      light: '#FFD666',
      dark: '#B76E00',
      contrastText: '#fff', // Adjust if needed
    },
    error: {
      main: '#FF5630',
      light: '#FFAC82',
      dark: '#B71D18',
      contrastText: '#fff', // Adjust if needed
    },
    grey: {
      // Example of how to define grey shades, adjust as needed
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
    background: {
      paper: '#FFFFFF', // Default paper color
      default: '#F9FAFB', // Default background color
    },
  },
});

export default themeMuiCore;
