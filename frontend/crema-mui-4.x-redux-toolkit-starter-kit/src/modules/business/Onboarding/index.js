import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AppsContainer from '@crema/components/AppsContainer';
import OnboardingSideBar from './OnboardingSideBar';
import OnboardingContent from './OnboardingContent';
import { fetchError, onGetBusinessInfo } from '../../../toolkit/actions';

 import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';

 import AppInfoView from '@crema/components/AppInfoView';

const steps = [
   { label: 'User Profile Setup', description: 'User Profile Setup' },
  { label: 'Business Profile Setup', description: 'Business Profile Setup' },
  // { label: 'Add Team Members', description: 'Add Team Members' },
  // { label: 'Legal Information', description: 'Legal Information' },
  // { label: 'Document Preferences', description: 'Document Preferences' },
  // { label: 'Personalized Template', description: 'Personalized Template' },
  // {
  //   label: 'Agreement Terms and Conditions',
  //   description: 'Agreement Terms and Conditions',
  // },
  { label: 'Dashboard Tour', description: 'Dashboard Tour' },
  // { label: 'Confirmation & Welcome', description: 'Confirmation & Welcome' },
];

const OnboardingIndex = () => {
  const { user } = useAuthUser();
  
    const { getAuthUser } = useJWTAuthActions();
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business.singleBusiness);
  
  const [onboardingStep, setOnbaordingStep] = useState(0);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  //  ACTIVE STEP for when onboarding complete is false and true
  const [activeStep, setActiveStep] = useState(0);
  const [onboardingCompleteStep, setOnboardingCompleteStep] = useState(0);
  // FILTERED STEPS: steps passed on to component, filtered when onbaording is complete(terms signed)
  const filteredSteps = onboardingComplete ? steps.slice(2) : steps;

  // GET BUSINESS... get business so it can be accessible in all children/Steps
  // ensure it has a businessId first ( uthUser in signUpBusiness is delaye)
  useEffect(() => {
  if(user.businessId){
   try{
dispatch(onGetBusinessInfo(user?.businessId?._id));

   }catch(error){
    fetchError(error)
   }
    
  }
  }, [user.businessId]);

  // When user agree to terms(name in databsae should be changed), set onboarding complete
  // and handleReset, set stepper to 0. This keeps user from navigating to previous onboarding stepper steps
  useEffect(() => {
          if (business.onboardingComplete) {
      setOnboardingComplete(true);
    }
  }, [business]);

  // HANDLE NEXT/HANDLE BACK changed step, or onboarding step form after terms are accepted and stepper changes
  const handleNext = () => {
    if (onboardingComplete) {
      setOnboardingCompleteStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (onboardingComplete) {
      setOnboardingCompleteStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // HANDLE RESET: sets stepper to beginning
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <AppsContainer
      sidebarContent={
        <OnboardingSideBar
          onboardingStep={onboardingStep}
          setOnbaordingStep={setOnbaordingStep}
          activeStep={onboardingComplete ? onboardingCompleteStep : activeStep}
          setActiveStep={setActiveStep}
          steps={filteredSteps}
        />
      }
    >
      <OnboardingContent
        onboardingStep={onboardingStep}
        setOnbaordingStep={setOnbaordingStep}
        activeStep={onboardingComplete ? onboardingCompleteStep : activeStep}
        setActiveStep={setActiveStep}
        steps={filteredSteps}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}

      />
         <AppInfoView />
    </AppsContainer>
  );
};

export default OnboardingIndex;
