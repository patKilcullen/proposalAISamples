import React from 'react';
import {Navigate} from 'react-router-dom';

import {authRouteConfig} from './AuthRoutes';
import Error403 from '../../../modules/errorPages/Error403';
import {errorPagesConfigs} from './ErrorPagesRoutes';
import {accountPagesConfigs} from './AccountRoutes';
import { initialUrl } from '@crema/constants/AppConst';
import {projectRoutesConfigs} from './ProjectRoutes'
import { businessRoutesConfigs } from './BusinessRoutes';
import { teamManagemnetRoutesConfigs } from './TeamManagementRoutes';
import {supportRouteConfigs} from './SupportRoutes'
 
 import {dashboardRoutesConfigs} from './DahsboardRoutes.js'
 import {templateRoutesConfigs} from './Templates.js'


const AcceptProposal = React.lazy(() =>
  import('../../../modules/Projects/AcceptProposal'),
);
const SignupClient = React.lazy(() =>
  import('../../../modules/auth/SignupClient'),
);
const VerifyEmail = React.lazy(() => import('../../../modules/auth/VerifyEmail/verifyEmail'));


const authorizedStructure = (initialUrl) => {
  return {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...accountPagesConfigs,
    ...projectRoutesConfigs,
    ...businessRoutesConfigs,
    ...teamManagemnetRoutesConfigs,
    ...dashboardRoutesConfigs,
    ...templateRoutesConfigs,
    ...supportRouteConfigs
    
  ],
};
}

const publicStructure =  (initialUrl) =>{
  return {
  fallbackPath: initialUrl,
routes: authRouteConfig
  }
};
const anonymousStructure =  (initialUrl) =>{
  return {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to='/error-pages/error-404' />,
    },
    {
      path: '/users/verify/:id/:token',
      element: <VerifyEmail />,
    },
    {

    path: '/accept-proposal/:role/:pid/:token',
    element: <AcceptProposal />,
    },
  ]),
};
}

export { authorizedStructure, publicStructure, anonymousStructure };

