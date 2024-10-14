import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';


const Dashboard = React.lazy(() =>
  import('../../../modules/Dashboard'),
);



export const dashboardRoutesConfigs = [
 {
    permittedRole: [
      // RoutePermittedRole.User,
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/dashboard',
    element: <Dashboard />,
  },

];
