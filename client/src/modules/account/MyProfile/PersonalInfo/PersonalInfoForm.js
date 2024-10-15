import React, {useState} from 'react';
import { alpha, Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useDropzone } from 'react-dropzone';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';
import Tooltip from '@mui/material/Tooltip';
import  ResendVerificationEmail  from 'modules/auth/VerifyEmail/ResendVerificationEmail';

import AppInfoView from '@crema/components/AppInfoView';
const AvatarViewWrapper = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    '& .edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
    '&.dropzone': {
      outline: 0,
      '&:hover .edit-icon, &:focus .edit-icon': {
        display: 'flex',
      },
    },
  };
});



const PersonalInfoForm = ({ values, setFieldValue }) => {


  const [editMode, setEditMode] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    disabled: !editMode,
    onDrop: (acceptedFiles) => {
      // create base64 string out og image to save
       const reader = new FileReader();
      reader.onloadend = () => {
       setFieldValue('photoURL', reader.result); 
      };
      reader.readAsDataURL(acceptedFiles[0]); // Read the file as a base64 string
    },
  });

  return (
    <Form noValidate autoComplete='off'>
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id='common.personalInfo' />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 5, lg: 6 },
        }}
      >
        <AvatarViewWrapper {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Avatar
              sx={{
                width: { xs: 50, lg: 64 },
                height: { xs: 50, lg: 64 },
                cursor: 'pointer',
         
            
              }}
                src={`${process.env.REACT_APP_SERVER_URL}${values.profileUrl}`}
            />
            {editMode && <Box className='edit-icon'>
              <EditIcon /> 
            </Box> }
          </label>
        </AvatarViewWrapper>
        <Box
          sx={{
            ml: 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {values.userName}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {values.email}
          </Typography>
          {!values.verified ? (
            <ResendVerificationEmail
              message={'Please verify your email addresss'}
            />
          ) : <Typography>Verified</Typography>}
        </Box>
      </Box>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={6}>
          <AppTextField
            name='userName'
            fullWidth
            label={<IntlMessages id='common.userName' />}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name='email'
            fullWidth
            label={<IntlMessages id='common.email' />}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            fullWidth
            name='address'
            label={<IntlMessages id='common.address' />}
            disabled={!editMode}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppTextField
            name='mobile'
            fullWidth
            label={<IntlMessages id='common.mobile' />}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: "space-between",
            }}
          >
            <Tooltip title='Edit user info.'>
              <Button
                sx={{
                  height: '40px',
                }}
                color='primary'
                variant='outlined'
                onClick={() => setEditMode(!editMode)}
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Button
              sx={{
                position: 'relative',
                minWidth: 100,
              }}
              color='primary'
              variant='contained'
              type='submit'
              disabled={!editMode}
            >
              <IntlMessages id='common.saveChanges' />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
      {/* FETCH CONTEXT */}
      {/* <AppInfoView type='context' /> */}
         <AppInfoView />
    </Form>
  );
};

export default PersonalInfoForm;
PersonalInfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
};
