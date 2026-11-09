import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Page, Content } from '@backstage/core-components';

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(8, 4),
  borderRadius: theme.spacing(1),
  border: `3px solid ${theme.palette.text.primary}`,
  boxShadow: `10px 10px 0 ${theme.palette.text.primary}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 2),
    boxShadow: `6px 6px 0 ${theme.palette.text.primary}`,
  },
}));

const ScreenshotFrame = styled('figure')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  border: `3px solid ${theme.palette.text.primary}`,
  boxShadow: `10px 10px 0 ${theme.palette.text.primary}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    boxShadow: `6px 6px 0 ${theme.palette.text.primary}`,
  },
}));

export const LandingPage = () => {
  const theme = useTheme();

  return (
    <Page themeId="tool">
      <Content>
        <HeroSection data-testid="landing-hero">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', md: '3.25rem' },
              lineHeight: 1.1,
              maxWidth: 800,
            }}
          >
            Everything your developers need, in one portal
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 640 }}
          >
            Software templates that publish to GitHub, a catalog that keeps
            services findable, and an answer engine grounded in your own docs.
            Try it as a guest, no account needed.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/showcase"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 700,
                borderWidth: 2,
                boxShadow: `4px 4px 0 ${theme.palette.text.primary}`,
                '&:hover': { borderWidth: 2 },
              }}
            >
              Explore the showcase
            </Button>
            <Button
              component={RouterLink}
              to="/catalog"
              variant="outlined"
              size="large"
              sx={{ fontWeight: 700, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
            >
              Browse the catalog
            </Button>
          </Box>
        </HeroSection>

        <ScreenshotFrame data-testid="landing-screenshot">
          <Box
            component="img"
            src="/portal-showcase.png"
            alt="The plugin showcase in this portal, listing templates, GitHub integration and the answer engine"
            sx={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: theme.spacing(0.5),
            }}
          />
          <Typography
            component="figcaption"
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1.5 }}
          >
            The plugin showcase running live in this portal.
          </Typography>
        </ScreenshotFrame>
      </Content>
    </Page>
  );
};
