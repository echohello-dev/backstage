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

const FeatureCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  border: `3px solid ${theme.palette.text.primary}`,
  backgroundColor: theme.palette.background.paper,
}));

const highlights = [
  {
    title: 'Software templates',
    body: 'Start a service, docs site or AI worker from a template that publishes to GitHub and registers itself in the catalog.',
    link: '/self-service',
    linkLabel: 'Use a template',
  },
  {
    title: 'Software catalog',
    body: 'Every service, API and team in one searchable place, with ownership and lifecycle kept next to the code.',
    link: '/catalog',
    linkLabel: 'Browse services',
  },
  {
    title: 'GitHub integration',
    body: 'Templates open repositories and pull requests, and the catalog stays in sync with what is actually on GitHub.',
    link: '/showcase',
    linkLabel: 'See GitHub integration',
  },
  {
    title: 'Answer engine',
    body: 'Search the catalog and TechDocs in one place. The showcase explains how an answer engine can extend this search foundation.',
    link: '/search',
    linkLabel: 'Search catalog and docs',
  },
];

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

        <Box
          component="section"
          data-testid="landing-highlights"
          sx={{ mt: 6 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
            What you can try
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            {highlights.map(highlight => (
              <FeatureCard key={highlight.title}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {highlight.title}
                </Typography>
                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                  {highlight.body}
                </Typography>
                <Button
                  component={RouterLink}
                  to={highlight.link}
                  variant="text"
                  sx={{
                    alignSelf: 'flex-start',
                    fontWeight: 700,
                    px: 0,
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  {highlight.linkLabel}
                </Button>
              </FeatureCard>
            ))}
          </Box>
        </Box>

        <Box
          component="footer"
          data-testid="landing-footer"
          sx={{
            mt: 6,
            pt: 4,
            borderTop: `3px solid ${theme.palette.text.primary}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Ready to look around?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 640 }}>
            The demo runs as a guest with read-only access, so you can open
            every page without signing up.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/showcase"
              variant="contained"
              sx={{ fontWeight: 700 }}
            >
              Start with the showcase
            </Button>
            <Button
              component={RouterLink}
              to="/catalog"
              variant="outlined"
              sx={{ fontWeight: 700, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
            >
              Open the catalog
            </Button>
          </Box>
        </Box>
      </Content>
    </Page>
  );
};
