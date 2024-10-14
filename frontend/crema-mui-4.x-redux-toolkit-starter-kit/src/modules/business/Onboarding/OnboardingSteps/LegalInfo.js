import React, {
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import AppCard from '@crema/components/AppCard';
import AppAnimate from '@crema/components/AppAnimate';
import { Box, Select, MenuItem } from '@mui/material';
import AppLoader from '@crema/components/AppLoader';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { onEditPartialBusiness } from '../../../../toolkit/actions';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppComponentHeader from '@crema/components/AppComponentHeader';

const validationSchema = yup.object({
  tin: yup.string().required('Required'),
  // legalStructure: yup.string().required('Required'),
});

// TODO: all of the TODOs in this step can be applied to other steps that use info not currently in database model
const LegalInfo = (
  { onboardingSave, setOnboardingSave, businessInfo, handleNext, setFormError },
  ref,
) => {
  const formikRef = useRef();
  const business = useSelector(({ business }) => business.singleBusiness);
const { hideMessage } = useSelector(({ common }) => common);
  // TODO: check to make sure valuse not already included in business before sett(as in previous steps)
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setErrors({
        tin: 'Required',
        legalStructure: 'Required',
        additionalLegalRequirements: 'Required',
      });
    }
  }, []);

  // SUBMIT FORM: when onbordingSave is true, from parent,
  // when if current value of form is valid then submit it
  useEffect(() => {
    if (onboardingSave === true) {
      if (formikRef.current.isValid) {
        formikRef.current.submitForm();
        handleNext();
        setFormError(false);
      } else {
        setFormError(true);;
      }
    }
    setOnboardingSave(false);
  }, [onboardingSave]);

  const { loading } = useSelector(({ common }) => common);


  // TODO: add update dispatch when info is added to database
  const onEditBusiness = async (
    values,
    { setSubmitting, submitForm, setFieldValue },
  ) => {
    setSubmitting(true);

    // try {
    //   await dispatch(
    //     onEditPartialBusiness({
    //       // Include the necessary fields for onEditPartialBusiness
    //       email: values.businessEmail,
    //       businessName: businessInfo.businessName,
    //       userId: user._id,
    //       _id: user.businessId,
    //     }),
    //   );
      // hideMessage();
    // } catch (error) {
    //   console.error('Error during onSubmit:', error);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <div>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <AppComponentHeader
            title='Legal Information'
            description="enter your business' legal information..."
          />
          <Formik
            validateOnBlur={true}
            validateOnChange={true}
            // TODO: check for existing values in business once these values are added to Database
            initialValues={{
              tin: null,
              legalStructure: null,
              additionalLegalRequirements: null,
            }}
            validationSchema={validationSchema}
            onSubmit={onEditBusiness}
            innerRef={formikRef}
          >
            <AppAnimate animation='transition.slideUpIn'>
              <Form noValidate autoComplete='off'>
                <AppCard>
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Tax Identification Number(TIN)
                  </Box>
                  <AppTextField
                    name='tin'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='tax id'
                  />

                
      
                 
                </AppCard>
              </Form>
            </AppAnimate>
          </Formik>
        </>
      )}
    </div>
  );
};
// );

export default LegalInfo;
