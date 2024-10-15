import React, { useEffect, useMemo, useState } from 'react';
import { Collapse, Icon, IconButton, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalItem from '../VerticalItem';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { checkPermission } from '@crema/helpers/RouteHelper';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import VerticalCollapseItem from './VerticalCollapseItem';
import { allowMultiLanguage } from '@crema/constants/AppConst';

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
  const { theme } = useThemeContext();
  const { sidebarTextColor } = useSidebarContext();
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

  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user.role),
    [item.permittedRole, user.role],
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <>
      <VerticalCollapseItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        button
        component='div'
        className={clsx('menu-vertical-collapse', open && 'open')}
        onClick={handleClick}
      >
        {item.icon && (
          <Box component='span'>
            <Icon
              sx={{ mr: 4 }}
              color='action'
              className={clsx('nav-item-icon')}
            >
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 14,
          }}
          className='nav-item-content'
          classes={{ primary: clsx('nav-item-text') }}
          primary={
            allowMultiLanguage ? (
              <IntlMessages id={item.messageId} />
            ) : (
              item.title
            )
          }
        />
        <IconButton
          className='nav-item-icon-arrow-btn'
          sx={{ p: 0, mr: 0.75 }}
          disableRipple
          size='large'
        >
          <Icon className='nav-item-icon-arrow' color='inherit'>
            {open
              ? 'expand_more'
              : theme.direction === 'ltr'
              ? 'chevron_right'
              : 'chevron_left'}
          </Icon>
        </IconButton>
      </VerticalCollapseItem>

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
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    children: PropTypes.array,
    messageId: PropTypes.string,
    type: PropTypes.string,
  }),
  level: PropTypes.number,
};
VerticalCollapse.defaultProps = {};

export default React.memo(VerticalCollapse);
