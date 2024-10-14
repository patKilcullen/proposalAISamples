import React, { useEffect, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppContentView from '../../AppContentView';
import AppThemeSetting from '../../AppThemeSetting';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import UserMiniHeaderWrapper from './UserMiniHeaderWrapper';
import AppFixedFooter from './AppFixedFooter';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '@crema/constants/AppEnums';
import UserMiniHeaderContainer from './UserMiniHeaderContainer';
import { useLocation } from 'react-router-dom';
import PropsTypes from 'prop-types';

const UserMiniHeader = ({ routes, routesConfig }) => {
  const { pathname } = useLocation();
  const { footer, layoutType, footerType } = useLayoutContext();
  const [isNavCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <UserMiniHeaderContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <UserMiniHeaderWrapper
        className={clsx('mini-sidebar-collapsed', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
        <Box className='mainContent'>
          <AppSidebar
            routesConfig={routesConfig}
            isNavCollapsed={isNavCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
          />
          <AppContentView routes={routes} />
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </UserMiniHeaderWrapper>
    </UserMiniHeaderContainer>
  );
};

export default UserMiniHeader;
UserMiniHeader.propTypes = {
  routes: PropsTypes.object.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
