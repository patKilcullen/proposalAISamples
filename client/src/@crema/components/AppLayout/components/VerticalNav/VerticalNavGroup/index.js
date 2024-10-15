import React, { useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalCollapse from '../VerticalCollapse';
import VerticalItem from '../VerticalItem';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import VerticalNavGroupItem from './VerticalNavGroupItem';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { checkPermission } from '@crema/helpers/RouteHelper';
import { allowMultiLanguage } from '@crema/constants/AppConst';

const VerticalNavGroup = ({ item, level }) => {
  const { sidebarTextColor } = useSidebarContext();
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
      <VerticalNavGroupItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        component='div'
        className={clsx('nav-item nav-item-header')}
      >
        {allowMultiLanguage ? <IntlMessages id={item.messageId} /> : item.title}
      </VerticalNavGroupItem>

      {item.children && (
        <>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'group' && (
                <NavVerticalGroup item={item} level={level} />
              )}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

VerticalNavGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    messageId: PropTypes.string,
    children: PropTypes.array,
  }),
  level: PropTypes.number,
};

VerticalNavGroup.defaultProps = {};

const NavVerticalGroup = VerticalNavGroup;

export default NavVerticalGroup;
