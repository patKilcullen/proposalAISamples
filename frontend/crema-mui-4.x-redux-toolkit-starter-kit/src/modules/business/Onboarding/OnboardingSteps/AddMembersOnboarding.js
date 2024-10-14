import React, {useEffect} from 'react'

import AddTeamMembers from '../../../teamManagement/AddTeamMembersPage'
 import AppInfoView from '@crema/components/AppInfoView';
const AddMembersOnboarding = ({
  onboardingSave,
  setOnboardingSave,
  businessInfo,
  handleNext,
  setFormError,
  setFormErrors,
}) => {



      useEffect(() => {
        if (onboardingSave === true) {
        //   if (formikRef.current.isValid) {
        //     formikRef.current.submitForm();
            handleNext();
        //     setFormError(false);
        //   } else {
        //     setFormError(true);
        //   }
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

export default AddMembersOnboarding