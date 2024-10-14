import React from 'react';
import AppLogo from '../AppLogo';
import PropTypes from 'prop-types';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import SidebarHeaderWrapper from './SidebarHeaderWrapper';
import SidebarUserInfo from './SidebarUserInfo';

const SidebarHeader = () => {
  const { sidebarTextColor } = useSidebarContext();

  return (
    <SidebarHeaderWrapper>
      <AppLogo color={sidebarTextColor} />
      <SidebarUserInfo />
    </SidebarHeaderWrapper>
  );
};

export default SidebarHeader;
SidebarHeader.propTypes = {
  setShowMessage: PropTypes.func,
  setShowNotification: PropTypes.func,
};
