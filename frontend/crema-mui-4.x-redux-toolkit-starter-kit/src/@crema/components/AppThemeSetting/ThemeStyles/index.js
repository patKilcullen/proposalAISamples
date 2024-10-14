import React from 'react';
import { CustomizerItemWrapper, StyledToggleButton } from '../index.style';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeStyle } from '@crema/constants/AppEnums';
import clsx from 'clsx';
import {
  useThemeActionsContext,
  useThemeContext,
} from '@crema/context/AppContextProvider/ThemeContextProvider';

const ThemeStyles = () => {
  const { themeStyle } = useThemeContext();
  const { updateThemeStyle } = useThemeActionsContext();

  const onStyleChange = (event, themeStyle) => {
    if (themeStyle) updateThemeStyle(themeStyle);
  };
  return (
    <CustomizerItemWrapper>
      <Box component='h4' sx={{ mb: 2 }}>
        <IntlMessages id='customizer.themeStyle' />
      </Box>
      <ToggleButtonGroup
        value={themeStyle}
        exclusive={true}
        onChange={onStyleChange}
        aria-label='text alignment'
      >
        <StyledToggleButton
          value={ThemeStyle.MODERN}
          className={clsx({
            active: themeStyle === ThemeStyle.MODERN,
          })}
          aria-label='left aligned'
        >
          <IntlMessages id='sidebar.pages.userList.modern' />
        </StyledToggleButton>
        <StyledToggleButton
          value={ThemeStyle.STANDARD}
          className={clsx({
            active: themeStyle === ThemeStyle.STANDARD,
          })}
          aria-label='centered'
        >
          <IntlMessages id='sidebar.pages.userList.standard' />
        </StyledToggleButton>
      </ToggleButtonGroup>
    </CustomizerItemWrapper>
  );
};

export default ThemeStyles;
