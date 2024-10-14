import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Form } from 'formik';
import PropTypes from 'prop-types';

// CREMA
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import AppAnimate from '@crema/components/AppAnimate';

const FindProposalForm = () => {
 

  return (
    <AppAnimate animation='transition.slideUpIn'>
      <Form noValidate autoComplete='off'>
        <Typography
          component='h3'
          sx={{
            fontSize: 16,
            fontWeight: Fonts.BOLD,
            mb: { xs: 3, lg: 4 },
          }}
        ></Typography>

        <AppCard title='Ask to join proposal'>
          <Typography
            component='h3'
            sx={{
              color: 'red',
              fontSize: 16,

              mb: { xs: 3, lg: 4 },
            }}
          ></Typography>
          <Box component='p' sx={{ fontSize: 16 }}>
            Proposal Id
          </Box>
          <AppTextField
            name='proposalId'
            variant='outlined'
            sx={{
              width: '100%',
              my: 2,
            }}
            placeholder='proposal id'
          />
          <Button
         
            color='primary'
            variant='contained'
            type='submit'
          >
            Join
          </Button>
        </AppCard>
      </Form>
    </AppAnimate>
  );
};

export default FindProposalForm;

FindProposalForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
};
