import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import ThemeVarsInjector from './shared/theme/ThemeVarsInjector';
import routes from './routes';
import theme from './shared/theme/theme';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeVarsInjector />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
