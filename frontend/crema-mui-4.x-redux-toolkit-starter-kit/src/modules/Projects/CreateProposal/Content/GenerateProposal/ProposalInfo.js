import React from 'react';
import { Box, Grid } from '@mui/material';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import AppCard from '@crema/components/AppCard';
import AppAnimate from '@crema/components/AppAnimate';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'formik';

const ProposalInfo = () => {
  return (
    <AppAnimate animation='transition.slideUpIn'>
      <Form
        style={{
          overflowY: 'auto',
          height: '90vh',
          minWidth: '50vw',
        }}
        noValidate
        autoComplete='off'
      >
        <Box
          sx={{
            overflow: 'auto',
          }}
        >
          <AppCard title='Proposal Information'>
             <Box component='p' sx={{ fontSize: 16 }}>
              Title
            </Box>
            <AppTextField
              name='title'
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Title'
            />

            
            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Scope of Work
            </Box>
            <AppTextField
              multiline
              name='scopeOfWork'
              variant='outlined'
              rows={4}
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Scope of Work'
            />

            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Client Goals
            </Box>
            <AppTextField
              multiline
              name='clientGoals'
              variant='outlined'
              rows={4}
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Client Goals'
            />

            <Box component='p' sx={{ fontSize: 16 }}>
              Timeline
            </Box>
            <AppTextField
              name='projectTimeline'
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Project Timeline'
            />
            <Box component='p' sx={{ fontSize: 16 }}>
              Budget and Pricing
            </Box>
            <AppTextField
              name='budgetAndPricing'
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Project Budget and Pricing'
            />

            <Box component='p' sx={{ fontSize: 16 }}>
              Deliverables
            </Box>
            <AppTextField
              name='deliverables'
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Project Deliverables'
            />
            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Unique Selling Position
            </Box>
            <AppTextField
              name='uniqueSellingPosition'
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Unique Selling Position'
            />
            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Terms and Condition
            </Box>
            <AppTextField
              multiline
              name='termsAndConditions'
              variant='outlined'
              rows={4}
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Terms and Condition'
            />
            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Client Responsibilities
            </Box>
            <AppTextField
              multiline
              name='clientResponsibilities'
              variant='outlined'
              rows={4}
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Client Responsibilities'
            />
            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Previous Success Story
            </Box>
            <AppTextField
              multiline
              name='previousSuccessStory'
              variant='outlined'
              rows={4}
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Description here'
            />
          </AppCard>
        </Box>
      </Form>
    </AppAnimate>
  );
};

export default ProposalInfo;
