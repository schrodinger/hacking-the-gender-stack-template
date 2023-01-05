import { Outlet, Route, createRoutesFromElements } from 'react-router';

import CreateEnumeration from './enumeration/create/CreateEnumeration';
import ErrorPage from './error-page/ErrorPage';
import Home from './home/Home';
import { withMainLayout } from './layout/main/Main';

export default createRoutesFromElements(
  <Route path="/" element={withMainLayout(<Outlet />)} errorElement={withMainLayout(<ErrorPage />)}>
    <Route index element={<Home />} />
    <Route path="enumeration" element={<CreateEnumeration />} />
  </Route>
);
