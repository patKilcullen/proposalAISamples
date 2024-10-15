import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Checkbox, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AppInfoView from '@crema/components/AppInfoView';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';

import PasswordChecklist from 'react-password-checklist';

import GoogleAuthSignUp from '../GoogleAuth/GoogleSignUp';

// VALIDATION FOR FORM
const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SignupJwtAuth = () => {
  const { signUpUser, signUpUserGoogle } = useAuthMethod();
  const [agreeToTermsAndPolicy, setAgreeToTermsAndPolicy] = useState(false);
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);


  // on google success
  const googleSuccess = async (res) => {
    try {
      signUpUserGoogle(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);

              // setPassword(data.password);

              signUpUser({
                email: data.email,
                password: data.password,
                name: data.name,
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, handleChange }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <AppTextField
                    label={<IntlMessages id='common.name' />}
                    name='name'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <AppTextField
                    label={<IntlMessages id='common.email' />}
                    name='email'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <TextField
                    label={<IntlMessages id='common.password' />}
                    name='password'
                    type='password'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    onChange={(e) => {
                      handleChange(e);
                      setShowErrors(true);
                      setPassword(e.target.value);
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <TextField
                    label={'Confirm Password'}
                    name='password'
                    type='password'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    onChange={(e) => {
                      handleChange(e);
                      setConfrimPassword(e.target.value);
                    }}
                  />
                  <Box sx={{ height: '100px' }}>
                    {showErrors && (
                      <PasswordChecklist
                        rules={[
                          'minLength',
                          'specialChar',
                          'number',
                          'capital',
                          'match',
                        ]}
                        minLength={8}
                        value={password}
                        valueAgain={confrimPassword}
                        sx={{ height: '50px' }}
                        // onChange={() => {}}
                      />
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '0px',
                    marginLeft: '10px',
                    marginRight: '-10px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      sx={{
                        ml: -6,
                      }}
                      onChange={() =>
                        setAgreeToTermsAndPolicy(!agreeToTermsAndPolicy)
                      }
                    />
                    <Box
                      component='span'
                      sx={{
                        mr: 1,
                        ml: -2,
                        color: 'grey.500',
                        fontSize: '11px',
                      }}
                    >
                      {/* <IntlMessages id='common.iAgreeTo' /> */}
                      Agree to:
                    </Box>
                  </Box>
                  <Link
                    to='https://www.mixcommerce.co/privacy-policy/'
                    target='_blank'
                  >
                    <Button
                      component='span'
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        cursor: 'pointer',
                        marginLeft: '-10px',
                        marginRight: '-10px',
                        fontSize: '13px',
                      }}
                    >
                      <IntlMessages id='Privacy Policy' />
                    </Button>
                  </Link>
                  <Box sx={{ margin: '1px' }}>&</Box>
                  <Link
                    to='https://www.mixcommerce.co/terms-of-service/'
                    target='_blank'
                  >
                    <Button
                      component='span'
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        cursor: 'pointer',
                        marginLeft: '-10px',
                        marginRight: 0,
                        fontSize: '13px',
                      }}
                    >
                      <IntlMessages id='common.termConditions' />
                    </Button>
                  </Link>
                </Box>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={
                      isSubmitting ||
                      password === '' ||
                      password !== confrimPassword ||
                      !agreeToTermsAndPolicy
                    }
                    sx={{
                      minWidth: 160,
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '4px 16px 8px',
                    }}
                    type='submit'
                  >
                    <IntlMessages id='common.signup' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
        <GoogleAuthSignUp
          onSuccess={googleSuccess}
          disabled={!agreeToTermsAndPolicy}
        />
        <Box
          sx={{
            color: 'grey.500',
            marginTop: '10px',
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.alreadyHaveAccount' />
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
            <Link to='/signIn'>
              <IntlMessages id='common.signIn' />
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

export default SignupJwtAuth;
