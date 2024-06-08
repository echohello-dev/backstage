import {
  colorVariants,
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

export const HelloWorld = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      primary: {
        main: '#FFA217',
      },
      secondary: {
        main: '#F9B249',
      },
      error: {
        main: '#da1313',
      },
      success: {
        main: '#4AB749',
      },
      navigation: {
        background: '#171717',
        indicator: '#F9B249',
        color: '#d5d6db',
        selectedColor: '#ffffff',
      },
      background: {
        default: '#f7f3f1',
      },
    },
  }),
  defaultPageTheme: 'home',
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
    home: genPageTheme({ colors: ['#FFA217', '#F9B249'], shape: shapes.wave }),
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
