import React, { useEffect, useMemo } from 'react';
import { Icon, ListItemText } from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { checkPermission } from '@crema/helpers/RouteHelper';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import VerticalNavItem from './VerticalNavItem';
import { allowMultiLanguage } from '@crema/constants/AppConst';
import { useLocation } from 'react-router-dom';
import AppBadge from '../../../../AppBadge';
import AppNavLink from '../../../../AppNavLink';

const VerticalItem = ({ level, item }) => {
  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user.role),
    [item.permittedRole, user.role],
  );
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === item.url && document.getElementById(pathname)) {
      setTimeout(() => {
        document
          .getElementById(pathname)
          .scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1);
    }
  }, [pathname]);

  if (!hasPermission) {
    return null;
  }

  return (
    <VerticalNavItem
      level={level}
      button
      id={item.url}
      component={AppNavLink}
      to={item.url}
      activeClassName='active'
      exact={item.exact}
    >
      {item.icon && (
        <Box component='span'>
          <Icon
            sx={{
              fontSize: 18,
              display: 'block',
              mr: 4,
            }}
            className={clsx('nav-item-icon', 'material-icons-outlined')}
            color='action'
          >
            {item.icon}
          </Icon>
        </Box>
      )}
      <ListItemText
        className='nav-item-content'
        primary={
          allowMultiLanguage ? <IntlMessages id={item.messageId} /> : item.title
        }
        classes={{ primary: 'nav-item-text' }}
      />
      {item.count && (
        <Box sx={{ mr: 3.5 }} className='menu-badge'>
          <AppBadge count={item.count} color={item.color} />
        </Box>
      )}
    </VerticalNavItem>
  );
};

VerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    exact: PropTypes.bool,
    messageId: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string,
    color: PropTypes.string,
  }),
  level: PropTypes.number,
};

VerticalItem.defaultProps = {};

export default React.memo(VerticalItem);
