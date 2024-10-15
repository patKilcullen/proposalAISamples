import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import defaultConfig, {
  backgroundDark,
  backgroundLight,
  defaultTheme,
  textDark,
  textLight,
} from '@crema/constants/defaultConfig';
import PropTypes from 'prop-types';
import { LayoutDirection, ThemeMode } from '@crema/constants/AppEnums';

const ThemeContext = createContext({
  theme: defaultTheme.theme,
  themeStyle: defaultConfig.themeStyle,
  themeMode: defaultConfig.themeMode,
});
const ThemeActionsContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const useThemeActionsContext = () => useContext(ThemeActionsContext);

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme.theme);
  const [themeMode, updateThemeMode] = useState(defaultConfig.themeMode);
  const [themeStyle, updateThemeStyle] = useState(defaultConfig.themeStyle);

  const updateTheme = useCallback((theme) => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (theme.palette.mode !== themeMode) {
      theme.palette.mode =
        themeMode === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT;
      theme.palette.background =
        themeMode === ThemeMode.DARK ? backgroundDark : backgroundLight;
      theme.palette.text = themeMode === ThemeMode.DARK ? textDark : textLight;
      updateTheme({ ...theme });
    }
  }, [themeMode, theme, updateTheme]);

  useEffect(() => {
    if (theme.direction === LayoutDirection.RTL) {
      document.body.setAttribute('dir', LayoutDirection.RTL);
    } else {
      document.body.setAttribute('dir', LayoutDirection.LTR);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle,
        themeMode,
      }}
    >
      <ThemeActionsContext.Provider
        value={{
          updateTheme,
          updateThemeStyle,
          updateThemeMode,
        }}
      >
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
