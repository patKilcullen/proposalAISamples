import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppCard from '@crema/components/AppCard';
import { Button, Box } from '@mui/material';

import {
  UserProfileSetup,
  BusinessSetup,
  DashboardTour,
} from './OnboardingSteps';

import {
  fetchError,
  onEditPartialBusiness,
  onUpdateUser,
} from '../../../toolkit/actions';
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { useAuthUser } from '@crema/hooks/AuthHooks';
const OnboardingContent = ({
  steps,
  handleNext,
  handleBack,
  activeStep,
  handleReset,
  setActiveStep,
}) => {
  const { user } = useAuthUser();
  const { getAuthUser } = useJWTAuthActions();
  const business = useSelector(({ business }) => business.singleBusiness);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [onboardingSave, setOnboardingSave] = useState(false);
  const [formError, setFormError] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  //ONBAORDING SAVE..  saves the form information from the onboarding step and moved onto next step
  const handleOnboardingSave = () => {
    setOnboardingSave(true);
  };

  // When user agree to terms(name in databsae should be changed), set onboarding complete
  // and handleReset, set stepper to 0. This keeps user from navigating to previous onboarding stepper steps
  useEffect(() => {
    if (business.onboardingComplete) {
      setOnboardingComplete(true);
      handleReset();
    }
  }, [business]);

  const handleFinishOnboarding = async () => {
    try {
      // Update business onboarding complete to ture
      await dispatch(
        onEditPartialBusiness({
          onboardingComplete: true,
          _id: user.businessId._id,
        }),
      );

      // Update user role to admin
      await dispatch(
        onUpdateUser({
          ...user,
          role: 'admin',
        }),
      );

      //  getAuthUser to use the authenitcation user, which now haw business with agrred to terms, which enables what pages user can see
      getAuthUser();
      // navigate('/dashboard');
      navigate('/create-project');
    } catch (error) {
      console.error('Error during onSubmit:', error);
      fetchError(error);
    }
  };

  const onboardingComponents = [
    <UserProfileSetup
      key={'UserProfileSetup'}
      onboardingSave={onboardingSave}
      setOnboardingSave={setOnboardingSave}
      handleNext={handleNext}
      setFormError={setFormError}
      // setFormErrors={setFormErrors}
    />,

    <BusinessSetup
      key={'BusinessSetup'}
      onboardingSave={onboardingSave}
      setOnboardingSave={setOnboardingSave}
      handleNext={handleNext}
      setFormError={setFormError}
      setActiveStep={setActiveStep}
    />,
    <DashboardTour
      key={'DashboardTour'}
      onboardingSave={onboardingSave}
      setOnboardingSave={setOnboardingSave}
      handleNext={handleNext}
    />,
    // POTENTIAL OTHER STEPS
    // <AddMembersOnboarding
    // key={"AddMembersOnboarding"}
    //   onboardingSave={onboardingSave}
    //   setOnboardingSave={setOnboardingSave}
    //   handleNext={handleNext}
    //   setFormError={setFormError}
    //   setFormErrors={setFormErrors}
    // />,
    // <IndustrySelection
    //   onboardingSave={onboardingSave}
    //   handleNext={handleNext}
    //   setOnboardingSave={setOnboardingSave}
    //   setFormError={setFormError}
    // />,
    // <LegalInfo
    //   onboardingSave={onboardingSave}
    //   setOnboardingSave={setOnboardingSave}
    //   handleNext={handleNext}
    //   setFormError={setFormError}
    // />,
    // <DocumentPreference
    //   onboardingSave={onboardingSave}
    //   setOnboardingSave={setOnboardingSave}
    //   handleNext={handleNext}
    //   setFormError={setFormError}
    // />,
    // <PersonalizedTemplate
    //   onboardingSave={onboardingSave}
    //   setOnboardingSave={setOnboardingSave}
    //   handleNext={handleNext}
    //   setFormError={setFormError}
    // />,
    // <AgreementTermsConditions
    // key={"AgreementTermsConditions"}
    //   onboardingSave={onboardingSave}
    //   setOnboardingSave={setOnboardingSave}
    //   handleNext={handleNext}
    //   setFormError={setFormError}
    // />,
    // <ConfirmationWelcome
    //   onboardingSave={onboardingSave}
    //   setOnboardingSave={setOnboardingSave}
    //   handleNext={handleNext}
    // />,
  ];

  const filteredComponents = onboardingComplete
    ? onboardingComponents.slice(2)
    : onboardingComponents;

  return (
    <Box sx={{ overflow: 'scroll' }}>
      {/* RENDER CORRECT COMPONENT based one step number */}
      <AppCard>{filteredComponents[activeStep]}</AppCard>
      <Box>
        <AppCard>
        {/* ERROR MESSAGE */}
          {formError ? (
            <>
              <Box sx={{ mb: 2, color: 'red' }}>
                Please ensure the form is filled out correctly...
              </Box>
            </>
          ) : null}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
            {/* NEXT BUTTON: if last step, finsih button that navigate to add team members */}
            <Button
              variant='contained'
              onClick={
                activeStep === steps.length - 1
                  ? () => {
                      handleFinishOnboarding();
                    }
                  : () => {
                      handleOnboardingSave();
                    }
              }
              sx={{ mt: 1, mr: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            {/* </div> */}
          </Box>
        </AppCard>
      </Box>
    </Box>
  );
};

export default OnboardingContent;
