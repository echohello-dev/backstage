import {
  createTheme,
  styled,
  Theme,
  ThemeProvider,
  useTheme,
} from '@mui/material/styles';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import GroupIcon from '@mui/icons-material/Group';
import Groups3Icon from '@mui/icons-material/Groups3';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import TextField from '@mui/material/TextField';
import SlackIcon from '../icons/Slack';
import GrafanaIcon from '../icons/Grafana';
import ConfluenceIcon from '../icons/Confluence';
import BitbucketIcon from '../icons/Bitbucket';
import AwsIcon from '../icons/Aws';
import AzureIcon from '../icons/Azure';
import DiscordIcon from '../icons/Discord';
import Button from '@mui/material/Button';
import { Page } from '@backstage/core-components';
import Chip from '@mui/material/Chip';

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
  backgroundImage: theme.page.backgroundImage,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
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

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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
        {
          id: 0,
          value: 10,
          label: 'Uptime',
          color: theme.palette.success.main,
        },
        {
          id: 1,
          value: 1,
          label: 'Downtime',
          color: theme.palette.error.main,
        },
      ],
      innerRadius: 30,
      paddingAngle: 5,
      cornerRadius: 5,
    },
  ];

  const costSeries = [
    {
      id: '1',
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
      id: '2',
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
    <Page themeId="home">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          gridArea: 'pageContent',
          minWidth: 0,
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
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <PageHeading
                icon={
                  <TrackChangesIcon sx={{ width: '3rem', height: '3rem' }} />
                }
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
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    paddingTop: '.4rem',
                    paddingBottom: '.4rem',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  value
                >
                  <GroupIcon sx={{ width: 24, height: 24 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      paddingLeft: '.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Squad
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  sx={{
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    paddingTop: '.4rem',
                    paddingBottom: '.4rem',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  value={false}
                >
                  <Groups3Icon sx={{ width: 32, height: 32 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingLeft: '.5rem', fontWeight: 'bold' }}
                  >
                    Everyone
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Typography variant="subtitle1">
              Scores are an aggregate across all software entities owned by your
              squad.
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '128px',
                  pointerEvents: 'none',
                  background: `linear-gradient(to left, ${theme.palette.background.default} 60%, transparent)`,
                  zIndex: 2,
                }}
              />
              <ArrowForwardIcon
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: '32px',
                  height: '100%',
                  zIndex: 4,
                }}
              />
              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    scrollbarWidth: 'none',
                    paddingBottom: '2px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '20px',
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '20rem',
                        zIndex: 1,
                      }}
                    >
                      <CardContent
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <MonitorHeartOutlinedIcon
                            sx={{ width: '1.5rem', height: '1.5rem' }}
                          />
                          <Typography
                            variant="h5"
                            sx={{
                              paddingLeft: '0.4rem',
                            }}
                          >
                            Service Health
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ pb: '0.4rem' }}>
                            Past 7 days
                          </Typography>
                          <Chip
                            color="error"
                            variant="outlined"
                            icon={<TrendingDownIcon />}
                            label="13%"
                            sx={{
                              pl: 1,
                              pr: 1,
                              mr: 0,
                              mb: 0,
                              borderRadius: '0.4rem',
                              backgroundColor: '#f8bcbc',
                            }}
                            size="small"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}
                        >
                          <PieChart
                            series={serviceHealthSeries}
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            slotProps={{ legend: { hidden: true } }}
                            height={140}
                            width={140}
                          />
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{ display: 'flex', justifyContent: 'start' }}
                      >
                        <Button variant="text" sx={{ padding: '1rem' }}>
                          <Typography
                            sx={{ paddingRight: '.2rem', fontWeight: 'bold' }}
                          >
                            View more
                          </Typography>
                          <ArrowForwardIcon />
                        </Button>
                      </CardActions>
                    </Card>
                    <Card
                      sx={{
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '20rem',
                        zIndex: 1,
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="h5">Cost Overview</Typography>
                        <Box>
                          <Typography variant="subtitle1" sx={{ pb: '0.4rem' }}>
                            Past 6 months
                          </Typography>
                          <Chip
                            color="success"
                            variant="outlined"
                            icon={<TrendingUpIcon />}
                            label="3.4%"
                            sx={{
                              pl: 1,
                              pr: 1,
                              mr: 0,
                              mb: 0,
                              borderRadius: '0.4rem',
                              backgroundColor: '#cff7cf',
                            }}
                            size="small"
                          />
                        </Box>
                        <LineChart
                          xAxis={[
                            {
                              id: 'Months',
                              data: months,
                              scaleType: 'time',
                              valueFormatter: date =>
                                date.getMonth().toString(),
                            },
                          ]}
                          // @ts-ignore
                          series={costSeries}
                          height={180}
                          leftAxis={null}
                          bottomAxis={null}
                          slotProps={{ legend: { hidden: true } }}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                          sx={{
                            [`& .${lineElementClasses.root}`]: {
                              strokeWidth: 4,
                              borderRadius: 10,
                            },
                            '& .v5-MuiLineElement-series-1': {
                              stroke: theme.palette.primary.main,
                            },
                            '& .v5-MuiAreaElement-series-1': {
                              fill: "url('#gradient1')",
                            },
                            '& .v5-MuiLineElement-series-2': {
                              stroke: theme.palette.success.main,
                            },
                            '& .v5-MuiAreaElement-series-2': {
                              fill: "url('#gradient2')",
                            },
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="gradient1"
                              gradientTransform="rotate(90)"
                            >
                              <stop
                                offset="0%"
                                stopColor={theme.palette.primary.main}
                                stopOpacity="1"
                              />
                              <stop
                                offset="70%"
                                stopColor={theme.palette.primary.main}
                                stopOpacity="0.4"
                              />
                              <stop
                                offset="90%"
                                stopColor={theme.palette.primary.main}
                                stopOpacity="0.2"
                              />
                              <stop
                                offset="100%"
                                stopColor={theme.palette.primary.main}
                                stopOpacity="0.1"
                              />
                            </linearGradient>
                            <linearGradient
                              id="gradient2"
                              gradientTransform="rotate(90)"
                            >
                              <stop
                                offset="0%"
                                stopColor={theme.palette.success.main}
                                stopOpacity="1"
                              />
                              <stop
                                offset="70%"
                                stopColor={theme.palette.success.main}
                                stopOpacity="0.4"
                              />
                              <stop
                                offset="90%"
                                stopColor={theme.palette.success.main}
                                stopOpacity="0.2"
                              />
                              <stop
                                offset="100%"
                                stopColor={theme.palette.success.main}
                                stopOpacity="0.1"
                              />
                            </linearGradient>
                          </defs>
                        </LineChart>
                      </CardContent>
                      <CardActions
                        sx={{ display: 'flex', justifyContent: 'start' }}
                      >
                        <Button variant="text" sx={{ padding: '1rem' }}>
                          <Typography
                            sx={{ paddingRight: '.2rem', fontWeight: 'bold' }}
                          >
                            View more
                          </Typography>
                          <ArrowForwardIcon />
                        </Button>
                      </CardActions>
                    </Card>
                    <Card
                      sx={{
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '20rem',
                        [theme.breakpoints.down('lg')]: {
                          width: '256px',
                        },
                        flexShrink: 0,
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h5">Incidents</Typography>
                        <Box
                          sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            variant="h2"
                            component="div"
                            sx={() => {
                              return {
                                color: theme.palette.success.main,
                              };
                            }}
                          >
                            3
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            Past 30 days
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{ display: 'flex', justifyContent: 'start' }}
                      >
                        <Button variant="text" sx={{ padding: '1rem' }}>
                          <Typography
                            sx={{ paddingRight: '.2rem', fontWeight: 'bold' }}
                          >
                            View more
                          </Typography>
                          <ArrowForwardIcon />
                        </Button>
                      </CardActions>
                    </Card>
                    <Card
                      sx={{
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '20rem',
                        zIndex: 1,
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h5">Deployment Time</Typography>
                        <Box
                          sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            variant="h2"
                            component="div"
                            sx={() => {
                              return {
                                color: theme.palette.success.main,
                              };
                            }}
                          >
                            3 days
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            Since the last deployment
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{ display: 'flex', justifyContent: 'start' }}
                      >
                        <Button variant="text" sx={{ padding: '1rem' }}>
                          <Typography
                            sx={{ paddingRight: '.2rem', fontWeight: 'bold' }}
                          >
                            View more
                          </Typography>
                          <ArrowForwardIcon />
                        </Button>
                      </CardActions>
                    </Card>

                    <Box sx={{ width: '256px' }} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <PageHeading
              icon={
                <MenuBookRoundedIcon sx={{ width: '3rem', height: '3rem' }} />
              }
              title="Ownership"
            />
            <Typography variant="subtitle1">
              All the things your squad owns in our ecosystem.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
              }}
            >
              <Card
                sx={{
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '20rem',
                  zIndex: 1,
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pt: '1rem',
                    pr: '1rem',
                    pl: '1rem',
                    pb: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <MemoryRoundedIcon
                      sx={{ width: '1.5rem', height: '1.5rem' }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        pl: '0.4rem',
                        mb: 0,
                      }}
                    >
                      43 Services
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      pl: '0.4rem',
                      mb: 0,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Backend Services
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    pt: 0,
                    pr: '1rem',
                    pb: '1rem',
                    pl: '1rem',
                  }}
                >
                  <CircleRoundedIcon
                    sx={{
                      width: '1rem',
                      height: '1rem',
                      fill: theme.palette.success.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      paddingLeft: '.4rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '0.875rem',
                    }}
                  >
                    Updated 2 days ago
                  </Typography>
                  <Button variant="text" sx={{ padding: '1rem' }}>
                    <ArrowForwardIcon sx={{ width: '3rem', height: '3rem' }} />
                  </Button>
                </CardActions>
              </Card>
              <Box sx={{ width: '256px' }} />
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
    </Page>
  );
};
