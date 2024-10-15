import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const AllProjects = React.lazy(() =>
  import('../../../modules/Projects/AllProjects'),
);
const CreateProject = React.lazy(() =>
  import('../../../modules/Projects/CreateProposal'),
);

const EditProject = React.lazy(() =>
  import('../../../modules/Projects/CreateProposal/Content/EditProposal'),
);
const SentProject = React.lazy(() =>
  import('../../../modules/Projects/SentProposal'),
);
const CompletedProjects = React.lazy(() =>
  import('../../../modules/Projects/AllProjects/CompletedProjects'),
);
const ActiveProjects = React.lazy(() =>
  import('../../../modules/Projects/AllProjects/ActiveProjects'),
);

const AcceptProposal = React.lazy(() =>
  import('../../../modules/Projects/AcceptProposal'),
);

export const projectRoutesConfigs = [
  {
       permittedRole: [
       RoutePermittedRole.Admin, RoutePermittedRole.Client],
    path: '/projects',
    element: <AllProjects />,
  },
  {
    permittedRole: [
       RoutePermittedRole.Admin, RoutePermittedRole.Client],
    path: '/create-project',
    element: <CreateProject />,
  },
  {
    permittedRole: [
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/edit-project/:id',
    element: <EditProject />,
  },
  {
    permittedRole: [
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/sent-project/:pid',
    element: <SentProject />,
  },
  {
    permittedRole: [
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/completed-projects',
    element: <CompletedProjects />,
  },
  {
    permittedRole: [
      RoutePermittedRole.Client,
      RoutePermittedRole.Admin,
    ],
    path: '/active-projects',
    element: <ActiveProjects />,
  },
];
