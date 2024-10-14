import {
  Fonts,
  FooterType,
  HeaderType,
  LayoutDirection,
  MenuStyle,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from './AppEnums';

export const textLight = {
  primary: 'rgb(17, 24, 39)',
  secondary: 'rgb(107, 114, 128)',
  disabled: 'rgb(149, 156, 169)',
};

export const textDark = {
  primary: 'rgb(255,255,255)',
  secondary: 'rgb(229, 231, 235)',
  disabled: 'rgb(156, 163, 175)',
};

export const backgroundDark = {
  paper: '#2B3137',
  default: '#1F2527',
};

export const backgroundLight = {
  paper: '#FFFFFF',
  default: '#F4F7FE',
};

const cardRadius = ThemeStyleRadius.STANDARD;
export const defaultTheme = {
  theme: {
    spacing: 4,
    cardRadius: cardRadius,
     direction: LayoutDirection.LTR, //ltr, rtl
    //  direction: LayoutDirection.LTL, //ltr, rtl
    palette: {
      mode: process.env.REACT_APP_THEME_MODE,
      background: {
        paper: '#FFFFFF',
        default: '#F4F7FE',
      },
      primary: {
        main: process.env.REACT_APP_PRIMARY_COLOR,
        contrastText: '#fff',
      },
      secondary: {
        main: process.env.REACT_APP_SECONDARY_COLOR,
      },
      success: {
        main: '#11C15B',
        light: '#D9F5E5',
      },
      warning: {
        main: '#FF5252',
        light: '#FFECDC',
      },
      text: textLight,
      gray: {
        50: '#fafafa',
        100: '#F5F6FA',
        200: '#edf2f7',
        300: '#E0E0E0',
        400: '#c5c6cb',
        500: '#A8A8A8',
        600: '#666666',
        700: '#4a5568',
        800: '#201e21',
        900: '#1a202c',
        A100: '#d5d5d5',
        A200: '#aaaaaa',
        A400: '#303030',
        A700: '#616161',
      },
    },
    status: {
      danger: 'orange',
    },
    divider: 'rgba(224, 224, 224, 1)',
    typography: {
      fontFamily: ['Be Vietnam', 'sans-serif'].join(','),
      fontSize: 14,
      fontWeight: 400,
      h1: {
        fontSize: 22,
        fontWeight: 600,
      },
      h2: {
        fontSize: 20,
        fontWeight: 500,
      },
      h3: {
        fontSize: 18,
        fontWeight: 500,
      },
      h4: {
        fontSize: 16,
        fontWeight: 500,
      },
      h5: {
        fontSize: 14,
        fontWeight: 500,
      },
      h6: {
        fontSize: 12,
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: 14,
      },
      subtitle2: {
        fontSize: 16,
      },
      body1: {
        fontSize: 14,
      },
      body2: {
        fontSize: 12,
      },
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius,
          },
        },
      },
      MuiCardLg: {
        styleOverrides: {
          root: {
            // apply theme's border-radius instead of component's default
            borderRadius:
              cardRadius === ThemeStyleRadius.STANDARD
                ? ThemeStyleRadius.STANDARD
                : ThemeStyleRadius.MODERN + 20,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius,
            boxShadow: '0px 10px 10px 4px rgba(0, 0, 0, 0.04)',
            // '& .MuiCardContent-root:last-of-type': {
            //   paddingBottom: 16,
            // },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius / 2,
            // boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
            textTransform: 'capitalize',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius / 2,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius / 2,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 9,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: Fonts.REGULAR,
          },
        },
      },
    },
  },
};
export const DarkSidebar = {
  sidebarBgColor: '#313541',
  sidebarTextColor: '#fff',
  sidebarHeaderColor: '#313541',
  sidebarMenuSelectedBgColor: '#F4F7FE',
  sidebarMenuSelectedTextColor: 'rgba(0, 0, 0, 0.87)',
  mode: ThemeMode.DARK,
};
export const LightSidebar = {
  sidebarBgColor: '#fff',
  sidebarTextColor: 'rgba(0, 0, 0, 0.60)',
  sidebarHeaderColor: '#fff',
  sidebarMenuSelectedBgColor: '#F4F7FE',
  sidebarMenuSelectedTextColor: 'rgba(0, 0, 0, 0.87)',
  mode: ThemeMode.LIGHT,
};
const defaultConfig = {
  sidebar: {
    borderColor: '#757575',
    menuStyle: MenuStyle.DEFAULT,
    allowSidebarBgImage: false,
    sidebarBgImageId: 1,
    colorSet: LightSidebar,
  },
  themeStyle: ThemeStyle.STANDARD,
  themeMode: process.env.REACT_APP_THEME_MODE,
  navStyle: process.env.REACT_APP_NAV_STYLE,
  layoutType: process.env.REACT_APP_LAYOUT_TYPE,
  footerType: FooterType.FLUID,
  headerType: HeaderType.FIXED,
  footer: false,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  rtlLocale: ['ar'],
};
export default defaultConfig;
