import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Button, TextField } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AppInfoView from '@crema/components/AppInfoView';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { useAuthMethod, useAuthUser } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import { Link } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';

import GoogleAuthSignUp from '../GoogleAuth/GoogleSignUp';
import PasswordChecklist from 'react-password-checklist';

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id="validation.nameRequired" />),
  email: yup
    .string()
    .email(<IntlMessages id="validation.emailFormat" />)
    .required(<IntlMessages id="validation.emailRequired" />),
  password: yup
    .string()
    .required(<IntlMessages id="validation.passwordRequired" />),
});

const SignupJwtAuth = () => {
  const { signUpClient, signUpClientGoogle, signUpUserRole } = useAuthMethod();
const navigate = useNavigate()
  const { pid, role, token } = useParams();
 const { user } = useAuthUser();
 const [agreeToTermsAndPolicy, setAgreeToTermsAndPolicy] = useState(false);

  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);

//  If user is logged in, navigate to accept proposal page
 useEffect(()=>{

if(user){
navigate(`/accept-proposal/${role}/${pid}/${token}`)
}
 },[])


  // google auth success:
  const googleSuccess = (res) => {
try{
    signUpClientGoogle({
      token: res.tokenId,
      email: res.profileObj.email,
      name: res.profileObj.name,
      googleId: res.profileObj.googleId,
      proposalId: pid,
    });
  }catch(error){
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
              signUpUserRole({
                email: data.email,
                password: data.password,
                name: data.name,
                proposalId: pid,
                role: role,
                businessId: null,
                token: token
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, values, setFieldValue, handleChange }) => (
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
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: { xs: 2, md: 3 },
                    }}
                  ></Box>
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
                  <Box sx={{ margin: 0 }}>&</Box>
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