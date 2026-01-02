import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

const BRAND_FONT_FAMILY = 'Inter, Roboto, Helvetica, Arial, sans-serif';

const baseLight = createBaseThemeOptions({ palette: palettes.light });
const baseDark = createBaseThemeOptions({ palette: palettes.dark });

const brandColors = {
  primary: {
    light: '#FF8A2A',
    dark: '#FF9A3D',
  },
  secondary: {
    light: '#F2A65A',
    dark: '#F4B26A',
  },
};

export const brandLightTheme = createUnifiedTheme({
  ...baseLight,
  defaultPageTheme: 'home',
  typography: {
    ...baseLight.typography,
    fontFamily: BRAND_FONT_FAMILY,
  },
  palette: {
    ...baseLight.palette,
    primary: {
      main: brandColors.primary.light,
    },
    secondary: {
      main: brandColors.secondary.light,
    },
  },
});

export const brandDarkTheme = createUnifiedTheme({
  ...baseDark,
  defaultPageTheme: 'home',
  typography: {
    ...baseDark.typography,
    fontFamily: BRAND_FONT_FAMILY,
  },
  palette: {
    ...baseDark.palette,
    primary: {
      main: brandColors.primary.dark,
    },
    secondary: {
      main: brandColors.secondary.dark,
    },
    background: {
      ...baseDark.palette.background,
      default: '#0F1115',
    },
  },
});
