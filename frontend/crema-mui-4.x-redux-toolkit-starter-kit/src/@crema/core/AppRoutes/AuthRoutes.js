import React from 'react';

const Signin = React.lazy(() => import('../../../modules/auth/Signin'));
const Signup = React.lazy(() => import('../../../modules/auth/Signup'));
const SignupClient = React.lazy(() => import('../../../modules/auth/SignupClient'));
const SignupUser = React.lazy(() => import('../../../modules/auth/SignupUser'));
const SignupBusiness = React.lazy(() =>
  import('../../../modules/auth/SignupBusiness'),
);
const ForgotPassword = React.lazy(() =>
  import('../../../modules/auth/ForgetPassword')
);

const ResetPasswordAwsCognito = React.lazy(() =>
  import('../../../modules/auth/ForgetPassword/ResetPasswordAwsCognito')
);

// const VerifyEmail = React.lazy(() =>
//   import('../../../modules/auth/VerifyEmail')
// )
 const VerifyEmail = React.lazy(() => import('../../../modules/auth/VerifyEmail/verifyEmail'))

const NewTeamMemberSignIn = React.lazy(() => import('../../../modules/auth/NewTeamMemberSingIn'))

// UPDATED NEEDED? in NX it links to commented out file
// const AcceptProposal = React.lazy(() =>
//   import('../../../modules/auth/SignupClient/AcceptProposal'),
// );


export const authRouteConfig = [
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
     element: <Signup />,
   
  },
  {
    path: '/signupBusiness',
    element: <SignupBusiness />,
  },
    {
    path: '/signupClient/:pid',
    element: <SignupClient />,
  },
     {
    path: '/signupUser/:role/:pid/:token',
    element: <SignupUser />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },

  {
    path: '/reset-password',
    element: <ResetPasswordAwsCognito />,
  },

  {
    path: '/new-team-member/:uid',
    element: <NewTeamMemberSignIn />,
  },
  // {
  //   path: '/accept-proposal/:pid',
  //   element: <AcceptProposal />,
  // },
  //  {
  //   path: '/users/verify/:id/:token',
  //   element: <VerifyEmail />,
  // },
];
