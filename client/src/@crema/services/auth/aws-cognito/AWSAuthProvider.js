import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Auth from '@aws-amplify/auth';
import PropTypes from 'prop-types';
import { awsConfig } from './aws-exports';
import { useNavigate } from 'react-router-dom';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from '../../../../toolkit/actions';

const AwsCognitoContext = createContext();
const AwsCognitoActionsContext = createContext();

export const useAwsCognito = () => useContext(AwsCognitoContext);

export const useAwsCognitoActions = () => useContext(AwsCognitoActionsContext);

const AwsAuthProvider = ({ children }) => {
  const [awsCognitoData, setAwsCognitoData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const navigate = useNavigate();

  const auth = useMemo(() => {
    Auth.configure(awsConfig);
    return Auth;
  }, []);

  useEffect(() => {
    fetchStart();
    auth
      .currentAuthenticatedUser()
      .then((user) => {
        setAwsCognitoData({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        fetchSuccess();
      })
      .catch(() => {
        fetchSuccess();
        setAwsCognitoData({
          user: undefined,
          isAuthenticated: false,
          isLoading: false,
        });
      });
  }, [auth]);

  const signIn = async ({ email, password }) => {
    fetchStart();
    try {
      const user = await Auth.signIn(email, password);
      fetchSuccess();
      setAwsCognitoData({
        user: user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };
  const signUpCognitoUser = async ({ email, password, name }) => {
    fetchStart();
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
        },
      });
      fetchSuccess();
      showMessage(
        'A code has been sent to your registered email address, Enter the code to complete the signup process!',
      );
      navigate('/confirm-signup', { state: email });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };
  const confirmCognitoUserSignup = async (username, code) => {
    fetchStart();
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,
      });
      navigate('/signin', {
        replace: true,
      });
      showMessage(
        'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
      );
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };
  const forgotPassword = async (username, code) => {
    fetchStart();
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,
      });
      navigate('/signin', {
        replace: true,
      });
      showMessage(
        'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
      );
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };

  const logout = async () => {
    setAwsCognitoData({ ...awsCognitoData, isLoading: true });
    try {
      await auth.signOut();
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AwsCognitoContext.Provider
      value={{
        ...awsCognitoData,
        auth,
      }}
    >
      <AwsCognitoActionsContext.Provider
        value={{
          logout,
          signIn,
          signUpCognitoUser,
          confirmCognitoUserSignup,
          forgotPassword,
        }}
      >
        {children}
      </AwsCognitoActionsContext.Provider>
    </AwsCognitoContext.Provider>
  );
};

export default AwsAuthProvider;

AwsAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  showMessage: PropTypes.func,
  fetchStart: PropTypes.func,
  fetchSuccess: PropTypes.func,
  fetchError: PropTypes.func,
};
