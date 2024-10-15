import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import AppCard from '@crema/components/AppCard';
import AppAnimate from '@crema/components/AppAnimate';
import { Box, Select, MenuItem, Button } from '@mui/material';
import AppLoader from '@crema/components/AppLoader';
import TemplatePreview from './TemplateSamples/TemplatePreview';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import proposalStyles from './TemplateSamples/ProposalStyles';
import agreementStyles from './TemplateSamples/AgreementStyles';
const validationSchema = yup.object({
  proposalTemplate: yup.string().required('Required'),
  agreementTemplate: yup.string().required('Required'),
});

const PersonalizedTemplates = (
  { onboardingSave, setOnboardingSave, businessInfo, handleNext, setFormError },
  ref,
) => {
  const formikRef = useRef();
  const { loading, hideMessage } = useSelector(({ common }) => common);
  const [selectedProposal, setSelectedProposal] = useState('');
  const [selectedAgreement, setSelectedAgreement] = useState('');
  const [askToPreviewProposal, setAskToPreviewProposal] = useState(false);
  const [askToPreviewAgreement, setAskToPreviewAgreement] = useState(false);
  const [previewAgreement, setPreviewAgreement] = useState(false);
  const [previewProposal, setPreviewProposal] = useState(false);

  // sset errors
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setErrors({
        proposalTemplate: 'Required',
        agreementTemplate: 'Required',
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
        setFormError(true);
      }
    }
    setOnboardingSave(false);
  }, [onboardingSave]);

  // SELECT/PREVIEW Proposals and agreements, if pros=posal/agreement is selected, show preview button, if button is pressed, show preview
  const handleSelectProposal = (style) => {
    setSelectedProposal(style);
    setAskToPreviewProposal(true);
  };
  const handleSelectAgreement = (style) => {
    setSelectedAgreement(style);
    setAskToPreviewAgreement(true);
  };

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
            title='Personalized Templates'
            description='choose proposal and agreement templates based on your industry and preferences...'
          />
          <Formik
            validateOnBlur={true}
            validateOnChange={true}
            initialValues={{
              proposalTemplate: null,
              agreementTemplate: null,
            }}
            validationSchema={validationSchema}
            onSubmit={onEditBusiness}
            innerRef={formikRef}
          >
            <AppAnimate animation='transition.slideUpIn'>
              <Form noValidate autoComplete='off'>
                <AppCard>
                  {/* If proposal is selected, show preview button */}
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Recommended Proposal Styles:
                    {askToPreviewProposal ? (
                      <Button onClick={() => setPreviewProposal(true)}>
                        preview
                      </Button>
                    ) : null}
                  </Box>
                  <Select
                    name='proposalTemplate'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    defaultValue={businessInfo ? businessInfo.businessType : ''}
                    onChange={(e) => {
                      formikRef.current.setFieldValue(
                        'proposalTemplate',
                        e.target.value.type,
                      );
                      handleSelectProposal(e.target.value);
                    }}
                  >
                    {proposalStyles?.map((style, index) => (
                      <MenuItem key={index} value={style}>
                        {style.type}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* If agreement is selected, show preview button */}
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Recommended Agrement Styles:{' '}
                    {askToPreviewAgreement ? (
                      <Button onClick={() => setPreviewAgreement(true)}>
                        preview
                      </Button>
                    ) : null}
                  </Box>
                  <Select
                    name='agreementTemplate'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    onChange={(e) => {
                      formikRef.current.setFieldValue(
                        'agreementTemplate',
                        e.target.value.type,
                      );
                      handleSelectAgreement(e.target.value);
                    }}
                  >
                    {agreementStyles?.map((style, index) => (
                      <MenuItem key={index} value={style}>
                        {style.type}
                      </MenuItem>
                    ))}
                  </Select>
                </AppCard>
              </Form>
            </AppAnimate>
          </Formik>
        </>
      )}
      {previewAgreement ? (
        <TemplatePreview
          previewTemplate={previewAgreement}
          selectedTemplate={selectedAgreement}
          setPreviewTemplate={setPreviewAgreement}
        />
      ) : (
        <TemplatePreview
          previewTemplate={previewProposal}
          selectedTemplate={selectedProposal}
          setPreviewTemplate={setPreviewProposal}
        />
      )}
    </div>
  );
};
// );

export default PersonalizedTemplates;
