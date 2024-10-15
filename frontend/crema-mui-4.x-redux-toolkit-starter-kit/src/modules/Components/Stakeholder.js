import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Fonts } from '@crema/constants/AppEnums';
import Avatar from '@mui/material/Avatar';

const Stakeholder = (props) => {

  const { user, clientSigner, businessSigner } = props;
  const { userName, email, role, image } = user;
  return (
    <Card
      sx={{
        p: 2,
        mb: 3,
        width: '100%',
      }}
      className='item-hover'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            mr: { sm: 5 },
            mb: { xs: 3, sm: 0 },
            '.crUserImage': {
              objectFit: 'cover',
              borderRadius: (theme) =>
                theme.components.MuiCard.styleOverrides.root.borderRadius,
              width: { sx: '100%', sm: 65 },
              height: { sx: 90, sm: 65 },
            },
          }}
        >
          {/* PICTURE/AVATER */}
          {image ? (
            <Avatar
              sx={{
                marginRight: 2,
              }}
              src={image}
            />
          ) : (
            <Avatar
              sx={{
                marginRight: 2,
                width: { sx: '100%', sm: 65 },
                height: { sx: 90, sm: 65 },
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215,
                ).toString(16)}`,
              }}
            >
              {userName.substring(0, 7).toUpperCase()}
            </Avatar>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              mb: 1,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              color: 'text.secondary',
            }}
          >
            {/* NAME */}
            <Box
              component='h3'
              sx={{
                mb: { xs: 2, sm: 0 },
                fontSize: 16,
                fontWeight: Fonts.BOLD,
              }}
            >
              {userName}
            </Box>
          </Box>

          <Box
            sx={{
              pr: { lg: 6, xl: 16 },
            }}
          >
            {/* ROLE */}
            <Box
              component='p'
              sx={{
                color: 'text.secondary',
                mb: 1,
                fontSize: 14,
              }}
            >
              Role: {role}
            </Box>
            {/* EMAIL */}
            <Box
              component='p'
              sx={{
                color: 'text.secondary',
                mb: 1,
                fontSize: 14,
              }}
            >
              Email: {email}
            </Box>
          </Box>
          {/* Signed */}
          <Box
            component='p'
            sx={{
              color: 'text.secondary',
              mb: 1,
              fontSize: 14,
            }}
          >
            Signed:{' '}
            {user._id === businessSigner || user._id === clientSigner
              ? 'true'
              : 'false'}
          </Box>
        </Box>
        <Button
          variant='contained'
          color='primary'
          sx={{
            marginRight: 1,
            marginTop: 2,
            fontWeight: Fonts.MEDIUM,
            height: "40px",
            alignSelf: "flex-end"
          }}
        >
          <IntlMessages id='View' />
        </Button>
      </Box>
    </Card>
  );
};

export default Stakeholder;

Stakeholder.propTypes = {
  user: PropTypes.object.isRequired,
};
