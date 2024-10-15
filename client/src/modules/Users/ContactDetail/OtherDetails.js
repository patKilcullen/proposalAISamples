import React from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import BusinessIcon from '@mui/icons-material/Business';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PropTypes from 'prop-types';
import { FiTwitter } from 'react-icons/fi';
import AppTooltip from '@crema/components/AppTooltip';

const OtherDetails = (props) => {
  const { contact, business } = props;

  return (
    <Box
      sx={{
        pb: 5,
      }}
    >
      <div>
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BusinessIcon
            sx={{
              fontSize: 24,
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip title={business || <IntlMessages id='common.na' />}>
            <Box
              sx={{
                ml: 3.5,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {business ? business : <IntlMessages id='common.na' />}
            </Box>
          </AppTooltip>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HomeOutlinedIcon
            sx={{
              fontSize: 24,
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip
            title={contact.address || <IntlMessages id='common.na' />}
          >
            <Box
              sx={{
                ml: 3.5,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.address ? (
                contact.address
              ) : (
                <IntlMessages id='common.na' />
              )}
            </Box>
          </AppTooltip>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiTwitter
            sx={{
              fontSize: 24,
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip
            title={contact.twitterId || <IntlMessages id='common.na' />}
          >
            <Box
              sx={{
                ml: 3.5,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.twitterId ? (
                contact.twitterId
              ) : (
                <IntlMessages id='common.na' />
              )}
            </Box>
          </AppTooltip>
        </Box>
      </div>
    </Box>
  );
};

OtherDetails.propTypes = {
  contact: PropTypes.object.isRequired,
  business: PropTypes.string, // Make sure to define this if it's passed as a prop
};

export default OtherDetails;
