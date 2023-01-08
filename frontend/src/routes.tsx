import { Outlet, Route, createRoutesFromElements } from 'react-router';

import CoreSelection from './enumeration/cores/CoreSelection';
import CreateEnumeration from './enumeration/create/CreateEnumeration';
import ErrorPage from './error-page/ErrorPage';
import Home from './home/Home';
import { withMainLayout } from './layout/main/Main';

const coreRoutes = (
  <Route path="core">
    <Route index element={<CoreSelection />} />
    <Route path=":coreId/r-groups" element={<div>R-Groups</div>} />
  </Route>
);

export default createRoutesFromElements(
  <Route path="/" element={withMainLayout(<Outlet />)} errorElement={withMainLayout(<ErrorPage />)}>
    <Route index element={<Home />} />
    <Route path="enumeration">
      <Route index element={<CreateEnumeration />} />
      {coreRoutes}
    </Route>
  </Route>
);
