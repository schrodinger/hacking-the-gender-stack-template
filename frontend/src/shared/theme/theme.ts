import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#005baa' },
    secondary: { main: '#52caf5' },
  },
  shape: { borderRadius: 15 },
  typography: {
    fontFamily: '"Rubik", "Arial", sans-serif',
  },
});

export default theme;
