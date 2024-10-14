import React from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { FiFacebook, FiTwitter } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Fonts } from '@crema/constants/AppEnums';
import AppTooltip from '@crema/components/AppTooltip';

const SocialMedia = (props) => {
  const { contact } = props;

  return (
    <Box
      sx={{
        pr: { xs: 5, lg: 8, xl: 10 },
        py: 5,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        component='h6'
        sx={{
          mb: 2,
          fontWeight: Fonts.MEDIUM,
          fontSize: 16,
        }}
      >
        <IntlMessages id='common.socialMedia' />
      </Box>

      <Box
        sx={{
          px: { xs: 5, lg: 8, xl: 10 },
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiFacebook
            style={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip title={contact.facebookId || <IntlMessages id="common.na" />}>
            <Box
              sx={{
                ml: 2,
                color: 'text.secondary',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.facebookId ? contact.facebookId : <IntlMessages id="common.na" />}
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
            style={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip title={contact.twitterId || <IntlMessages id="common.na" />}>
            <Box
              sx={{
                ml: 2,
                color: 'text.secondary',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.twitterId ? contact.twitterId : <IntlMessages id="common.na" />}
            </Box>
          </AppTooltip>
        </Box>
      </Box>
    </Box>
  );
};

SocialMedia.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default SocialMedia;
