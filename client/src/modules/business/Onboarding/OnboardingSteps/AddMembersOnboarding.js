import React, { useEffect } from 'react';

import AddTeamMembers from '../../../teamManagement/AddTeamMembersPage';
import AppInfoView from '@crema/components/AppInfoView';
const AddMembersOnboarding = ({
  onboardingSave,
  setOnboardingSave,
  handleNext,
}) => {
  
  // NEXT ONBOARDING
  useEffect(() => {
    if (onboardingSave === true) {
      handleNext();
    }
    setOnboardingSave(false);
  }, [onboardingSave]);
  return (
    <>
      <AddTeamMembers />
      <AppInfoView />
    </>
  );
};

export default AddMembersOnboarding;
