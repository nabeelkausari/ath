import { createTheme } from '@mui/material';

export const PALETTE_PRIMARY_DARK = '#223280';
export const PALETTE_PRIMARY_MAIN = '#2D43AA';
export const PALETTE_SECONDARY_LIGHT = '#F1F3FF';
export const PALETTE_SECONDARY_MAIN = '#E4EAFF';
export const PALETTE_SECONDARY_DARK = '#dee3ff';
export const PALETTE_HIGHLIGHT_MAIN = '#3DDF87';
export const PALETTE_SUCCESS_MAIN = '#2EA765';
export const PALETTE_TEXT_MAIN = '#14215B';
export const PALETTE_TEXT_SECONDARY = '#727A9D';
export const PALETTE_YELLOW_DARK = '#AA8713';
export const PALETTE_YELLOW_MAIN = '#E3B419';
export const PALETTE_YELLOW_LIGHT = '#F9F0D1';
export const PALETTE_GREEN_MAIN = '#1F7044';
export const PALETTE_GREEN_SECONDARY = '#D8F9E7';
export const PALETTE_BORDER_MAIN = '#D5D9EE';
export const PALETTE_BORDER_LIGHT = '#EFEFEF';
export const PALETTE_BACKGROUND_SECONDARY = '#F8FAFF';
export const PALETTE_BACKGROUND_MAIN = '#FBFCFD';
export const PALETTE_BACKGROUND_LIGHT = '#FBFBFB';
export const PALETTE_BACKGROUND_DARK = '#F5F5F5';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 720,
      sm: 960,
      md: 1085,
      lg: 1500,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    color: PALETTE_TEXT_MAIN,
  },
  palette: {
    mode: 'light',
    primary: {
      main: PALETTE_PRIMARY_MAIN,
      dark: PALETTE_PRIMARY_DARK,
    },
    secondary: {
      main: PALETTE_SECONDARY_MAIN,
      dark: PALETTE_SECONDARY_DARK,
      light: PALETTE_SECONDARY_LIGHT,
    },
    text: {
      primary: PALETTE_TEXT_MAIN,
      secondary: PALETTE_TEXT_SECONDARY,
    },
    highlight: {
      main: PALETTE_HIGHLIGHT_MAIN,
    },
    success: {
      main: PALETTE_SUCCESS_MAIN,
    },
    yellow: {
      main: PALETTE_YELLOW_DARK,
      secondary: PALETTE_YELLOW_LIGHT,
    },
    green: {
      main: PALETTE_GREEN_MAIN,
      secondary: PALETTE_GREEN_SECONDARY,
    },
    border: {
      main: PALETTE_BORDER_MAIN,
      light: PALETTE_BORDER_LIGHT,
    },
    background: {
      main: PALETTE_BACKGROUND_MAIN,
      secondary: PALETTE_BACKGROUND_SECONDARY,
      light: PALETTE_BACKGROUND_LIGHT,
      dark: PALETTE_BACKGROUND_DARK,
    },
  },
  props: {
    MuiAppBar: {
      color: 'secondary',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          '&.MuiInputBase-multiline': {
            paddingTop: 20,
            paddingBottom: 20,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: '500',
          borderRadius: '50px',
          letterSpacing: '0px',
          '&.MuiButton-sizeMedium': {
            fontSize: '14px',
            padding: '8px 18px',
          },
          '&.MuiButton-sizeSmall': {
            fontSize: '12px',
            padding: '7px 15px',
          },
          '&.MuiButton-contained-secondary': {
            borderColor: PALETTE_SECONDARY_LIGHT,
            backgroundColor: PALETTE_SECONDARY_LIGHT,
          },
          '&.MuiButtonGroup-grouped': {
            borderRadius: 5,
            borderColor: PALETTE_SECONDARY_MAIN,
            '&:hover': {
              borderColor: PALETTE_SECONDARY_MAIN,
            },
          },
          '&.MuiButton-outlined': {
            padding: '7px 18px',
          },
          '&.MuiButton-text:hover': {
            backgroundColor: 'transparent',
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  sections: {
    dashboard: {
      leftSection: {
        width: '26%',
        minWidth: '49vh',
        padding: '2.6vh 2.6vh 3.12vh 2.86vh',
      },
      rightSection: {
        flex: 1,
        padding: '2.6vh 2.4vh 0 0',
      },
    },
  },
});

export default theme;
