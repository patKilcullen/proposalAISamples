import React, { useEffect } from 'react';

import PersonalInfoForm from '../../../account/MyProfile/PersonalInfo';

const UserProfileSetup = (
  { onboardingSave, setOnboardingSave, handleNext },
  ref,
) => {
  useEffect(() => {
    if (onboardingSave === true) {
      handleNext();
    }
    setOnboardingSave(false);
  }, [onboardingSave]);

  return <PersonalInfoForm onboarding={true} setOnboardingSave={setOnboardingSave}/>;
};


export default UserProfileSetup;
