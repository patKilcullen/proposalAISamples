import React from 'react';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { grey } from '@mui/material/colors';
import { Fonts } from '@crema/constants/AppEnums';
import Avatar from '@mui/material/Avatar';

const TeamMember = (props) => {
  const { user, handleRemoveMember } = props;
  const { userName, email, role, image } = user;

  return (
    <Card
      sx={{
        p: 5,
        mb: 5,
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
              width: { sx: '100%', sm: 130 },
              height: { sx: 180, sm: 130 },
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
                width: { sx: '100%', sm: 130 },
                height: { sx: 180, sm: 130 },
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
              mb: 3,
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

            <Box
              sx={{
                ml: { xs: -4, sm: 'auto' },
                mr: { sm: -4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'space-between', sm: 'flex-end' },
                color: 'text.secondary',
              }}
            >
              <Box sx={{ mx: 4 }} component='span'>
                <Tooltip
                  sc={{
                    cursor: 'pointer',
                  }}
                  title={<IntlMessages id='common.more' />}
                >
                  <MoreVertIcon />
                </Tooltip>
              </Box>
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
                mb: 4,
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
                mb: 4,
                fontSize: 14,
              }}
            >
              Email: {email}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
            }}
          >
            {/* PROJECTS */}
            <Box sx={{ mx: { xs: -1, xl: -2 } }}>
              Projects:{' '}
              {user.projects
                ? user.projects.map((skill, index) => {
                    return (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.type === 'dark'
                              ? theme.palette.grey[700]
                              : theme.palette.grey[200],
                          padding: '4px 12px',
                          marginTop: 2,
                          marginRight: { xs: 1, xl: 2 },
                          marginLeft: { xs: 1, xl: 2 },
                          border: '1px solid',
                          borderColor: grey[500],
                          borderRadius: 2,
                        }}
                      />
                    );
                  })
                : '...no assigned projects'}
            </Box>

            <Box
              sx={{
                ml: { md: 'auto' },
              }}
            >
              <Button
                variant='contained'
                color='primary'
                sx={{
                  marginRight: 5,
                  marginTop: 2,
                  padding: '9px 12px',
                  lineHeight: 1,
                  width: 96,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                <IntlMessages id='View' />
              </Button>
              <Button
                onClick={() => handleRemoveMember(user)}
                variant='contained'
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.primary.contrastText,
                  color: grey[500],
                  marginTop: 2,
                  border: '1px solid',
                  borderColor: grey[500],
                  width: 96,
                  fontWeight: Fonts.MEDIUM,
                  padding: '9px 12px',
                  lineHeight: 1,
                }}
              >
                <IntlMessages id='mailApp.remove' />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default TeamMember;

TeamMember.propTypes = {
  user: PropTypes.object.isRequired,
};
