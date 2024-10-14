import React, { useEffect, useMemo, useState } from 'react';
import {
  Collapse,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalItem from './VerticalItem';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import useStyles from './VerticalCollapase.style';
import { useSelector } from 'react-redux';
import { checkPermission } from '@crema/helpers/RouteHelper';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';

const needsToBeOpened = (pathname, item) => {
  return pathname && isUrlInChildren(item, pathname);
};

const isUrlInChildren = (parent, url) => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }

    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url)
    ) {
      return true;
    }
  }

  return false;
};

const VerticalCollapse = ({ item, level }) => {
  const { themeMode, theme } = useThemeContext();
  const classes = useStyles({ level, themeMode });
  const { pathname } = useLocation();
  const [open, setOpen] = useState(() => needsToBeOpened(pathname, item));

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    }
  }, [pathname, item]);

  const handleClick = () => {
    setOpen(!open);
  };

  const { user } = useSelector(({ auth }) => auth);
  const hasPermission = useMemo(
    () => checkPermission(item.auth, user.role),
    [item.auth, user.role],
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <>
      <ListItem
        button
        component='div'
        className={clsx(classes.navItem, 'nav-item', { open: open })}
        onClick={handleClick}
      >
        {item.icon && (
          <Box component='span' mr={3.25}>
            <Icon
              color='action'
              className={clsx('nav-item-icon', classes.listIcon)}
            >
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          classes={{ primary: clsx('nav-item-text', classes.listItemText) }}
          primary={<IntlMessages id={item.messageId} />}
        />
        <IconButton disableRipple sx={{ p: 0 }}>
          <Icon className='nav-item-icon-arrow' color='inherit'>
            {open
              ? 'expand_more'
              : theme.direction === 'ltr'
              ? 'chevron_right'
              : 'chevron_left'}
          </Icon>
        </IconButton>
      </ListItem>

      {item.children && (
        <Collapse in={open} className='collapse-children'>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level + 1} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level + 1} />
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </>
  );
};

VerticalCollapse.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    auth: PropTypes.object,
    children: PropTypes.array,
    messageId: PropTypes.string,
    type: PropTypes.string,
  }),
  level: PropTypes.number,
};
VerticalCollapse.defaultProps = {};

export default React.memo(VerticalCollapse);
