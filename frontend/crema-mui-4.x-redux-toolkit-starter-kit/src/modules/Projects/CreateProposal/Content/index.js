import React from 'react';
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';

import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';

// COMPONENTS
import GenerateProposal from './GenerateProposal';
import EditProposalTemplate from './EditProposal/EditProposalTemplate';
// import PleaseCreateBusiness from '../../../business/BusinessInfo/PleaseCreateBusiness';

import { useAuthUser } from '@crema/hooks/AuthHooks';

import PleaseCreateBusiness from 'modules/errorPages/PleaseCreateBusiness';

import { Box } from '@mui/material';

const ProposalContent = ({
  content,
  setProposalVersion,
  setUploadedFiles,
  sendToClient,
  setFieldValue,
  selectedProposal,
  businessInfo,
  validationError,
  handleSendProposalRevision,
  handleSendUpdateCurrentVersion,
  formikRef,
  setFormSection,
  changeForm,
  checkFormErrors,
  setChangeForm,
  validationErrorList,
  setSendToClient,
}) => {
  const { loading } = useSelector(({ common }) => common);
  const business = useSelector(({ business }) => business.singleBusiness);
  // Get message from state to display while laoding(display genreating proposal message)
  const { message } = useSelector(({ common }) => common);

  const { user } = useAuthUser();

  return loading ? (
    <AppLoader message={message} />
  ) : // if content(proposal) exists, display edit proposal component, else display create proposal component
  content ? (
    <EditProposalTemplate
      proposal={content}
      setProposalVersion={setProposalVersion}
      setUploadedFiles={setUploadedFiles}
      sendToClient={sendToClient}
      selectedProposal={selectedProposal}
      handleSendProposalRevision={handleSendProposalRevision}
      handleSendUpdateCurrentVersion={handleSendUpdateCurrentVersion}
      setSendToClient={setSendToClient}
    />
  ) : (
    <AppAnimate animation='transition.slideUpIn'>
      {!user.businessId || !business?.onboardingComplete ? (
        <PleaseCreateBusiness message='generate a proposal' />
      ) : (
     
        <GenerateProposal
          sendToClient={sendToClient}
          selectedProposal={selectedProposal}
          setFieldValue={setFieldValue}
          businessInfo={businessInfo}
          validationError={validationError}
          setFormSection={setFormSection}
          changeForm={changeForm}
          checkFormErrors={checkFormErrors}
          setChangeForm={setChangeForm}
          validationErrorList={validationErrorList}
        />
 
      )}
    </AppAnimate>
  );
};

export default ProposalContent;
