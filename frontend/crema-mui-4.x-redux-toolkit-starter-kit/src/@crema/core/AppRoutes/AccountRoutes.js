import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import Account from '../../../modules/account/MyProfile';

import RequestPasswordReset from '../../../modules/account/MyProfile/ChangePassword'

export const accountPagesConfigs = [
  {
    permittedRole: [
      // RoutePermittedRole.User,
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/my-profile',
    element: <Account />,
  },

  {
    permittedRole: [
      // RoutePermittedRole.User,
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/users/reset-password/:id/:token',
    element: <RequestPasswordReset />,
  },
];

