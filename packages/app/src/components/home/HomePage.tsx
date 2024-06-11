import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import GroupIcon from '@mui/icons-material/Group';
import Groups3Icon from '@mui/icons-material/Groups3';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/joy/Button';
import CardActions from '@mui/material/CardActions';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { joyTheme } from '../../theme/HelloWorld';
import { CssVarsProvider } from '@mui/joy/styles';

const coverageData = [
  {
    title: 'Test Certified',
    subtitle: 'Test Coverage',
    percentage: '87%',
    reportLink: 'Go to REPORT',
    reportIcon:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4f6592805bd7f2aa22f4a5040bee943f45ab8b4bf7dee9dff9df12624ded9921?apiKey=4b2fe52306fb4fd5a7594ca31e1b8ad3&',
  },
  {
    title: 'Security Issues',
    subtitle: 'Number of issues',
    value: '234',
    color: 'var(--UI-Orange, #FF9800)',
    reportLink: 'Go to REPORT',
    reportIcon:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4f6592805bd7f2aa22f4a5040bee943f45ab8b4bf7dee9dff9df12624ded9921?apiKey=4b2fe52306fb4fd5a7594ca31e1b8ad3&',
  },
  {
    title: 'Incidents',
    subtitle: 'Past 30 Days',
    value: '3',
    color: 'var(--UI-Green, #1DB954)',
    reportLink: 'Go to REPORT',
    reportIcon:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4f6592805bd7f2aa22f4a5040bee943f45ab8b4bf7dee9dff9df12624ded9921?apiKey=4b2fe52306fb4fd5a7594ca31e1b8ad3&',
  },
  {
    title: 'Deployment Time',
    subtitle: 'Number of successful attempts',
    img: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d382d6a8af2eff64e773fa7c48633402d42fdd6b88002ae8ef8cb61346540aba?apiKey=4b2fe52306fb4fd5a7594ca31e1b8ad3&',
    reportLink: 'Go to REPORT',
    reportIcon:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4f6592805bd7f2aa22f4a5040bee943f45ab8b4bf7dee9dff9df12624ded9921?apiKey=4b2fe52306fb4fd5a7594ca31e1b8ad3&',
  },
];

const CoverageCard: React.FC<{ data: (typeof coverageData)[0] }> = ({
  data,
}) => (
  <Card
    sx={{
      borderRadius: '10px',
      boxShadow:
        '0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(0, 0, 0, 0.20)',
      backgroundColor: '#FFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxHeight: '200px',
      width: '200px',
      px: '16px',
      py: '22px 80px 22px 16px',
      '@media (max-width: 991px)': { paddingRight: '20px' },
    }}
  >
    <CardContent
      sx={
        data.img
          ? {
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }
          : {}
      }
    >
      <Typography
        component="div"
        sx={{
          color: 'var(--UI-Black, #000)',
          fontFeatureSettings: "'clig' off, 'liga' off",
          letterSpacing: '-0.25px',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '133%',
        }}
      >
        {data.title}
      </Typography>
      <Typography
        component="div"
        sx={{
          color: 'var(--UI-Gray-40, #616161)',
          fontFeatureSettings: "'clig' off, 'liga' off",
          letterSpacing: '0.25px',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '167%',
          mt: '11px',
        }}
      >
        {data.subtitle}
      </Typography>
      {data.img && (
        <CardMedia
          component="img"
          loading="lazy"
          src={data.img}
          alt=""
          sx={{
            aspectRatio: '1.41',
            objectFit: 'auto',
            objectPosition: 'center',
            width: '100%',
            my: '20px',
          }}
        />
      )}
      {data.percentage ||
        (data.value && (
          <Typography
            component="div"
            sx={{
              color: data.color || '#000',
              fontFeatureSettings: "'clig' off, 'liga' off",
              letterSpacing: '-1px',
              alignSelf: 'center',
              fontWeight: 700,
              fontSize: data.img ? '48px' : '40px',
              lineHeight: '117%',
              textAlign: 'center',
              '@media (max-width: 991px)': { fontSize: '40px' },
            }}
          >
            {data.percentage || data.value}
          </Typography>
        ))}
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link
        sx={{
          fontFeatureSettings: "'clig' off, 'liga' off",
          letterSpacing: '1px',
          fontWeight: 700,
          color: 'var(--UI-Gray-10, #181818)',
        }}
      >
        {data.reportLink}
      </Link>
      <img
        loading="lazy"
        src={data.reportIcon}
        alt=""
        style={{
          aspectRatio: '1',
          objectPosition: 'center',
          width: '12px',
          fill: '#757575',
          margin: 'auto 0',
        }}
      />
    </CardActions>
  </Card>
);

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#000',
  gap: '10px',
  padding: '20px 40px',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    padding: '0 20px',
  },
}));

const WelcomeMessage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: '#FFF',
});

const WelcomeTitle = styled('div')({
  fontFeatureSettings: "'clig' off, 'liga' off",
  letterSpacing: '-0.5px',
  font: '700 32px Helvetica Neue, sans-serif',
});

const WelcomeSubtitle = styled('div')({
  fontFeatureSettings: "'clig' off, 'liga' off",
  font: '500 14px/143% Helvetica Neue, sans-serif',
});

const OptionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  margin: 'auto 0',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}));

const Option = styled(Paper)(({ theme }) => ({
  borderRadius: '10px',
  borderColor: 'rgba(97, 97, 97, 1)',
  borderStyle: 'solid',
  borderWidth: '1px',
  backgroundColor: '#FFF',
  display: 'flex',
  gap: '16px',
  padding: '16px',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}));

const IconWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});

const OptionText = styled('div')(({ theme }) => ({
  color: '#1D1301',
  fontFeatureSettings: "'clig' off, 'liga' off",
  letterSpacing: '-0.25px',
  flex: '1',
  margin: 'auto 0',
  font: '400 18px/144% Helvetica Neue, sans-serif',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

const HighlightedOption = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  backgroundColor: '#FFA217',
  alignSelf: 'start',
  display: 'flex',
  padding: '13px 16px',
});

export const Homepage = () => {
  const [value, setValue] = React.useState(['default']);
  return (
    <Box>
      <Header>
        <WelcomeMessage>
          <WelcomeTitle>Welcome John!</WelcomeTitle>
          <WelcomeSubtitle>Backstage, the Developer Portal!</WelcomeSubtitle>
        </WelcomeMessage>
        <OptionsContainer>
          <Option>
            <IconWrapper>
              <SearchIcon />
            </IconWrapper>
            <OptionText>Search</OptionText>
          </Option>
          <HighlightedOption>
            <AutoAwesomeIcon />
          </HighlightedOption>
        </OptionsContainer>
      </Header>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <TrackChangesIcon sx={{ width: '48px', height: '48px' }} />
              <Typography variant="h2" sx={{ paddingLeft: '5px' }}>
                Squad Metrics
              </Typography>
            </Box>
            <CssVarsProvider theme={joyTheme}>
              <ToggleButtonGroup
                value={value}
                onChange={(_, newValue) => {
                  setValue(newValue);
                }}
              >
                <Button value={0}>
                  <GroupIcon sx={{ width: '48px', height: '48px' }} />
                  <Typography>Squad</Typography>
                </Button>
                <Button value={1}>
                  <Groups3Icon sx={{ width: '48px', height: '48px' }} />
                  <Typography>Everyone</Typography>
                </Button>
              </ToggleButtonGroup>
            </CssVarsProvider>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {coverageData.map((item, index) => (
              <CoverageCard data={item} />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderLeft: '1px solid #e0e0e0',
          }}
        >
          <Link href="https://backstage.io" target="_blank">
            <HomeIcon />
          </Link>
          <Link href="https://backstage.io" target="_blank">
            <HomeIcon />
          </Link>
          <Link href="https://backstage.io" target="_blank">
            <HomeIcon />
          </Link>
          <Link href="https://backstage.io" target="_blank">
            <HomeIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
