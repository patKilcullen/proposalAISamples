import React from 'react';
import { IconButton } from '@mui/material';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import IntlMessages from '@crema/helpers/IntlMessages';
import NotificationItem from './NotificationItem';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppScrollbar from '../AppScrollbar';

const AppNotificationContent = ({ onClose, sxStyle }) => {
  const notification = []; //TODO replace with real data
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        height: '100%',
        ...sxStyle,
      }}
    >
      <Box
        sx={{
          padding: '5px 20px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderBottomColor: (theme) => theme.palette.divider,
          minHeight: { xs: 56, sm: 70 },
        }}
      >
        <Typography component='h3' variant='h3'>
          <IntlMessages id='common.notifications' />({notification.length})
        </Typography>
        <IconButton
          sx={{
            height: 40,
            width: 40,
            marginLeft: 'auto',
            color: 'text.secondary',
          }}
          onClick={onClose}
          size='large'
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <AppScrollbar
        sx={{
          height: { xs: 'calc(100% - 96px)', sm: 'calc(100% - 110px)' },
        }}
      >
        <List sx={{ py: 0 }}>
          {notification.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </List>
      </AppScrollbar>
      <Button
        sx={{
          borderRadius: 0,
          width: '100%',
          textTransform: 'capitalize',
          marginTop: 'auto',
          height: 40,
        }}
        variant='contained'
        color='primary'
      >
        <IntlMessages id='common.viewAll' />
      </Button>
    </Box>
  );
};

export default AppNotificationContent;

AppNotificationContent.propTypes = {
  onClose: PropTypes.func,
  sxStyle: PropTypes.object,
};
