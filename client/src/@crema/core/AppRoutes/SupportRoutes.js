import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const ContactSupport = React.lazy(() => import('../../../modules/Support/ContactSupport.js'));


export const supportRouteConfigs = [
  {
    permittedRole: [RoutePermittedRole.Client,RoutePermittedRole.Admin],
    path: '/contact-support',
    element: <ContactSupport />,
  },
 
];
