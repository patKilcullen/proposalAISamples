import React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { useThemeContext } from '../AppContextProvider/ThemeContextProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AppThemeProvider = (props) => {
  const { theme } = useThemeContext();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {props.children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppThemeProvider;

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
