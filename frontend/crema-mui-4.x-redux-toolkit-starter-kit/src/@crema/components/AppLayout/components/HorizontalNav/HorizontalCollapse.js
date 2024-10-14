import React, { useState } from 'react';
import {
  Grow,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Manager, Popper, Reference } from 'react-popper';
import * as ReactDOM from 'react-dom';
import HorizontalItem from './HorizontalItem';
import HorizontalGroup from './HorizontalGroup';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import List from '@mui/material/List';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { useLocation } from 'react-router-dom';
import { allowMultiLanguage } from '@crema/constants/AppConst';

function HorizontalCollapse(props) {
  const [opened, setOpened] = useState(false);
  const { theme } = useThemeContext();
  const location = useLocation();
  const { item, nestedLevel, dense } = props;
  const active = isUrlInChildren(item, location.pathname);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } =
    useSidebarContext();

  const handleToggle = (open) => {
    setOpened(open);
  };

  function isUrlInChildren(parent, url) {
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
  }

  return (
    <List
      sx={{
        py: 0,
        '& .list-item-text': {
          padding: '0 0 0 16px',
        },
      }}
      className='navbarNavSubmenu'
    >
      <Manager>
        <Reference>
          {({ ref }) => (
            <ListItem
              ref={ref}
              button
              sx={{
                color: theme.palette.text.primary,
                padding: '0px 12px',
                '&.active, &.active:hover, &.active:focus': {
                  backgroundColor: sidebarMenuSelectedBgColor + '!important',
                  color: sidebarMenuSelectedTextColor + '!important',
                },
                '&.open': {
                  backgroundColor: 'rgba(0,0,0,.08)',
                },
                '&.dense': {
                  padding: '0px 12px',
                  '& .list-item-text': {
                    padding: '0 0 0 8px',
                  },
                },
              }}
              className={clsx(
                'navItemSubmenu',
                opened && 'open',
                dense && 'dense',
                active && 'active',
              )}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
              aria-owns={opened ? 'menu-list-grow' : null}
              aria-haspopup='true'
            >
              {item.icon && (
                <Icon
                  sx={{
                    color: active ? sidebarMenuSelectedTextColor : 'action',
                    mr: 3.5,
                    fontSize: { xs: 16, xl: 18 },
                  }}
                >
                  {item.icon}
                </Icon>
              )}
              <ListItemText
                className='navLinkTextSubmenu'
                primary={
                  allowMultiLanguage ? (
                    <IntlMessages id={item.messageId} />
                  ) : (
                    item.title
                  )
                }
              />
              <Box p={0}>
                <IconButton disableRipple>
                  <Icon
                    sx={{
                      color: active ? sidebarMenuSelectedTextColor : 'action',
                    }}
                  >
                    {theme.direction === 'ltr'
                      ? 'chevron_right'
                      : 'chevron_left'}
                  </Icon>
                </IconButton>
              </Box>
            </ListItem>
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper placement='right' eventsEnabled={opened} positionFixed>
            {({ ref, style, placement }) =>
              opened && (
                <Box
                  ref={ref}
                  sx={{
                    boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
                    zIndex: 1110 + nestedLevel + 1,
                    ...style,
                    '& .popperClose': {
                      pointerEvents: 'none',
                    },
                  }}
                  data-placement={placement}
                  className={clsx({
                    popperClose: !opened,
                  })}
                >
                  <Grow
                    in={opened}
                    id='menu-list-grow'
                    sx={{ transformOrigin: '0 0 0' }}
                  >
                    <Paper
                      onMouseEnter={() => handleToggle(true)}
                      onMouseLeave={() => handleToggle(false)}
                    >
                      {item.children && (
                        <List
                          sx={{
                            px: 0,
                          }}
                        >
                          {item.children.map((item) => (
                            <React.Fragment key={item.id}>
                              {item.type === 'group' && (
                                <HorizontalGroup
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                />
                              )}

                              {item.type === 'collapse' && (
                                <HorizontalCollapse
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                  location={location}
                                />
                              )}

                              {item.type === 'item' && (
                                <HorizontalItem
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                />
                              )}
                            </React.Fragment>
                          ))}
                        </List>
                      )}
                    </Paper>
                  </Grow>
                </Box>
              )
            }
          </Popper>,
          document.querySelector('#root'),
        )}
      </Manager>
    </List>
  );
}

export default React.memo(HorizontalCollapse);

HorizontalCollapse.propTypes = {
  item: PropTypes.object,
  nestedLevel: PropTypes.number,
  location: PropTypes.object,
  dense: PropTypes.number,
};

HorizontalCollapse.defaultProps = {};
