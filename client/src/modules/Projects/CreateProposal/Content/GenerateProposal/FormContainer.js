import React, { useEffect, useRef } from 'react';
import ProposalInfo from './ProposalInfo';
import ClientInfo from './ClientInfo';
import CreateBusinessForm from '../../../../business/BusinessInfo/CreateBusinessForm';

const FormContainer = ({
  setFieldValue,
  businessInfo,
  editMode,
  toggleEditMode,
  changeProposalBusinessInfo,
  setChangeProposalBusinessInfo,
  sendToClient,
  selectedProposal,
  activeSection,
}) => {
  return (
    <>
      {/* Render the corresponding section/form based on the activeSection */}
      {activeSection === 'businessInformation' && (
        <CreateBusinessForm
          setFieldValue={setFieldValue}
          businessInfo={businessInfo}
          editMode={editMode}
          toggleEditMode={toggleEditMode}
          createProposal={true}
          changeProposalBusinessInfo={changeProposalBusinessInfo}
          setChangeProposalBusinessInfo={setChangeProposalBusinessInfo}
        />
      )}
      {activeSection === 'clientInformation' && (
        <ClientInfo
          sendToClient={sendToClient}
          selectedProposal={selectedProposal}
          setFieldValue={setFieldValue}
          createProposal={true}
          clientBusiness={true}
        />
      )}
      {activeSection === 'proposalInformation' && <ProposalInfo />}
    </>
  );
};

export default FormContainer;
