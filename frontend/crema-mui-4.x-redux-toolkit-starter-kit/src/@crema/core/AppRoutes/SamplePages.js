import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const Page1 = React.lazy(() => import('../../../modules/sample/Page1'));
const Page2 = React.lazy(() => import('../../../modules/sample/Page2'));

export const samplePagesConfigs = [
  {
    permittedRole: RoutePermittedRole.Client,
    path: '/sample/page-1',
    element: <Page1 />,
  },
  {
    permittedRole: RoutePermittedRole.Client,
    path: '/sample/page-2',
    element: <Page2 />,
  },
];
