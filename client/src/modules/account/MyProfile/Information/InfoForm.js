import React from 'react';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Form } from 'formik';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers';

const InfoForm = ({ values, setFieldValue }) => {
  return (
    <Form autoComplete='off'>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={12}>
          <AppTextField
            multiline
            name='bio'
            rows={3}
            fullWidth
            label={<IntlMessages id='common.yourBioDataHere' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              '& .MuiTextField-root': {
                width: '100%',
              },
            }}
          >
            <DatePicker
              label={<IntlMessages id='common.birthDate' />}
              value={values.dob}
              onChange={(newValue) => {
                setFieldValue('dob', newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name='website'
            fullWidth
            label={<IntlMessages id='common.website' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            fullWidth
            name='phone'
            label={<IntlMessages id='common.phoneNumber' />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                position: 'relative',
                minWidth: 100,
              }}
              color='primary'
              variant='contained'
              type='submit'
            >
              <IntlMessages id='common.saveChanges' />
            </Button>
            <Button
              sx={{
                position: 'relative',
                minWidth: 100,
                ml: 2.5,
              }}
              color='primary'
              variant='outlined'
              type='cancel'
            >
              <IntlMessages id='common.cancel' />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default InfoForm;
InfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
