import React, { isValidElement } from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Box, CardHeader } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const AppCard = ({
  sxStyle,
  title,
  titleStyle,
  headerStyle,
  contentStyle,
  action,
  actionStyle,
  footer,
  footerPosition,
  footerStyle,
  children,
  ...rest
}) => {
  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', ...sxStyle }}
      {...rest}
    >
      {title || action ? (
        <CardHeader
          sx={{
            px: 6,
            pb: 0,
            '& .MuiCardHeader-action': {
              marginTop: 0,
              marginRight: 0,
            },
            '& .MuiCardHeader-content': {
              overflow: 'hidden',
            },
            ...headerStyle,
          }}
          title={
            typeof title === 'object' ? (
              title
            ) : (
              <Box
                component='h3'
                sx={{
                  color: 'text.primary',
                  fontWeight: Fonts.SEMI_BOLD,
                  fontSize: 16,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  ...titleStyle,
                }}
              >
                {title}
              </Box>
            )
          }
          action={
            typeof action === 'object' ? (
              action
            ) : (
              <span {...actionStyle}>
                <Link
                  href='#'
                  color='secondary'
                  underline='none'
                  sx={{
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
                  {action}
                </Link>
              </span>
            )
          }
        />
      ) : null}
      <CardContent
        sx={{
          height: '100%',
          px: 6,
          '&:last-of-type': {
            pb: 4,
          },
          ...contentStyle,
        }}
      >
        {children}
      </CardContent>
      {footer ? (
        <CardActions
          sx={{
            px: 6,
            pb: 4,
            ...footerStyle,
          }}
        >
          {isValidElement(footer) ? (
            footer
          ) : (
            <Box
              component='span'
              sx={{ ml: footerPosition === 'right' ? 'auto' : 0 }}
            >
              <Link
                color='secondary'
                component='button'
                underline='none'
                sx={{
                  fontSize: 14,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                {footer}
              </Link>
            </Box>
          )}
        </CardActions>
      ) : null}
    </Card>
  );
};

export default AppCard;

AppCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footerPosition: PropTypes.string,
  className: PropTypes.string,
  sxStyle: PropTypes.object,
  footerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  actionStyle: PropTypes.object,
  children: PropTypes.node,
};

AppCard.defaultProps = {
  footerPosition: 'left',
};
