import React from 'react';
import List from '@mui/material/List';

import NavVerticalGroup from './VerticalNavGroup';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import PropTypes from 'prop-types';

const VerticalNav = ({ routesConfig }) => {
  return (
    <List
      sx={{
        position: 'relative',
        padding: 0,
      }}
      component='div'
    >
      {routesConfig.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && <NavVerticalGroup item={item} level={0} />}

          {item.type === 'collapse' && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type === 'item' && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default VerticalNav;
VerticalNav.propTypes = {
  routesConfig: PropTypes.array.isRequired,
};
