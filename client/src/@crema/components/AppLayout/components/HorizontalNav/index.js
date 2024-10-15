/* eslint-disable react/prop-types */
import React from 'react';
import HorizontalGroup from './HorizontalGroup';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalItem from './HorizontalItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import PropTypes from 'prop-types';

const HorizontalNav = ({ routesConfig }) => {
  return (
    <List className='navbarNav'>
      {routesConfig.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <HorizontalGroup item={item} nestedLevel={0} />
          )}

          {item.type === 'collapse' && (
            <HorizontalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === 'item' && (
            <HorizontalItem item={item} nestedLevel={0} />
          )}

          {item.type === 'divider' && <Divider sx={{ my: 5 }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HorizontalNav;
HorizontalNav.propsTypes = {
  routesConfig: PropTypes.array.isRequired,
};
