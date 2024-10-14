import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { Checkbox, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AppInfoView from '@crema/components/AppInfoView';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';

  import GoogleAuthSignUp from '../GoogleAuth/GoogleSignUp';

import { jwtDecode } from 'jwt-decode';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id="validation.emailFormat" />)
    .required(<IntlMessages id="validation.emailRequired" />),
  password: yup
    .string()
    .required(<IntlMessages id="validation.passwordRequired" />),
});



const SigninJwtAuth = () => {
  const navigate = useNavigate();
  const { signInUser, signUpUserGoogle, signUpUserGoogleBack, signInUserGoogle } =
    useAuthMethod();

    const [rememberMe, setRememberMe] = useState(false)
   const handleRemmberMe = ()=>{

    setRememberMe(checked => !checked)

   }


  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'jwtAuth' });
  };

  const { messages } = useIntl();

  const googleSuccess = async (res) => {
    try {
      signInUserGoogle(res, rememberMe)
    } catch (error) {
      console.log(error);
    }
  };


// TODO: NEEDED? 
  // GET COOKIE: cookie set from backend.  When page loads,
  // see if matching cookie exists and use it for user auth
  useEffect(() => {
    // Retrieve cookie
    const cookies = document.cookie.split(';');
    let foundCookie = '';
    for (let i = 0; i < cookies.length; i++) {
      const cookiePair = cookies[i].split('=');
      const cookieName = cookiePair[0].trim();
      if (cookieName === 'token') {
        foundCookie = jwtDecode(cookiePair[1]);
        signUpUserGoogleBack({ user: foundCookie, token: cookiePair[1] });
        break;
      }
    }
  }, []);



  
  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              // email: 'turboduck@gmail.com',
              // password: 'Throbbing1349!',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              signInUser({
                email: data.email,
                password: data.password,
                rememberMe: rememberMe
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={messages['common.email']}
                    name='email'
                    label={<IntlMessages id='common.email' />}
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    type='password'
                    placeholder={messages['common.password']}
                    label={<IntlMessages id='common.password' />}
                    name='password'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    // onChange={(e) => {
                    //   handleChange(e);

                    //   setPassword(e.target.value);
                    // }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox color='primary' sx={{ ml: -3 }}
                    checked={rememberMe}
                    onChange={handleRemmberMe} />
                    <Box
                      component='span'
                      sx={{
                        color: 'grey.500',
                      }}
                    >
                      <IntlMessages id='common.rememberMe' />
                    </Box>
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: Fonts.MEDIUM,
                      cursor: 'pointer',
                      display: 'block',
                      textAlign: 'right',
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    <IntlMessages id='common.forgetPassword' />
                  </Box>
                </Box>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 160,
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '4px 16px 8px',
                    }}
                  >
                    <IntlMessages id='common.login' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
        <GoogleAuthSignUp onSuccess={googleSuccess} signIn={true}/>
        <Box
          sx={{
            color: 'grey.500',
            marginTop: "10px"
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.dontHaveAccount' />
          </span>
          <Box
            component='span'
            sx={{
              fontWeight: Fonts.MEDIUM,
              '& a': {
                color: (theme) => theme.palette.primary.main,
                textDecoration: 'none',
              },
            }}
          >
            <Link to='/signup'>
              <IntlMessages id='common.signup' />
            </Link>
          </Box>
        </Box>
        {/* FETCH CONTEXT */}
      <AppInfoView type='context' />
         {/* <AppInfoView /> */}
       
      </Box>
    </AuthWrapper>
  );
};

export default SigninJwtAuth;
