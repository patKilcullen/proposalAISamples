import React, { useState } from 'react';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material';

const SelectBox = styled(Select)(({ theme }) => {
  return {
    marginLeft: 8,
    cursor: 'pointer',
    fontSize: 14,
    height: 24,
    '& .MuiSelect-select': {
      paddingLeft: 5,
      paddingTop: 1,
      paddingBottom: 3,
      color: theme.palette.text.secondary,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.text.secondary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.common.black, 0.03),
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
  };
});

const AppSelect = ({ menus, onChange, defaultValue, selectionKey }) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  const handleSelectionType = (event) => {
    setSelectionType(event.target.value);
    onChange(event.target.value);
  };

  return (
    <SelectBox
      defaultValue={defaultValue}
      value={selectionType}
      onChange={handleSelectionType}
      className='select-box'
    >
      {menus.map((menu, index) => (
        <MenuItem
          key={index}
          value={selectionKey ? menu[selectionKey] : menu}
          sx={{
            cursor: 'pointer',
            p: 2,
            fontSize: 14,
          }}
        >
          {selectionKey ? menu[selectionKey] : menu}
        </MenuItem>
      ))}
    </SelectBox>
  );
};

export default AppSelect;
AppSelect.propTypes = {
  menus: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  selectionKey: PropTypes.string,
};
AppSelect.defaultProps = {
  menus: [],
  defaultValue: '',
  selectionKey: '',
};
