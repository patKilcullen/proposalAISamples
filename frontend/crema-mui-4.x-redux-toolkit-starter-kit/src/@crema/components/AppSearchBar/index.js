import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {
  SearchIconBox,
  SearchIconWrapper,
  SearchInputBase,
  SearchWrapper,
} from './index.style';

const AppSearch = ({
  placeholder,
  iconPosition,
  align,
  overlap,
  onlyIcon,
  disableFocus,
  iconStyle,
  ...rest
}) => {
  return (
    <SearchWrapper sx={rest.sx} iconPosition={iconPosition}>
      <SearchIconBox
        align={align}
        className={clsx(
          'searchRoot',
          { 'hs-search': overlap },
          { 'hs-disableFocus': disableFocus },
          { searchIconBox: onlyIcon },
        )}
      >
        <SearchIconWrapper
          className={clsx({
            right: true,
          })}
          style={iconStyle}
        >
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInputBase
          {...rest}
          placeholder={placeholder || 'Search…'}
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchIconBox>
    </SearchWrapper>
  );
};

export default AppSearch;

AppSearch.propTypes = {
  iconPosition: PropTypes.string,
  align: PropTypes.string,
  placeholder: PropTypes.string,
  overlap: PropTypes.bool,
  borderLight: PropTypes.bool,
  className: PropTypes.string,
  onlyIcon: PropTypes.bool,
  disableFocus: PropTypes.bool,
  iconStyle: PropTypes.object,
};

AppSearch.defaultProps = {
  onlyIcon: false,
  overlap: true,
  iconPosition: 'left',
  align: 'left',
  iconStyle: {
    color: 'grey',
  },
};
