import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import Drawer from '@mui/material/Drawer';
import VerticalNav from '../../components/VerticalNav';
import StandardSidebarWrapper from './StandardSidebarWrapper';
import UserInfo from '../../components/UserInfo';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

const AppSidebar = (props) => {
  const { sidebarTextColor } = useSidebarContext();

  return (
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
      <StandardSidebarWrapper className='standard-sidebar'>
        <MainSidebar>
          <UserInfo color={sidebarTextColor} />
          <AppScrollbar
            sx={{
              py: 2,
              height: 'calc(100vh - 70px) !important',
            }}
            scrollToTop={false}
          >
            <VerticalNav routesConfig={props.routesConfig} />
          </AppScrollbar>
        </MainSidebar>
      </StandardSidebarWrapper>
    </Drawer>
  );
};
export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
  toggleNavCollapsed: PropTypes.func,
  isNavCollapsed: PropTypes.bool,
  routesConfig: PropTypes.array,
};
