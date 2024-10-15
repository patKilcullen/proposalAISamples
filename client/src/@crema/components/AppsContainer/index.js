import React, { useEffect, useState } from 'react';
import AppInfoView from '../AppInfoView';
import { Box, Slide, Zoom } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';

import AppSidebar from './AppSidebar';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { Fonts } from '@crema/constants/AppEnums';
import AppContainerWrapper from './AppContainerWrapper';
import { useLocation } from 'react-router-dom';

const AppsContainer = (props) => {
  const { pathname } = useLocation();
  const { footer } = useLayoutContext();
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const { navStyle } = useLayoutContext();
  const { title, sidebarContent, fullView, children, rowReverse } = props;

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        margin: -4,
        padding: 4,
        ...props.sxStyle,
      }}
    >
      <Box
        sx={{
          marginTop: fullView ? 0 : -4,
          display: 'flex',
          alignItems: 'center',
          mb: {
            xs: fullView ? 4 : 2,
            lg: 4,
          },
          mt: {
            xs: fullView ? 0 : -4,
            lg: 0,
          },
        }}
      >
        {fullView ? null : (
          <Hidden lgUp>
            <IconButton
              edge='start'
              sx={{
                marginRight: (theme) => theme.spacing(2),
              }}
              color='inherit'
              aria-label='open drawer'
              onClick={toggleNavCollapsed}
              size='large'
            >
              <MenuIcon
                sx={{
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
          </Hidden>
        )}
        <Zoom in style={{ transitionDelay: '300ms' }}>
          <Box
            component='h2'
            variant='h2'
            sx={{
              fontSize: 16,
              color: 'text.primary',
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {title}
          </Box>
        </Zoom>
      </Box>

      <AppContainerWrapper footer={footer}
      flexDirection={ rowReverse && "row-reverse"}
      >
        {sidebarContent ? (
          <AppSidebar
            isAppDrawerOpen={isNavCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
            footer={footer}
            fullView={fullView}
            navStyle={navStyle}
            sidebarContent={sidebarContent}
          />
        ) : null}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              lg: `calc(100% - ${fullView ? 0 : 280}px)`,
            },
            pl: {
              lg: props.fullView ? 0 : 8,
            },
          }}
        >
          <Slide direction='left' in mountOnEnter unmountOnExit>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...props.cardStyle,
              }}
            >
              
              {children}
            </Card>
          </Slide>
          <AppInfoView />
        </Box>
         {/* {sidebarContent ? (
          <AppSidebar
            isAppDrawerOpen={isNavCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
            footer={footer}
            fullView={fullView}
            navStyle={navStyle}
            sidebarContent={sidebarContent}
          />
        ) : null} */}
      </AppContainerWrapper>
    </Box>
  );
};

export default AppsContainer;

AppsContainer.defaultProps = {
  title: '',
};

AppsContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sidebarContent: PropTypes.node,
  fullView: PropTypes.bool,
  children: PropTypes.node,
  sxStyle: PropTypes.object,
  cardStyle: PropTypes.object,
};
