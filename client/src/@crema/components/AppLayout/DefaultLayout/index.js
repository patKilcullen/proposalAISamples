import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppThemeSetting from '../../AppThemeSetting';
import DefaultLayoutWrapper from './DefaultLayoutWrapper';
import MainContent from './MainContent';
import { LayoutType } from '@crema/constants/AppEnums';
import AppSidebar from './AppSidebar';
import DefaultLayoutContainer from './DefaultLayoutContainer';
import { useLocation } from 'react-router-dom';
import PropsTypes from 'prop-types';

const DefaultLayout = ({ routes, routesConfig }) => {
  const { footer, layoutType, headerType, footerType } = useLayoutContext();
  const { pathname } = useLocation();
  const [isNavCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <DefaultLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DefaultLayoutWrapper
        className={clsx('defaultLayoutWrapper', {
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

        <MainContent>
          <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
          <AppContentView routes={routes} />
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </DefaultLayoutWrapper>
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
DefaultLayout.propTypes = {
  routes: PropsTypes.object.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
