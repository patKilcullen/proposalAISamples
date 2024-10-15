import React from 'react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import { Box, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';

const MessageItem = (props) => {
  const { item } = props;

  return (
    <ListItem
      sx={{
        padding: '8px 20px',
      }}
      className='item-hover'
    >
      <ListItemAvatar
        sx={{
          minWidth: 0,
          mr: 4,
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
          }}
          src={item.image}
        />
      </ListItemAvatar>
      <Box
        sx={{
          fontSize: 14,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography
          component='h4'
          variant='h4'
          sx={{
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            mb: 0.5,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {item.name}
        </Typography>
        <Typography>{item.message}</Typography>
      </Box>
    </ListItem>
  );
};

export default MessageItem;

MessageItem.propTypes = {
  item: PropTypes.object.isRequired,
};
