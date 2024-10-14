import React, { useState } from 'react';
import { Select, Box } from '@mui/material';
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

const AppSelect = ({ menus }) => {
  return (
    <SelectBox className='select-box'>
      {menus.map((menu, index) => (
        <Box
          key={index}
          sx={{
            cursor: 'pointer',
            p: 2,
            fontSize: 14,
          }}
        >
          {menu?.user}
        </Box>
      ))}
    </SelectBox>
  );
};

export default AppSelect;
