import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';

// GitHub Primer-inspired font stack
const BRAND_FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";

// Primer-inspired color tokens
const primer = {
  light: {
    primary: '#0969da', // Blue
    secondary: '#8250df', // Purple accent
    bgDefault: '#f6f8fa',
    bgPaper: '#ffffff',
    textPrimary: '#24292f',
    textSecondary: '#57606a',
    divider: '#d0d7de',
    success: '#1a7f37',
    warning: '#9a6700',
    error: '#cf222e',
    info: '#0969da',
  },
  dark: {
    primary: '#58a6ff', // Blue
    secondary: '#a371f7', // Purple accent
    bgDefault: '#0d1117',
    bgPaper: '#161b22',
    textPrimary: '#c9d1d9',
    textSecondary: '#8b949e',
    divider: '#30363d',
    success: '#2ea043',
    warning: '#d29922',
    error: '#f85149',
    info: '#58a6ff',
  },
};

const baseLight = createBaseThemeOptions({ palette: palettes.light });
const baseDark = createBaseThemeOptions({ palette: palettes.dark });

export const brandLightTheme = createUnifiedTheme({
  ...baseLight,
  defaultPageTheme: 'home',
  typography: {
    ...baseLight.typography,
    fontFamily: BRAND_FONT_FAMILY,
  },
  palette: {
    ...baseLight.palette,
    primary: { main: primer.light.primary },
    secondary: { main: primer.light.secondary },
    success: { main: primer.light.success },
    warning: { main: primer.light.warning },
    error: { main: primer.light.error },
    info: { main: primer.light.info },
    background: {
      ...baseLight.palette.background,
      default: primer.light.bgDefault,
      paper: primer.light.bgPaper,
    },
    divider: primer.light.divider,
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
    primary: { main: primer.dark.primary },
    secondary: { main: primer.dark.secondary },
    success: { main: primer.dark.success },
    warning: { main: primer.dark.warning },
    error: { main: primer.dark.error },
    info: { main: primer.dark.info },
    background: {
      ...baseDark.palette.background,
      default: primer.dark.bgDefault,
      paper: primer.dark.bgPaper,
    },
    divider: primer.dark.divider,
  },
});
