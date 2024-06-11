import {
  colorVariants,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';
import { extendTheme } from '@mui/joy/styles';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

const colors = {
  darkTangerine: '#FFA217',
  gold: '#EBC387',
  pastelOrange: '#F9B249',
  floralWhite: '#FEF8EF',
  rootBeer: '#1D1301',
};
const DEFAULT_PAGE_THEME = 'hello-world';
const DEFAULT_HTML_FONT_SIZE = 16;
const DEFAULT_FONT_FAMILY = 'Inter, Roboto, Helvetica, Arial, sans-serif';

export const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
        },
      },
    },
  },
  fontFamily: {
    display: DEFAULT_FONT_FAMILY,
    body: DEFAULT_FONT_FAMILY,
  },
});

export const backstageTheme = createUnifiedTheme({
  palette: {
    ...palettes.light,
    primary: {
      main: colors.darkTangerine,
    },
    secondary: {
      main: colors.pastelOrange,
    },
    error: {
      main: '#da1313',
    },
    success: {
      main: '#4AB749',
    },
    navigation: {
      background: '#171717',
      indicator: colors.pastelOrange,
      color: '#d5d6db',
      selectedColor: '#ffffff',
    },
    background: {
      default: colors.floralWhite,
    },
  },
  defaultPageTheme: DEFAULT_PAGE_THEME,
  typography: {
    htmlFontSize: DEFAULT_HTML_FONT_SIZE,
    fontFamily: DEFAULT_FONT_FAMILY,
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
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordSpacing: '0.02rem',
          letterSpacing: '0.02rem',
        },
      },
    },
  },
  pageTheme: {
    home: genPageTheme({
      colors: ['#FFA217', colors.pastelOrange],
      shape: shapes.wave,
    }),
    documentation: genPageTheme({
      colors: colorVariants.toastyOrange,
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: colorVariants.rubyRed, shape: shapes.round }),
    service: genPageTheme({
      colors: colorVariants.veryBlue,
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: colorVariants.veryBlue,
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: colorVariants.purpleSky,
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: colorVariants.rubyRed, shape: shapes.wave }),
    app: genPageTheme({ colors: colorVariants.veryBlue, shape: shapes.wave }),
  },
});
