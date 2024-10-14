import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const PersonalizedTempaltes = React.lazy(() => import('../../../modules/Templates.js/PersonalizedTemplate.js'));
const DocumentsPreferences = React.lazy(() =>
  import('../../../modules/Templates.js/DocumentPreference.js'),
);
export const templateRoutesConfigs = [
  {
    permittedRole: [
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/templates',
    element: <PersonalizedTempaltes />,
  },
  {
    permittedRole: [
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/doc-preferences',
    element: <DocumentsPreferences />,
  },
];
