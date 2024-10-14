import React from 'react';
import PropsTypes from 'prop-types';
import SidebarBGWrapper from './SidebarBGWrapper';
import SidebarWrapper from './SidebarWrapper';

const MainSidebar = ({ children }) => {
  return (
    <SidebarWrapper className='app-sidebar'>
      <SidebarBGWrapper>{children}</SidebarBGWrapper>
    </SidebarWrapper>
  );
};

export default MainSidebar;
MainSidebar.propTypes = {
  children: PropsTypes.node,
};
