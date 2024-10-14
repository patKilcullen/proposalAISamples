import React, { useMemo } from 'react';
import { Icon, ListItem } from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import IntlMessages from '@crema/helpers/IntlMessages';
import useStyles from './GroupItem.style';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { checkPermission } from '@crema/helpers/RouteHelper';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';

const GroupItem = ({ item, setSelectedMenu, selectedMenu }) => {
  const { themeMode } = useThemeContext();
  const classes = useStyles({ themeMode });
  const { user } = useSelector(({ auth }) => auth);
  const hasPermission = useMemo(
    () => checkPermission(item.auth, user.role),
    [item.auth, user.role],
  );
  if (!hasPermission) {
    return null;
  }
  return (
    <ListItem
      component='div'
      onClick={() => setSelectedMenu(item)}
      className={clsx(classes.navItem, 'nav-item', {
        open: selectedMenu.id === item.id,
      })}
    >
      {item.icon && (
        <Icon
          className={clsx(classes.listIcon, 'nav-item-icon')}
          color='action'
        >
          {item.icon}
        </Icon>
      )}
      <Box
        component='span'
        className={clsx(classes.navItemText, 'nav-item-text')}
      >
        <IntlMessages id={item.messageId} />
      </Box>
    </ListItem>
  );
};

GroupItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    auth: PropTypes.object,
    messageId: PropTypes.string,
    children: PropTypes.array,
  }),

  selectedMenu: PropTypes.object,
  setSelectedMenu: PropTypes.func,
};

GroupItem.defaultProps = {};

export default GroupItem;
