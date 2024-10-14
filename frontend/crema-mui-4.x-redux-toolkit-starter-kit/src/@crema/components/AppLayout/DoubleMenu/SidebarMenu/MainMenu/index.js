import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import VerticalItem from './VerticalItem';
import VerticalCollapse from './VerticalCollapse';
import List from '@mui/material/List';
import makeStyles from '@mui/material/styles/makeStyles';
import { checkPermission } from '@crema/helpers/RouteHelper';

const useStyles = makeStyles(() => ({
  listRoot: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 18,
  },
}));

const MainMenu = ({ item }) => {
  const classes = useStyles();
  const { user } = useSelector(({ auth }) => auth);
  const hasPermission = useMemo(
    () => checkPermission(item.auth, user.role),
    [item.auth, user.role],
  );
  if (!hasPermission) {
    return null;
  }
  return (
    <React.Fragment>
      {item.children && (
        <List component='div' className={classes.listRoot}>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {/*{item.type === 'group' && (*/}
              {/*   <NavVerticalGroup item={item} level={0} />*/}
              {/*)}*/}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={0} />
              )}

              {item.type === 'item' && <VerticalItem item={item} level={0} />}
            </React.Fragment>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};
MainMenu.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    auth: PropTypes.object,
    exact: PropTypes.bool,
    messageId: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.array,
  }),
  level: PropTypes.number,
};

MainMenu.defaultProps = {};

export default React.memo(MainMenu);
