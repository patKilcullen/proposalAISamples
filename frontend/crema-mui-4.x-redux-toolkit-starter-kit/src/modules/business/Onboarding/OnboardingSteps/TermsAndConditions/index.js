import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik, Form } from 'formik';
import AppAnimate from '@crema/components/AppAnimate';
import { Box, Checkbox,Button } from '@mui/material';
import { onEditPartialBusiness, onUpdateUser } from '../../../../../toolkit/actions';
import IntlMessages from '@crema/helpers/IntlMessages';
import TermsAndConditions from './termsAndConditions';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';

const AgreementTermsConditions = (
  { onboardingSave, setOnboardingSave, handleNext },
  ref,
) => {
  const formikRef = useRef();
  const { user } = useAuthUser();
  const { getAuthUser } = useJWTAuthActions();
  const dispatch = useDispatch();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [previewTerms, setPreviewTerms] = useState(false);

  // SUBMIT FORM: when onbordingSave is true, from parent,
  // when if current value of form is valid then submit it
  useEffect(() => {
    if (onboardingSave === true) {
      if (agreeToTerms) {
        formikRef.current.submitForm();
        handleNext();
      } else {
        setAgreeError(true);
      }
    }
    setOnboardingSave(false);
  }, [onboardingSave]);

  const onEditBusiness = async (
    values,
    { setSubmitting, submitForm, setFieldValue },
  ) => {
    setSubmitting(true);
    try {
      await dispatch(
        onEditPartialBusiness({
          signedTerms: true,
          userId: user._id,
          _id: user.businessId._id,
        }),
      );
      //  getAuthUser to use the authenitcation user, which now haw business with agrred to terms, which enables what pages user can see
      getAuthUser();
    } catch (error) {
      console.error('Error during onSubmit:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowTerms = () => {
    setPreviewTerms(true);
  };
  return (
    <>
      <AppComponentHeader
        title='Terms & Conditions'
        description="accept ProposalAI's terms and conditions..."
      />
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        initialValues={{
          signedTerms: false,
        }}
        onSubmit={onEditBusiness}
        innerRef={formikRef}
      >
        <AppAnimate animation='transition.slideUpIn'>
          <Form noValidate autoComplete='off'>
            <Box component='span'
              sx={{
                color: (theme) => theme.palette.primary.main,
                cursor: 'pointer',
                display: "flex",
                alignItems: "center"
              }}>
            <Checkbox
              sx={{
                ml: -3,
              }}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <Box
              component='span'
              sx={{
                mr: 2,
                color: 'grey.500',
              }}
            >
              <IntlMessages id='common.iAgreeTo' />
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
          </Form>
          {agreeError ? (
            <Box
              component='span'
              sx={{
                mr: 2,
                color: 'red',
              }}
            >
              <IntlMessages id='Please agree to terms and conditions...' />
            </Box>
          ) : null}
          <TermsAndConditions
            previewTerms={previewTerms}
            setPreviewTerms={setPreviewTerms}
          />
        </AppAnimate>
      </Formik>
    </>
  );
};

export default AgreementTermsConditions;
