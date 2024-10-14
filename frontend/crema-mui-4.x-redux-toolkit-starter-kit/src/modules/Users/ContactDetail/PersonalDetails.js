import React from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

import AppTooltip from '@crema/components/AppTooltip';

const PersonalDetails = (props) => {
  const { contact } = props;

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
          <EmailOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip  title={contact.email || <IntlMessages id="common.na" />}>
            <Box
              sx={{
                ml: 3.5,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.email}
            </Box>
          </AppTooltip >
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PhoneOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip  title={contact.mobile || <IntlMessages id="common.na" />}>
            <Box
              sx={{
                ml: 3.5,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.mobile}
            </Box>
          </AppTooltip >
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LanguageIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <AppTooltip  title={contact.url || <IntlMessages id="common.na" />}>
            <Box
              sx={{
                ml: 3.5,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {contact.url ? contact.url : <IntlMessages id="common.na" />}
            </Box>
          </AppTooltip >
        </Box>
      </div>
    </Box>
  );
};

PersonalDetails.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default PersonalDetails;
