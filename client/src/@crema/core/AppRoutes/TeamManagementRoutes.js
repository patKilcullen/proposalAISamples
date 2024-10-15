import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const AllTeamMembers = React.lazy(
  () => import('../../../modules/teamManagement/AllTeamMembers'),
  //   import('../../../modules/invoice/Listing'),
);

const AddTeamMembers = React.lazy(
  () => import('../../../modules/teamManagement/AddTeamMembersPage'),
  //   import('../../../modules/invoice/Listing'),
);

export const teamManagemnetRoutesConfigs = [
  {
    path: '/team-members',
    element: <AllTeamMembers />,
  },

  {
    path: '/add-team-members',
    element: <AddTeamMembers />,
  },
];
