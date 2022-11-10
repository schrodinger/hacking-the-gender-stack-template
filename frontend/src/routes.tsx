import { Outlet, Route, createRoutesFromElements } from 'react-router';

import ErrorPage from './error-page/ErrorPage';
import Home from './home/Home';
import { withMainLayout } from './layout/main/Main';

export default createRoutesFromElements(
  <Route path="/" element={withMainLayout(<Outlet />)} errorElement={withMainLayout(<ErrorPage />)}>
    <Route index element={<Home />} />
  </Route>
);
