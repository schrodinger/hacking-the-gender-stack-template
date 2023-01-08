import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import ThemeVarsInjector from './shared/theme/ThemeVarsInjector';
import routes from './routes';
import theme from './shared/theme/theme';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: import.meta.env.DEV ? false : true } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeVarsInjector />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
