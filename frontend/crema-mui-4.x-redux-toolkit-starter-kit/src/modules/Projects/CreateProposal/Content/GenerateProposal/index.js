import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

import 'react-quill/dist/quill.snow.css';

import AppsContainer from '@crema/components/AppsContainer';

import FormContainer from './FormContainer';

import CreateProposalSideBar from './CreateProposalSidebar';

import AppCard from '@crema/components/AppCard';
const GenerateProposal = ({
  sendToClient,
  selectedProposal,
  setFieldValue,
  businessInfo,

  validationError,
  setFormSection,
  changeForm,
  checkFormErrors,
  setChangeForm,
  validationErrorList,
}) => {
  // FORM SECTION: determines and changes the current section (business info, client info, proposal info) of the from
  const [activeSection, setActiveSection] = useState('businessInformation');
  // CHANGE FORM: when changeForm changes in parent, acter checking for erros,
  // if it is true(meaning no errors) change the section to next form
  useEffect(() => {
    if (changeForm) {
      switch (activeSection) {
        case 'businessInformation':
          setActiveSection('clientInformation');
          setFormSection('clientInformation');
          break;
        case 'clientInformation':
          setActiveSection('proposalInformation');
          setFormSection('proposalInformation');
          break;

        default:
          break;
      }
      setChangeForm(false);
    }
  }, [changeForm]);

  // PREVIOUS SECTION CLICK
  const handlePreviousClick = async () => {
    switch (activeSection) {
      case 'clientInformation':
        setActiveSection('businessInformation');
        setFormSection('businessInformation');

        break;
      case 'proposalInformation':
        setActiveSection('clientInformation');
        setFormSection('clientInformation');
        break;

      default:
        break;
    }
  };

  // CHANGE PROPOSAL BUSINESS INFO: when true users can changeg business info when creating proposal, will not change actualy business data
  const [changeProposalBusinessInfo, setChangeProposalBusinessInfo] =
    useState(false);

  //EDIT MODE: allows users to change businessInfo that will be used for proposal. Does NOT update business
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <AppsContainer
        sidebarContent={<CreateProposalSideBar activeSection={activeSection} />}
      >
        {/* FORM CONTAINER: display differnt forms bases on activeSection */}
        <FormContainer
          setFieldValue={setFieldValue}
          businessInfo={businessInfo}
          editMode={editMode}
          toggleEditMode={toggleEditMode}
          changeProposalBusinessInfo={changeProposalBusinessInfo}
          setChangeProposalBusinessInfo={setChangeProposalBusinessInfo}
          sendToClient={sendToClient}
          selectedProposal={selectedProposal}
          activeSection={activeSection}
          validationError={validationError}
          handlePreviousClick={handlePreviousClick}
        />
        {/* BUTTONS */}
        <AppCard style={{ marginTop: '-50px', overflow: 'auto' }}>
          <Box
            sx={{
              width: '100%',
              alignSelf: 'flex-end',
              height: '40px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // justifyContent: "center"
            }}
          >
            {/* PREVIOUS BUTTON on client info or proposal info form, include previous buttong to get to last part of from */}
            {activeSection !== 'businessInformation' && (
              <Button
                onClick={handlePreviousClick}
                sx={{
                  width: '100px',
                  height: '40px',
                  marginRight: 'auto',
                }}
                color='primary'
                variant='contained'
              >
                Previous
              </Button>
            )}

            {/* NEXT BUTTON on business info or client info form, include next buttong to get to next part of from */}
            {activeSection !== 'proposalInformation' && (
              <Button
                onClick={() => checkFormErrors('next')}
                //  onClick={checkFormErrors}
                sx={{
                  width: '100px',
                  alignSelf: 'flex-end',
                  height: '40px',
                }}
                color='primary'
                variant='contained'
                //  type="submit"
              >
                Next
              </Button>
            )}

            {/* GENERATE BUTTON: if on last page(proposal info) of form, show generate proposal button */}
            {activeSection === 'proposalInformation' && (
              <Button
                sx={{
                  width: '100px',
                  alignSelf: 'flex-end',
                  height: '40px',
                }}
                color='primary'
                variant='contained'
                type='submit'
                onClick={() => checkFormErrors('generate')}
                //  onClick={checkFormErrors}
              >
                Generate
              </Button>
            )}
          </Box>
        </AppCard>
        {/* ERROR MESSAGE */}
        {validationError ? (
          <Box sx={{ alignSelf: 'center' }}>
            <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
              Please make sure all fields are filled out correctly:
            </Typography>
          </Box>
        ) : null}
      </AppsContainer>

      {/* BUTTONS */}
    </>
  );
};

export default GenerateProposal;
