import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import PersonalInfoForm from './PersonalInfoForm';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { onUpdateUser, fetchError } from '../../../../toolkit/actions';



import AppInfoView from '@crema/components/AppInfoView';


const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
  userName: yup.string().required('User Name Required'),
});
const PersonalInfo = ({onboarding,setOnboardingSave}) => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
 
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          photoURL: user?.profileURL
            ? user.profileURL
            : '/assets/images/placeholder.jpg',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // UPDATE USER
          try {
            dispatch(
              onUpdateUser({
                userName: data.userName || ' ',
                mobile: data.mobile || ' ',
                address: data.address || ' ',

                profileUrl: data.photoURL || ' ',
                _id: user._id,
              }),
            )
            // in in onboarding, move to next section on save
            if(onboarding){
setOnboardingSave(true)            }
          } catch (error) {

            console.error('Error during onSubmit:', error);
            dispatch(fetchError('Error during onSubmit:', error))
          }

          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
          );
        }}
      </Formik>
      <AppInfoView />
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
