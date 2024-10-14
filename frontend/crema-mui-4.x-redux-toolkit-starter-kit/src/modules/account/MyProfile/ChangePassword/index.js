import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { Box, Typography } from '@mui/material';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Fonts } from '@crema/constants/AppEnums';
import ChangePasswordForm from './ChangePasswordForm';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuthUser } from '@crema/hooks/AuthHooks';

import AppInfoView from '@crema/components/AppInfoView';
import {resetPassword,  changePassword} from '../../../../toolkit/actions'

import ChangePasswordRequest from './ChangePasswordRequest'
const validationSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
 const { user } = useAuthUser();
  const {id, token} = useParams()
const dispatch = useDispatch()
const [showError, setShowError] = useState(null)
  useEffect(()=>{
dispatch(resetPassword({userId: id, token})).then((res)=>{

    if (res.status !== 200) {

      setShowError(`Something went wrong: ${res}`);
    }
});

  }, [])




  return (showError ? (
    <Box>
     <Box sx={{color: "red"}}>{showError}</Box>
    <ChangePasswordRequest message={"Resend Password Reset Link"}/>
    </Box>
  ):(
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 5 },
        }}
      >
        <IntlMessages id="common.changePassword" />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          newPassword: null,
          retypeNewPassword: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          try{
          dispatch(changePassword({userId: id, password: data.newPassword}))
         
          }catch(error){
            console.error(error)
          }
          setSubmitting(false);
        }}
      >
        {() => <ChangePasswordForm />}
      </Formik>
      <AppInfoView />
    </Box>
  )
  );
  
};

export default ChangePassword;
