// ForJWT Auth
import {useEffect, useState} from 'react'
import { getUserFromJwtAuth } from '@crema/helpers/AuthHelper';
import {
  useJWTAuth,
  useJWTAuthActions,
} from '@crema/services/auth/jwt-auth/JWTAuthProvider';

export const useAuthUser = () => {

  const {user, isAuthenticated, isLoading} = useJWTAuth();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromJwtAuth(user),

  };
};


export const useAuthMethod = () => {
  const {
    signInUser,
    signUpUser,
    logout,
    getAuthUser,
    signUpClient,
    signUpBusiness,
    signInNewTeamMember,
    signUpUserGoogle,
    signInUserGoogle,
    signUpClientGoogle,
    signUpUserGoogleBack,
    signUpBusinessGoogle,
    signUpUserRole
  } = useJWTAuthActions();

  return {
    signInUser,
    logout,
    signUpUser,
    getAuthUser,
    signUpClient,
    signUpBusiness,
    signInNewTeamMember,
    signUpUserGoogle,
    signInUserGoogle,
    signUpClientGoogle,
    signUpUserGoogleBack,
    signUpBusinessGoogle,
    signUpUserRole
  };
};
