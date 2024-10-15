import React from 'react';
import List from '@mui/material/List';
import GroupItem from './GroupItem';
import makeStyles from '@mui/material/styles/makeStyles';
import PropTypes from 'prop-types';
import routesConfig from '../../../../../../pages/routesConfig';

const useStyles = makeStyles(() => ({
  navRoot: {
    position: 'relative',
    padding: 0,
  },
}));
const MenuGroup = ({ selectedMenu, setSelectedMenu }) => {
  const classes = useStyles();
  return (
    <List className={classes.navRoot} component='div'>
      {routesConfig.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <GroupItem
              item={item}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default MenuGroup;

MenuGroup.propTypes = {
  selectedMenu: PropTypes.object,
  setSelectedMenu: PropTypes.func,
};
