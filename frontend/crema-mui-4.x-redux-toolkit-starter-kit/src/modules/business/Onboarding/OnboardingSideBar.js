import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



const OnboardingSideBar = ({steps, handleNext, handleBack, activeStep, setActiveStep}) => {
// CURRENT STEP: ref assocaited with the active step
  const [currentStepRef, setCurrentStepRef] = useState(null);

 
// AUTO SCROLL TO STEP: when stpe changed, center it in parent element
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
    <Box sx={{ maxWidth: 400,paddingLeft: "20px", paddingTop: "20px" }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {Array.isArray(steps) &&
          steps.map((step, index) => (
            <Step
              key={step.label}
              ref={(ref) => index === activeStep && setCurrentStepRef(ref)}
              sx={{
                // boxShadow:
                //   index === activeStep ? '2px 5px' : null,
                // height: index === activeStep ? '15vh' : '7vh',
                fontWeight: index === activeStep ? 'bold' : null,
                fontSize: index === activeStep ? '50px' : null,
                // marginBottom: '-20px',
                
              }}
            >
              <StepLabel
                // optional={
                //   index === steps.length - 1 ? (
                //     <Typography variant='caption'>Last step</Typography>
                //   ) : null
                // }
              >
                {step.label}
              </StepLabel>
              {/* <StepContent>
                <Typography>
                  {step.description}
    
                </Typography>
              </StepContent> */}
            </Step>
          ))}
      </Stepper>
    </Box>
  );
};
 export default OnboardingSideBar