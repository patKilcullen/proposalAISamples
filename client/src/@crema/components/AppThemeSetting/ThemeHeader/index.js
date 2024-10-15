import React from 'react';
import { CustomizerItemWrapper } from '../index.style';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HeaderType } from '@crema/constants/AppEnums';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '@crema/context/AppContextProvider/LayoutContextProvider';

const ThemeHeader = () => {
  const { headerType } = useLayoutContext();
  const { setHeaderType } = useLayoutActionsContext();

  return (
    <CustomizerItemWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Box component='h4'>Header</Box>
      </Box>
      <FormControl
        variant='outlined'
        sx={{
          width: '100%',
        }}
      >
        <InputLabel id='select-header'>Header Type</InputLabel>
        <Select
          sx={{
            '& .MuiOutlinedInput-input': {
              padding: '12px 32px 12px 14px',
            },
          }}
          labelId='select-header'
          label='Header Type'
          value={headerType}
          labelWidth={100}
          onChange={(e) => setHeaderType(e.target.value)}
        >
          <MenuItem value={HeaderType.FLUID}>Fluid</MenuItem>
          <MenuItem value={HeaderType.FIXED}>Fixed</MenuItem>
        </Select>
      </FormControl>
    </CustomizerItemWrapper>
  );
};

export default ThemeHeader;
