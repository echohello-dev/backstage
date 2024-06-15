import { styled, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import GroupIcon from '@mui/icons-material/Group';
import Groups3Icon from '@mui/icons-material/Groups3';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Input from '@mui/material/Input';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const coverageData = [
  {
    title: 'Test Certified',
    subtitle: 'Test Coverage',
    percentage: '87%',
  },
  {
    title: 'Security Issues',
    subtitle: 'Number of issues',
    value: '234',
  },
  {
    title: 'Incidents',
    subtitle: 'Past 30 Days',
    value: '3',
  },
  {
    title: 'Deployment Time',
    subtitle: 'Number of successful attempts',
  },
];

interface CoverageCardProps {
  title: string;
  subtitle: string;
  value?: string;
  percentage?: number | null;
}

const CoverageCard: React.FC<{ data: CoverageCardProps }> = ({ data }) => (
  <Card
    sx={{
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxHeight: '350px',
      width: '280px',
    }}
  >
    <CardContent>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '133%',
        }}
      >
        {data.title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '167%',
          mt: '11px',
        }}
      >
        {data.subtitle}
      </Typography>
      {data.percentage ||
        (data.value && (
          <Typography
            component="div"
            sx={{
              color: '#000',
              alignSelf: 'center',
              fontWeight: 700,
              lineHeight: '117%',
              textAlign: 'center',
            }}
          >
            {data.percentage || data.value}
          </Typography>
        ))}
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link
        sx={{
          fontWeight: 700,
          color: 'var(--UI-Gray-10, #181818)',
        }}
      >
        Read more
      </Link>
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

const PageHeading: React.FC<{ icon: React.ReactNode; title: string }> = ({
  icon,
  title,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {icon}
    <Typography variant="h2" sx={{ paddingLeft: '.5rem', marginBottom: 0 }}>
      {title}
    </Typography>
  </Box>
);

export const HomePage = () => {
  const [value, setValue] = React.useState(['default']);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            color: '#FFF',
          }}
        >
          <Typography variant="h2" sx={{ marginBottom: 0 }}>
            Welcome John!
          </Typography>
          <Typography variant="subtitle1">
            Backstage, the Developer Portal!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            margin: 'auto 0',
            [theme.breakpoints.down('md')]: {
              flexWrap: 'wrap',
            },
          }}
        >
          <Box
            sx={{
              borderRadius: theme.shape.borderRadius,
              borderColor: 'rgba(97, 97, 97, 1)',
              borderStyle: 'solid',
              borderWidth: '1px',
              backgroundColor: '#FFF',
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap',
              },
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <SearchIcon />
              <Input
                placeholder="Search"
                sx={{
                  width: '50vh',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Header>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: '2rem',
            padding: '2rem',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <PageHeading
              icon={<TrackChangesIcon sx={{ width: '3rem', height: '3rem' }} />}
              title="Squad Metrics"
            />
            <ToggleButtonGroup
              exclusive
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
            >
              <ToggleButton
                sx={{
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                value={0}
              >
                <GroupIcon sx={{ width: 32, height: 32 }} />
                <Typography sx={{ paddingLeft: '10px' }}>Squad</Typography>
              </ToggleButton>
              <ToggleButton
                sx={{
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                value={1}
              >
                <Groups3Icon sx={{ width: 32, height: 32 }} />
                <Typography sx={{ paddingLeft: '10px' }}>Everyone</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
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
