import React, { useEffect, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppThemeSetting from '../../AppThemeSetting';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import MiniSidebarWrapper from './MiniSidebarWrapper';
import AppFixedFooter from './AppFixedFooter';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '@crema/constants/AppEnums';
import MiniSidebarContainer from './MiniSidebarContainer';
import AppContentView from '../../AppContentView';
import { useLocation } from 'react-router-dom';
import PropsTypes from 'prop-types';

const MiniSidebar = ({ routes, routesConfig }) => {
  const { pathname } = useLocation();
  const [isCollapsed, setCollapsed] = useState(true);
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const { footer, layoutType, headerType, footerType } = useLayoutContext();

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <MiniSidebarContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <MiniSidebarWrapper
        className={clsx('miniSidebarWrapper', {
          'mini-sidebar-collapsed': isCollapsed,
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar
          routesConfig={routesConfig}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />
        <Box className='mainContent'>
          <AppHeader
            setCollapsed={setCollapsed}
            isCollapsed={isCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
          />
          <AppContentView routes={routes} />
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </MiniSidebarWrapper>
    </MiniSidebarContainer>
  );
};

export default MiniSidebar;
MiniSidebar.propTypes = {
  routes: PropsTypes.object.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
