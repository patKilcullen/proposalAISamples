import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';


import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

import { onSendSupportMessage } from 'toolkit/actions';

import AppLoader from '@crema/components/AppLoader';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';

import AppTextField from '@crema/components/AppFormComponents/AppTextField';
const validationSchema = yup.object({
  message: yup.string().required('Required'),
   subject: yup.string().required('Required'),
});
// NEED CREATE PROPOSAL ANYMORE??????
const ContactSupport = () => {
  const { user } = useAuthUser();
  const { loading } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  return (loading ? <AppLoader message={"sending support message"}/>
   : <Box>
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        initialValues={{
          message: '',
          subject: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
      
          try {
        
            dispatch(
                onSendSupportMessage({
                message: data.message,
                subject: data.subject
              }),
            )
            
          } catch (error) {
            console.log('ERROR IN FIND PROPOSAL');
          }
        }}
      >
        {({ setFieldValue, handleSubmit, isSubmitting, errors, touched }) => {
  const isFormValid = 
    !errors.subject && touched.subject &&
    !errors.message && touched.message;

  return (
    <AppCard title="Send support a message">
      <Box component='p' sx={{ fontSize: 16 }}>
        Subject
      </Box>
      <AppTextField
        name="subject"
        variant='outlined'
        sx={{ width: '100%', my: 2 }}
        placeholder='subject'
        onChange={(e) => setFieldValue('subject', e.target.value)}
        onBlur={(e) => setFieldValue('subject', e.target.value)}
      />

      <Box component='p' sx={{ fontSize: 16 }}>
        Message
      </Box>
      <AppTextField
        multiline
        name="message"
        variant='outlined'
        rows={20}
        sx={{ width: '100%', my: 2 }}
        placeholder='message'
        onChange={(e) => setFieldValue('message', e.target.value)}
        onBlur={(e) => setFieldValue('message', e.target.value)}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid} 
        >
          Send
        </Button>
      </Box>
    </AppCard>
  );
}}

    
      </Formik>
      <AppInfoView />
    </Box>
  );
};

export default ContactSupport;

ContactSupport.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
