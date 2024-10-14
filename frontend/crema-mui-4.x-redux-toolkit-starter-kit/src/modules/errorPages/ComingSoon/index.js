import React from 'react';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Fonts } from '@crema/constants/AppEnums';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';

import { styled } from '@mui/material/styles';
import { ReactComponent as Logo } from '../../../assets/icon/comingsoon.svg';
import { useTheme } from '@mui/material';
import { showMessage } from '../../../toolkit/actions';

const FormWrapper = styled(Form)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    alignItems: 'center',
    marginBottom: 12,
    '& .text-field': {
      width: '100%',
      marginBottom: 20,
    },
    '& .button': {
      fontWeight: Fonts.MEDIUM,
      fontSize: 16,
      textTransform: 'capitalize',
    },
  };
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email('The Email you entered is not a valid format!')
    .required('Please enter Email Address!'),
});

const ComingSoon = ({removeNotifyMe}) => {
  const theme = useTheme();

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <>
        <Box
          sx={{
            py: { xl: 8 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              mb: { xs: 4, xl: 8 },
              width: '100%',
              maxWidth: { xs: 200, sm: 300, xl: 706 },
              '& svg': {
                width: '100%',
                maxWidth: 400,
              },
            }}
          >
            <Logo fill={theme.palette.primary.main} />
          </Box>

          <Box
            variant='h3'
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <IntlMessages id='error.comingSoon' />!
          </Box>

          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
            }}
          >
            <Typography style={{ fontSize: 18, marginTop: 3 }}>
              <IntlMessages id='error.comingSoonMessage1' />
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              <IntlMessages id='error.comingSoonMessage2' />
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mx: 'auto',
            maxWidth: 384,
          }}
        >
          <Formik
            validateOnChange={true}
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { resetForm }) => {
              showMessage(<IntlMessages id='error.comingSoonNotification' />);
              resetForm();
            }}
          >
            {() => (
             
              <FormWrapper>
                 {!removeNotifyMe &&
                 <>
                <AppTextField
                  placeholder='Email'
                  name='email'
                  label={<IntlMessages id='common.emailAddress' />}
                  className='text-field'
                  variant='outlined'
                />

                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  className='button'
                >
                  <IntlMessages id='error.notifyMe' />
                </Button>
                </>}
              </FormWrapper>
            )}
          </Formik>
        </Box>
        <AppInfoView />
      </>
    </AppAnimate>
  );
};

export default ComingSoon;
