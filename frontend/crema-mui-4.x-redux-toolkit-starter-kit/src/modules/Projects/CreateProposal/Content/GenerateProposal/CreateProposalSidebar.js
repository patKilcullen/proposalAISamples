import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const steps = [
  {
    label: 'Business Information',
    description: 'Edit business information for new proposal',
    id: 'businessInformation',
  },
  {
    label: 'Client Information',
    description: 'Enter client information for new proposal',
    id: 'clientInformation',
  },
  {
    label: 'Proposal information',
    description: 'Enter information for new proposal',
    id: 'proposalInformation',
  },
];

const CreateProposalSideBar = ({ activeSection }) => {
  // CURRENT STEP: ref assocaited with the active step
  const [currentStepRef, setCurrentStepRef] = useState(null);
  // ACTIVE STEP: step that is cirrently highlighes, with associated contnet in Form Container
  const [activeStep, setActiveStep] = useState(0);

  //SET ACTIVE STEP: when active section changes in parent, update the step here
  useEffect(() => {
    switch (activeSection) {
      case 'businessInformation':
        setActiveStep(0);

        break;
      case 'clientInformation':
        setActiveStep(1);
        break;
      case 'proposalInformation':
        setActiveStep(2);
        break;

      default:
        break;
    }
  }, [activeSection]);

  // AUTO SCROLL TO STEP: when step changed, center it in side bar
  useEffect(() => {
    if (currentStepRef) {
      currentStepRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [activeStep, currentStepRef]);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {Array.isArray(steps) &&
          steps.map((step, index) => (
            <Step
              key={step.label}
              ref={(ref) => index === activeStep && setCurrentStepRef(ref)}
              sx={{
                boxShadow:
                  index === activeStep ? '-5px 2px 5px 1px grey' : null,
                height: index === activeStep ? '15vh' : '7vh',
                minHeight: index === activeStep ? '100px' : null,
                fontWeight: index === activeStep ? 'bold' : null,
                fontSize: index === activeStep ? '50px' : null,
                marginBottom: '-20px',
              }}
            >
              <StepLabel>{step.label}</StepLabel>

              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
      </Stepper>
    </Box>
  );
};
export default CreateProposalSideBar;
