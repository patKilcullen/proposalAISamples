import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import VerticalNav from '../../components/VerticalNav';
import UserMiniHeaderSidebarWrapper from './UserMiniHeaderSidebarWrapper';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';

const AppSidebar = (props) => {
  const { footer, footerType } = useLayoutContext();

  return (
    <>
      <Hidden xlUp>
        <Drawer
          anchor={props.position}
          open={props.isNavCollapsed}
          onClose={props.toggleNavCollapsed}
          classes={{
            root: clsx(props.variant),
            paper: clsx(props.variant),
          }}
          style={{ position: 'absolute' }}
        >
          <UserMiniHeaderSidebarWrapper className='user-mini-header-sidebar'>
            <MainSidebar>
              <AppScrollbar
                sx={{
                  py: 2,
                }}
                scrollToTop={false}
              >
                <VerticalNav routesConfig={props.routesConfig} />
              </AppScrollbar>
            </MainSidebar>
          </UserMiniHeaderSidebarWrapper>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <UserMiniHeaderSidebarWrapper className='user-mini-header-sidebar'>
          <MainSidebar>
            <AppScrollbar
              className={clsx({
                'has-footer-fixed': footer && footerType === 'fixed',
              })}
              sx={{
                py: 2,
                height: 'calc(100vh - 71px) !important',
                '&.has-footer-fixed': {
                  height: {
                    xs: 'calc(100vh - 119px) !important',
                    xl: 'calc(100vh - 131px) !important',
                  },
                },
              }}
              scrollToTop={false}
            >
              <VerticalNav routesConfig={props.routesConfig} />
            </AppScrollbar>
          </MainSidebar>
        </UserMiniHeaderSidebarWrapper>
      </Hidden>
    </>
  );
};
export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  routesConfig: PropTypes.array,
  variant: PropTypes.string,
  toggleNavCollapsed: PropTypes.func,
  isNavCollapsed: PropTypes.bool,
};
