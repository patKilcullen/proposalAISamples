import React from 'react';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import useStyles from './AppSidebarMenu.style';
import AppScrollbar from '../../AppScrollbar';
import MenuGroup from './SidebarMenu/MenuGroup';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';

const AppSidebarMenu = (props) => {
  const { themeMode } = useThemeContext();

  const classes = useStyles({ themeMode });
  let sidebarClasses = classes.sidebarStandard;
  return (
    <>
      <Hidden lgUp>
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
          <Box className={clsx(classes.appSidebarMenuRoot, 'app-sidebar-menu')}>
            <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
              <AppScrollbar className={classes.drawerScrollAppSidebar}>
                <MenuGroup
                  selectedMenu={props.selectedMenu}
                  setSelectedMenu={props.setSelectedMenu}
                />
              </AppScrollbar>
            </Box>
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Box
          height='100%'
          className={clsx(classes.appSidebarMenuRoot, 'app-sidebar-menu')}
        >
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <AppScrollbar className={classes.scrollAppSidebar}>
              <MenuGroup
                selectedMenu={props.selectedMenu}
                setSelectedMenu={props.setSelectedMenu}
              />
            </AppScrollbar>
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default AppSidebarMenu;

AppSidebarMenu.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebarMenu.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
  selectedMenu: PropTypes.object,
  setSelectedMenu: PropTypes.func,
  toggleNavCollapsed: PropTypes.func,
  isNavCollapsed: PropTypes.bool,
};
