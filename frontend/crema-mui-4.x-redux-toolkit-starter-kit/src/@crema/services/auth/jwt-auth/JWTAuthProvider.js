import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtAxios, { setAuthToken } from './index';
import { jwtDecode } from 'jwt-decode';
 import { GoogleLogout } from 'react-google-login';
const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);


import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '@crema/constants/ActionTypes';

let serverError


const JWTAuthAuthProvider = ({
  children,
  fetchStart,
  fetchSuccess,
  fetchError,
}) => {
  const [JWTAuthdata, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

const dispatch = useDispatch()
const navigate = useNavigate()



const getAuthUser = async () => {
  fetchStart();


  const token = localStorage.getItem('token');

  if (!token) {
    fetchSuccess();
    setJWTAuthData({
      user: undefined,
      isLoading: false,
      isAuthenticated: false,
    });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);

    // Check if token has expired
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem('token');
      setJWTAuthData({
        user: undefined,
        isLoading: false,
        isAuthenticated: false,
      });
      return;
    }
  } catch (error) {

    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    setJWTAuthData({
      user: undefined,
      isLoading: false,
      isAuthenticated: false,
    });
    fetchSuccess();
    return;
  }

  setAuthToken(token);

  try {
    const { data } = await jwtAxios.get(
      `/users/get/${decodedToken.userId || decodedToken.sub}`
    );

    fetchSuccess();
    setJWTAuthData({
      user: data.user,
      isLoading: false,
      isAuthenticated: true,
    });
  } catch (error) {

    console.error('Error fetching user data:', error);
    // setJWTAuthData({
    //   user: undefined,
    //   isLoading: false,
    //   isAuthenticated: false,
    // });

      

 navigate('/error-pages/error-503')
    setJWTAuthData({
      isLoading: false,
  user: {role: null, displayName: null, email: null},
   isAuthenticated: true
    });

   fetchError(`Failed to load user data: ${error.message}`);
        // fetchSuccess();
  }
};

  useEffect(() => {
 
    getAuthUser();
  }, []);

  const signInUser = async ({ email, password, rememberMe }) => {

    fetchStart();
    
    try {
    
      const { data } = await jwtAxios.post('auth/login', { email, password, rememberMe });

      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get(`/users/get/${data.user._id}`);

      setJWTAuthData({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {

      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

      fetchError(error?.response?.data?.message ||error?.message || 'Something went wrong');
 
    }
  };

  const signUpUser = async ({ name, email, password }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('auth/register', {
        userName: name,
        email,
        password,
         role: "client"
      });

      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get(`/users/get/${data.user._id}`);

      setJWTAuthData({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

       fetchError(error?.response?.data?.message || error?.message || 'Something went wrong');
    }
  };

  // TODO: use fetch stat??? like other sing ins
  // SIGN UP WITH GOOGGLE: versin using fron end "auth"
  const signUpUserGoogle = async (token) => {    
    fetchStart()
    try {
      if (token) {
 
        const user = token.profileObj;

   

        const res = await jwtAxios.post(`/auth/create-google`, {...user, role: "client"});
        localStorage.setItem('token', token.tokenId);
        setAuthToken(res.data.token);
        setJWTAuthData({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
            fetchSuccess();
      }
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });      
      fetchError(error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong');
    }
  };

// SIGN IN GOOGLE
  const signInUserGoogle = async (token, rememberMe) => {

    try {
      if (token) {
        const user = token.profileObj;
// NEED TO ADD ROLE???????
        const res = await jwtAxios.post(`/auth/login-google`, {user, rememberMe});
        localStorage.setItem('token', token.tokenId);
        setAuthToken(res.data.token);
        setJWTAuthData({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : 'Something went wrong',
      );
    }
  };

  // SING IN WITH GOOOGLE USING BACKEND AUTH
  const signUpUserGoogleBack = async ({ user, token }) => {
    try {
      const res = await jwtAxios.get(`/users/get/${user.userId}`);
      setAuthToken(token);
      setJWTAuthData({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError('Something went wrong');
    }
  };

  const signUpClient = async ({ name, email, password, proposalId }) => {
    try {
      // Register user
      const registerResponse = await jwtAxios.post('auth/register', {
        userName: name,
        email,
        password,
        role: 'client',
      });
 
      localStorage.setItem('token', registerResponse.data.token);
      setAuthToken(registerResponse.data.token);

      setJWTAuthData({
        user: registerResponse.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

 
            try {
     await jwtAxios.patch(
                `business/proposal/update/${proposalId}`,
                {
                    clientId: registerResponse.data.user._id,
                  },
              );
            } catch (updateError) {

              console.log(
                'Update Proposal Error:',
                updateError.response?.data?.error || 'Something went wrong',
              );
            }
                 fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

      fetchError(error?.response?.data?.message || 'Something went wrong');
    }
  };

    const signUpUserRole = async ({ name, email, password, proposalId, role, token }) => {
    try {
      // Register user
      const registerResponse = await jwtAxios.post('auth/register', {
        userName: name,
        email,
        password,
        role: 'client',
      });
 
      localStorage.setItem('token', registerResponse.data.token);
      setAuthToken(registerResponse.data.token);

      setJWTAuthData({
        user: registerResponse.data.user,
        isAuthenticated: true,
        isLoading: false,
      });


 
 try {
  // const newBusiness =  
  await jwtAxios.post(`business/create`, {
         contactPerson: registerResponse.data.user._id,

         email: email,
           businessName: name,
       });

getAuthUser();
       navigate(`accept-proposal/${role}/${proposalId}/${token}`)
      } catch (error) {
        
        console.log(
          'Create Businsss Error:',
          error.response?.data?.error || error || 'Something went wrong',
        );

      await jwtAxios.delete(`users/${registerResponse.data.user._id}`);
  setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

        fetchError(`Error Registering User: ${error?.response?.data?.message || 'Something went wrong'}`);

      }

    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

      fetchError(error?.response?.data?.message || 'Something went wrong');
    }
  };

  // TODO: use fetch stat??? like other sing ins
  // SIGN UP WITH GOOGGLE: versin using fron end "auth"
  const signUpClientGoogle = async ({token, name, email,proposalId, googleId }) => {
    try {
      if (token) {
        const res = await jwtAxios.post(`/users/create-google`, {
          name,
          email,
          googleId,
          role: 'client',
        });
        localStorage.setItem('token', token.tokenId);
        setAuthToken(res.data.token);
        setJWTAuthData({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });

        try {
          await jwtAxios.patch(
            `business/proposal/update/${proposalId}`,
            {
              clientId: res.data.user._id,
            },
          );
          //  navigate(`/sent-project/${res.data.user._id}/${proposalId}`);
        } catch (updateError) {
          fetchError('Error assign client to proposal');
        }
      }
      //  navigate('/client-projects')
        // navigate(`/sent-project/${res.data.user._id}/${proposalId}`);
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });
      
      fetchError('Something went wrong');
    }
  };

  //  SIGN UP BUSINESS
  const signUpBusiness = async ({ name, email, password, industry }) => {
    try {
      // Register user
      const registerResponse = await jwtAxios.post('auth/register', {
        userName: name,
        email,
        password,
        role: 'admin',
       
      });
 

      // SET TOKEN AND AUTHENTICATE CLIENT (need to do before creating business)
      localStorage.setItem('token', registerResponse.data.token);
      setAuthToken(registerResponse.data.token);
      setJWTAuthData({
        user: registerResponse.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      try {
       await jwtAxios.post(`business/create`, {
         contactPerson: registerResponse.data.user._id,
         industry: industry,
         email: email,
         businessName: name,
       });

// GET AUTH USER to user new business ID associated w/user
 getAuthUser();

       
      } catch (updateError) {
        console.log(
          'Create Businsss Error:',
          updateError.response?.data?.error || 'Something went wrong',
        );
      }


      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

      fetchError(error?.response?.data?.message || 'Something went wrong');
    }
  };



  const signUpBusinessGoogle = async ({ name, email, password, industry, googleId }) => {
    try {
      // Register user
      const registerResponse = await jwtAxios.post(`/users/create-google`, {
        name: name,
        googleId,
        email,
        password,
        role: 'admin',
      });

      // SET TOKEN AND AUTHENTICATE CLIENT
      localStorage.setItem('token', registerResponse.data.token);
      setAuthToken(registerResponse.data.token);
      setJWTAuthData({
        user: registerResponse.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      try {
        await jwtAxios.post(`business/create`, {
          contactPerson: registerResponse.data.user._id,
          industry: industry,
          email: email,
          businessName: name,
        });
        // GET AUTH USER to user new business ID associated w/user
        getAuthUser();
      } catch (updateError) {
        console.log(
          'Create Businsss Error:',
          updateError.response?.data?.error || 'Something went wrong',
        );
      }

      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

    
      fetchError(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    document.cookie = ' token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
       
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

 

  // SERVER ERRRO
   serverError = async (error) => {

       dispatch({ type: FETCH_ERROR, payload: "Network Error: Unable to connect to server", });

       
    //    localStorage.removeItem('token');
    // document.cookie = ' token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
       
    // setAuthToken();
    // setJWTAuthData({
    //   user: null,
    //   isLoading: false,
    //   isAuthenticated: false,
    // });
    //  fetchError(error);

  };

  const signInNewTeamMember = async ({ email, password, id, userName }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post(`auth/register-team-member/${id}`, {
        email,
        password,
        userName,
      });

      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get(`/users/get/${data.user._id}`);

      setJWTAuthData({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthdata,
        isAuthenticated: false,
        isLoading: false,
      });

      fetchError(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...JWTAuthdata,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
          getAuthUser,
          signUpClient,
          signUpBusiness,
          signInNewTeamMember,
          signUpUserGoogle,
          signInUserGoogle,
          signUpUserGoogleBack,
          signUpClientGoogle,
          signUpBusinessGoogle,
          signUpUserRole

        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
export {serverError}
JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
