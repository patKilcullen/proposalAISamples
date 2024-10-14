import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';

import CreateBusinessForm from './CreateBusinessForm';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import {
  onCreateBusiness,
  onGetBusinessInfo,
  onEditPartialBusiness,
  onUpdateUser,
  fetchError,
} from '../../../toolkit/actions';

import AppLoader from '@crema/components/AppLoader';
import CreateOrJoin from './CreateOrJoin';
import { HandymanTwoTone } from '@mui/icons-material';

// VALIDATION for form
const validationSchema = yup.object({
  businessEmail: yup.string().email('Invalid email format').required('Required'),
  businessUrl: yup.string().url('Invalid url format').required('Required'),
  businessServices: yup.string().required('Required'),
  businessAddress: yup.string().required('Required'),
  businessName: yup.string().required('Required'),
  businessOverview: yup.string().required('Required'),
  businessType: yup.string().required('Required'),
  businessIndustry: yup.string().required('Required'),
  businessRepName: yup.string().required('Required'),
  businessRepRole: yup.string().required('Required'),
  businessRepEmail: yup.string().email('Invalid email format').required('Required'),
});

const BusinessInfo = ({ onboardingForm, onboardingSave, setOnboardingSave }) => {
  const { user } = useAuthUser();
  const { getAuthUser } = useJWTAuthActions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business.singleBusiness);
  const { loading } = useSelector(({ common }) => common);

  //  GET BUSINESS INFO on mount if user has associated business ID
  useEffect(() => {
    if (user.businessId) {
      dispatch(onGetBusinessInfo(user.businessId._id))
    
    }
  }, [user.businessId, dispatch]);

  const [editMode, setEditMode] = useState(onboardingForm ? true : false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };



    // BUSINESS LOGO: if logo included, encode it before saving
  const [businessLogo, setBusinessLogo] = useState(null);
const [businessLogoEncoded, setBusinessLogoEncoded] = useState(null)
 
  useEffect(()=>{
    if(businessLogo?.length > 0){
handleFileChange(businessLogo)
    }
  },[businessLogo])

   const handleFileChange = (logo) => {
     const file = logo[0];
    if (file) {
      // Convert the file to a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessLogoEncoded(reader.result); // Set the base64 string
      };
      reader.readAsDataURL(file); // Read the file as a base64 string
    }
  };
  return (
    <Box
      sx={{
        position: 'relative',
        // maxWidth: 550,
        overflow: "auto"
      }}
    >
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        initialValues={{
          businessAddress: business?.address || '',
          businessEmail: '',
          businessName: business?.businessName,
          businessOverview: '',
          businessType: '',
          businessIndustry: '',
          customIndustry: null,
          businessServices: '',
          businessUrl: '',
          _id: user._id,
          businessRepName: '',
          businessRepRole: '',
          businessRepEmail: '',
          tin: ""

        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting, setFieldTouched, submitForm, setErrors }) => {
          setSubmitting(true);
         
          try {
            // if there is no businessID, then the form will be creating a business
            if (!user.businessId) {
              await dispatch(
                onCreateBusiness({
                  address: data.businessAddress,
                  businessContactPerson: data._id,
                  email: data.businessEmail,
                  businessName: data.businessName,
                  businessOverview: data.businessOverview,
                  businessType: data.businessType,
                  url: data.businessUrl,
                  industry: data.customIndustry ? data.customIndustry : data.businessIndustry,
                  businessServices: data.businessServices,
                  userId: data._id,
                  businessRepName: data.businessRepName,
                  businessRepRole: data.businessRepRole,
                  businessRepEmail: data.businessRepEmail,
                  tin: data.tin,
                })
              );

              // UPDATE USER TO BE ADMIN IF THEY CREATE A BUSINESS
              await dispatch(
                onUpdateUser({
                  ...user,
                  role: 'admin',
                })
              );

              // Dispatch successful, update user and scroll to the top
              getAuthUser();
              navigate('/business-onboarding');
              // set field values to touched to avoid validation errors when business is first created
              setFieldTouched('businessName', false, true);
              setFieldTouched('businessEmail', false, true);
              setFieldTouched('businessIndustry', false, true);
              setFieldTouched('businessOverview', false, true);
              setFieldTouched('businessServices', false, true);
              setFieldTouched('businessAddress', false, true);
              setFieldTouched('businessUrl', false, true);
              setFieldTouched('businessType', false, true);
              setFieldTouched('businessRepName', false, true);
              setFieldTouched('businessRepRole', false, true);
              setFieldTouched('businessRepEmail', false, true);
                 setFieldTouched('tin', false, true);
            } else {
              // If there is a businessID associated to user, edit business
        
              await dispatch(
                onEditPartialBusiness({
                  address: data.businessAddress,
                  businessContactPerson: data._id,
                  email: data.businessEmail,
                  businessName: data.businessName,
                  businessOverview: data.businessOverview,
                  businessType: data.businessType,
                  url: data.businessUrl,
                  industry: data.customIndustry ? data.customIndustry : data.businessIndustry,
                  businessServices: data.businessServices,
                  userId: data._id,
                  _id: user.businessId._id,
                  businessRepName: data.businessRepName,
                  businessRepRole: data.businessRepRole,
                  businessRepEmail: data.businessRepEmail,
                  logo: businessLogoEncoded || null,
                  tin: data.tin || null
                })
              );

              // Dispatch successful, update user and scroll to the top, turn edit mode off
              getAuthUser();
              window.scrollTo(0, 0);
              toggleEditMode();
            }

            if (onboardingSave) {
              submitForm();
            }
          } catch (error) {
            console.error('Error during onSubmit:', error);
            setErrors({ submitError: 'Submission failed. Please try again.' });
          } finally {
            // Ensure that setSubmitting is called regardless of success or failure
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, submitForm }) => {
          return !user.businessId ? (
            loading ? (
              <AppLoader />
            ) : (
              <CreateOrJoin values={values} setFieldValue={setFieldValue} />
            )
          ) : loading ? (
            <AppLoader />
          ) : (
            <CreateBusinessForm
              values={values}
              setFieldValue={setFieldValue}
              businessInfo={business}
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              onboardingForm={onboardingForm}
              onboardingSave={onboardingSave}
              submitForm={submitForm}
              setOnboardingSave={setOnboardingSave}
              setBusinessLogo={setBusinessLogo}
            />
          );
        }}
      </Formik>
          
    </Box>
  );
};

export default BusinessInfo;

BusinessInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
