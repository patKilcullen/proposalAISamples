import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const BusinessOnboarding = React.lazy(() =>
    import('../../../modules/business/Onboarding/index'),
//   import('../../modules/invoice/Listing'),
);
const BusinessInfo = React.lazy(() =>
    import('../../../modules/business/BusinessInfo'),
//   import('../../modules/invoice/Listing'),
);


export const businessRoutesConfigs = [
  {
    permittedRole: [RoutePermittedRole.Client, RoutePermittedRole.Admin],
    path: '/business-onboarding',
    element: <BusinessOnboarding />,
  },
  {
    permittedRole: [RoutePermittedRole.Client, RoutePermittedRole.Admin],
    path: '/business-information',
    element: <BusinessInfo />,
  },

];
