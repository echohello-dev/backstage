import {
  createTheme,
  styled,
  Theme,
  ThemeProvider,
  useTheme,
} from '@mui/material/styles';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import GroupIcon from '@mui/icons-material/Group';
import Groups3Icon from '@mui/icons-material/Groups3';
import HomeIcon from '@mui/icons-material/Home';
import React, { useRef } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import TextField from '@mui/material/TextField';
import SlackIcon from '../icons/Slack';
import GrafanaIcon from '../icons/Grafana';
import ConfluenceIcon from '../icons/Confluence';
import BitbucketIcon from '../icons/Bitbucket';
import AwsIcon from '../icons/Aws';
import AzureIcon from '../icons/Azure';
import DiscordIcon from '../icons/Discord';
import Button from '@mui/material/Button/Button';

const SearchTextField = styled(TextField)(({ theme }) => {
  return {
    width: '50vh',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
  };
});

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
  const [isSquad, setIsSquad] = React.useState(true);
  const theme = useTheme();

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const months = [
    new Date(2021, 7, 1),
    new Date(2021, 8, 1),
    new Date(2021, 9, 1),
    new Date(2021, 10, 1),
    new Date(2021, 11, 1),
  ];

  const serviceHealthSeries = [
    {
      data: [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ],
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
    },
  ];

  const costSeries = [
    {
      label: 'Compute',
      data: [1000, 2000, 7000, 6500, 8000],
      stack: 'total',
      area: true,
      showMark: false,
      valueFormatter: (value: number | bigint) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value),
    },
    {
      label: 'Databases',
      data: [2000, 4000, 8000, 7500, 9000],
      stack: 'total',
      area: true,
      showMark: false,
      valueFormatter: (value: number | bigint) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value),
    },
  ];

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
            margin: 'auto 0',
            [theme.breakpoints.down('lg')]: {
              display: 'none',
            },
          }}
        >
          <ThemeProvider
            theme={(parentTheme: Theme) =>
              createTheme({
                ...parentTheme,
                components: {
                  MuiFilledInput: {
                    styleOverrides: {
                      root: {
                        '&::before, &::after': {
                          borderBottom: 'none',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                          borderBottom: 'none',
                        },
                        '&.Mui-focused:after': {
                          borderBottom: 'none',
                        },
                      },
                    },
                  },
                },
              })
            }
          >
            <SearchTextField label="Search" variant="filled" />
          </ThemeProvider>
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
              value={isSquad}
              onChange={(_, newValue) => {
                setIsSquad(newValue);
              }}
            >
              <ToggleButton
                sx={{
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                value
              >
                <GroupIcon sx={{ width: 32, height: 32 }} />
                <Typography sx={{ paddingLeft: '10px' }}>Squad</Typography>
              </ToggleButton>
              <ToggleButton
                sx={{
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                value={false}
              >
                <Groups3Icon sx={{ width: 32, height: 32 }} />
                <Typography sx={{ paddingLeft: '10px' }}>Everyone</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              position: 'relative',
              width: '960px',
              [theme.breakpoints.down('lg')]: {
                width: '768px',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '128px',
                pointerEvents: 'none',
                background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
                zIndex: 2,
              }}
            />
            <Box
              sx={{
                position: 'relative',
                overflowY: 'scroll',
                overflowX: 'visible',
                paddingBottom: '2px',
                width: '960px',
                [theme.breakpoints.down('lg')]: {
                  width: '768px',
                },
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none', // IE and Edge
                scrollbarWidth: 'none', // Firefox
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  gap: '20px',
                }}
              >
                <Card
                  sx={{
                    borderRadius: '10px',
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '280px',
                    zIndex: 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Incidents</Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      3
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Link
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      <Typography variant="subtitle2">View more</Typography>
                    </Link>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    borderRadius: '10px',
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '280px',
                    zIndex: 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Deployment Time</Typography>
                    <Typography variant="h2" component="div">
                      3 days
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      Since the last deployment
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Link
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      <Typography variant="subtitle2">View more</Typography>
                    </Link>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    borderRadius: '10px',
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '280px',
                    zIndex: 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Service Health</Typography>
                    <PieChart
                      series={serviceHealthSeries}
                      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      slotProps={{ legend: { hidden: true } }}
                      height={200}
                    />
                  </CardContent>
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Link
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      <Typography variant="subtitle2">View more</Typography>
                    </Link>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    borderRadius: '10px',
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '280px',
                    zIndex: 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Cost Overview</Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      <LineChart
                        xAxis={[
                          {
                            id: 'Months',
                            data: months,
                            scaleType: 'time',
                            valueFormatter: date => date.getMonth().toString(),
                          },
                        ]}
                        // @ts-ignore
                        series={costSeries}
                        height={280}
                        leftAxis={null}
                        bottomAxis={null}
                        slotProps={{ legend: { hidden: true } }}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      />
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Link
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      <Typography variant="subtitle2">View more</Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Box>
            </Box>
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
          <Button
            href="https://example.echohello.dev/slack"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <SlackIcon width={32} height={32} />
          </Button>
          <Button
            href="https://example.echohello.dev/slack"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <DiscordIcon width={32} height={32} />
          </Button>
          <Button
            href="https://backstage.io"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <GrafanaIcon width={32} height={32} />
          </Button>
          <Button
            href="https://backstage.io"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <ConfluenceIcon width={32} height={32} />
          </Button>
          <Button
            href="https://backstage.io"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <BitbucketIcon width={32} height={32} />
          </Button>
          <Button
            href="https://backstage.io"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <AwsIcon width={32} height={32} />
          </Button>
          <Button
            href="https://backstage.io"
            target="_blank"
            sx={{ padding: '1rem' }}
          >
            <AzureIcon width={32} height={32} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
