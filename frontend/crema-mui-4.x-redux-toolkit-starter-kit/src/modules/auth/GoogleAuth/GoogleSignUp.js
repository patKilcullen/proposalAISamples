import React, { useEffect } from 'react';
 import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const GoogleAuthSignUp = ({ onSuccess, disabled, signIn }) => {


// Configure google auth
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        client_id: clientId,
        scope: 'profile email',
        ux_mode: 'popup',
        redirect_uri: 'http://localhost:4000/',
        prompt: 'select_account_consent',
      });
    };
    gapi.load('client:auth2', start);
  }, []);

// google auth failure
  const onFailure = () => {
    console.log('FAILURE: Google sign in failed');
  };

  return (
   
    <GoogleLogin
      //  ref={googleLoginRef}
      clientId={clientId}
      buttonText={signIn ? "Sign in with Google" :'Sign up with Google'}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy='single_host_origin'
      // isSignedIn={true}
      disabled={disabled}
    />
  );
};

export default GoogleAuthSignUp;
