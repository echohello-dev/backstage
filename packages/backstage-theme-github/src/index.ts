import {
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

// GitHub Primer-inspired font stack
const BRAND_FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";

const DEFAULT_HTML_FONT_SIZE = 16;
const typography = {
  htmlFontSize: DEFAULT_HTML_FONT_SIZE,
  fontFamily: BRAND_FONT_FAMILY,
  h1: {
    fontSize: 32 * 1.333,
    fontWeight: 600,
    marginBottom: 16 * 1.333,
  },
  h2: {
    fontSize: 24 * 1.333,
    fontWeight: 600,
    marginBottom: 12 * 1.333,
  },
  h3: {
    fontSize: 20 * 1.333,
    fontWeight: 600,
    marginBottom: 8 * 1.333,
  },
  h4: {
    fontSize: 16 * 1.333,
    fontWeight: 600,
    marginBottom: 4 * 1.333,
  },
  h5: {
    fontSize: 14 * 1.333,
    fontWeight: 600,
    marginBottom: 2 * 1.333,
  },
  h6: {
    fontSize: 12 * 1.333,
    fontWeight: 600,
    marginBottom: 1 * 1.333,
  },
};

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
    // GitHub/Primer dark accent blue (vibrant)
    primary: '#2f81f7',
    secondary: '#a371f7', // Purple accent
    bgDefault: '#0d1117',
    bgPaper: '#161b22',
    textPrimary: '#c9d1d9',
    textSecondary: '#8b949e',
    divider: '#30363d',
    success: '#2ea043',
    warning: '#d29922',
    error: '#f85149',
    info: '#2f81f7',
  },
};

const navigation = {
  light: {
    // GitHub header/nav in light mode is dark
    background: '#24292f',
    indicator: primer.light.primary,
    color: '#d0d7de',
    selectedColor: '#ffffff',
  },
  dark: {
    // GitHub dark surfaces
    background: '#161b22',
    indicator: primer.dark.primary,
    color: '#8b949e',
    selectedColor: '#f0f6fc',
  },
};

export const brandLightTheme = createUnifiedTheme({
  defaultPageTheme: 'home',
  typography,
  palette: {
    ...palettes.light,
    primary: { main: primer.light.primary },
    secondary: { main: primer.light.secondary },
    success: { main: primer.light.success },
    warning: { main: primer.light.warning },
    error: { main: primer.light.error },
    info: { main: primer.light.info },
    background: {
      ...palettes.light.background,
      default: primer.light.bgDefault,
      paper: primer.light.bgPaper,
    },
    divider: primer.light.divider,
    navigation: {
      ...navigation.light,
    },
  },
  pageTheme: {
    home: genPageTheme({
      colors: [navigation.light.background, primer.light.primary],
      shape: shapes.wave2,
    }),
    documentation: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.primary],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.secondary],
      shape: shapes.round,
    }),
    service: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.primary],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.primary],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.secondary],
      shape: shapes.wave,
    }),
    other: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.primary],
      shape: shapes.wave,
    }),
    app: genPageTheme({
      colors: [primer.light.bgDefault, primer.light.primary],
      shape: shapes.wave,
    }),
  },
  components: {
    // Ensure the drawer uses the same nav background (some variants read MUI Drawer styles)
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: navigation.light.background,
          color: navigation.light.color,
          '& .MuiListItemIcon-root': {
            color: 'inherit',
          },
          '& svg': {
            fill: 'currentColor',
          },
          '& .MuiListItemButton-root:hover': {
            backgroundColor: 'rgba(9, 105, 218, 0.10)',
          },
          '& .MuiListItemButton-root.Mui-selected, & .MuiListItemButton-root.Mui-selected:hover':
            {
              backgroundColor: 'rgba(9, 105, 218, 0.18)',
              color: navigation.light.selectedColor,
            },
        },
      },
    },
  },
});

export const brandDarkTheme = createUnifiedTheme({
  defaultPageTheme: 'home',
  typography,
  palette: {
    ...palettes.dark,
    primary: { main: primer.dark.primary },
    secondary: { main: primer.dark.secondary },
    success: { main: primer.dark.success },
    warning: { main: primer.dark.warning },
    error: { main: primer.dark.error },
    info: { main: primer.dark.info },
    background: {
      ...palettes.dark.background,
      default: primer.dark.bgDefault,
      paper: primer.dark.bgPaper,
    },
    divider: primer.dark.divider,
    navigation: {
      ...navigation.dark,
    },
  },
  pageTheme: {
    home: genPageTheme({
      colors: [navigation.dark.background, primer.dark.primary],
      shape: shapes.wave2,
    }),
    documentation: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.primary],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.secondary],
      shape: shapes.round,
    }),
    service: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.primary],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.primary],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.secondary],
      shape: shapes.wave,
    }),
    other: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.primary],
      shape: shapes.wave,
    }),
    app: genPageTheme({
      colors: [primer.dark.bgDefault, primer.dark.primary],
      shape: shapes.wave,
    }),
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: navigation.dark.background,
          color: navigation.dark.color,
          '& .MuiListItemIcon-root': {
            color: 'inherit',
          },
          '& svg': {
            fill: 'currentColor',
          },
          '& .MuiListItemButton-root:hover': {
            backgroundColor: 'rgba(47, 129, 247, 0.10)',
          },
          '& .MuiListItemButton-root.Mui-selected, & .MuiListItemButton-root.Mui-selected:hover':
            {
              backgroundColor: 'rgba(47, 129, 247, 0.18)',
              color: navigation.dark.selectedColor,
            },
        },
      },
    },
  },
});
