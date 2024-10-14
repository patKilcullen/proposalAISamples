import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Fonts } from '@crema/constants/AppEnums';
import { initialUrl } from '@crema/constants/AppConst';
import AppAnimate from '@crema/components/AppAnimate';
import IntlMessages from '@crema/helpers/IntlMessages';
import { ReactComponent as Logo } from '../../../assets/icon/403.svg';
import { useTheme } from '@mui/material';

const PleaseCreateBusiness = ({message}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onGoBackToHome = () => {
    navigate('/my-profile');
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
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
        <Box sx={{ mb: { xs: 4, xl: 5 } }}>
          <Box
            variant='h3'
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 22, md: 26 },
              fontWeight: Fonts.MEDIUM,
            }}
          >
            Unauthorized
          </Box>
            <Box
            variant='h3'
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {`You need a business account  ${message ? message : "continue"}...`}
          </Box>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
              fontSize: 16,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Typography>{`Please complete business onboarding`}</Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 16,
              textTransform: 'capitalize',
            }}
            onClick={onGoBackToHome}
          >
      Get Onboard
          </Button>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PleaseCreateBusiness;
