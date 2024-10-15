import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from 'prop-types';
import { Fonts } from '@crema/constants/AppEnums';

const ListEmptyResult = ({
  loader,
  placeholder,
  loading,
  title,
  actionTitle,
  content,
  onClick,
}) => {
  if (loading || loader) {
    return (
      <React.Fragment>
        {placeholder ? (
          placeholder
        ) : (
          <Box
            sx={{
              flexDirection: 'row',
              minHeight: '450px',
              height: '100%',
              flex: 1,
              display: 'flex',
              p: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'transparent',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <CircularProgress size={16} />
            <Box component='span' sx={{ ml: 2 }}>
              Loading...
            </Box>
          </Box>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <Box
        sx={{
          flexDirection: 'column',
          minHeight: '450px',
          height: '100%',
          flex: 1,
          display: 'flex',
          p: 5,
          justifyContent: 'center',
          alignItems: 'center',
          border: 1,
          borderColor: 'transparent',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        {title ? (
          <Typography
            sx={{
              fontSize: 14,
              color: (theme) => theme.palette.text.secondary,
              fontWeight: Fonts.MEDIUM,
              mb: 2,
            }}
            component='h4'
            variant='h4'
          >
            {title}
          </Typography>
        ) : null}
        <Typography
          sx={{
            fontSize: 14,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {content}
        </Typography>

        {actionTitle ? (
          <Button
            color='primary'
            variant='contained'
            style={{ mt: 7.5, height: 45, minWidth: 150 }}
            onClick={onClick}
          >
            {actionTitle}
          </Button>
        ) : null}
      </Box>
    );
  }
};

export default ListEmptyResult;

ListEmptyResult.defaultProps = {
  title: <IntlMessages id='common.noRecordFound' />,
};

ListEmptyResult.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  actionTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  loader: PropTypes.bool,
  placeholder: PropTypes.node,
  content: PropTypes.string,
};
