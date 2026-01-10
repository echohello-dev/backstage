import { styled, useTheme } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import ApiIcon from '@mui/icons-material/Api';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, useEffect, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { Page, Content } from '@backstage/core-components';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useNavigate } from 'react-router-dom';
import { Entity } from '@backstage/catalog-model';

const SearchTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[50],
    },
  },
}));

const HeroSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6, 4),
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.default} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

interface CatalogStats {
  services: number;
  apis: number;
  components: number;
  systems: number;
  domains: number;
  groups: number;
  users: number;
  docs: number;
  loading: boolean;
}

interface RecentEntity {
  name: string;
  kind: string;
  type?: string;
  namespace: string;
}

interface Template {
  name: string;
  title: string;
  description: string;
  tags: string[];
}

interface HealthStatus {
  healthy: number;
  warning: number;
  critical: number;
  unknown: number;
}

const SectionHeader = ({
  icon,
  title,
  action,
}: {
  icon: ReactNode;
  title: string;
  action?: ReactNode;
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 3,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {icon}
      <Typography variant="h5" sx={{ mb: 0, fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    {action}
  </Box>
);

export const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const catalogApi = useApi(catalogApiRef);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<CatalogStats>({
    services: 0,
    apis: 0,
    components: 0,
    systems: 0,
    domains: 0,
    groups: 0,
    users: 0,
    docs: 0,
    loading: true,
  });
  const [recentEntities, setRecentEntities] = useState<RecentEntity[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    healthy: 0,
    warning: 0,
    critical: 0,
    unknown: 0,
  });
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          services,
          apis,
          components,
          systems,
          domains,
          groups,
          users,
          docs,
        ] = await Promise.all([
          catalogApi.getEntities({
            filter: [{ kind: 'component', 'spec.type': 'service' }],
          }),
          catalogApi.getEntities({ filter: [{ kind: 'api' }] }),
          catalogApi.getEntities({ filter: [{ kind: 'component' }] }),
          catalogApi.getEntities({ filter: [{ kind: 'system' }] }),
          catalogApi.getEntities({ filter: [{ kind: 'domain' }] }),
          catalogApi.getEntities({ filter: [{ kind: 'group' }] }),
          catalogApi.getEntities({ filter: [{ kind: 'user' }] }),
          catalogApi.getEntities({
            filter: [{ 'metadata.annotations.backstage.io/techdocs-ref': '*' }],
          }),
        ]);

        setStats({
          services: services.items.length,
          apis: apis.items.length,
          components: components.items.length,
          systems: systems.items.length,
          domains: domains.items.length,
          groups: groups.items.length,
          users: users.items.length,
          docs: docs.items.length,
          loading: false,
        });

        const healthCounts: HealthStatus = {
          healthy: 0,
          warning: 0,
          critical: 0,
          unknown: 0,
        };
        components.items.forEach((entity: Entity) => {
          const lifecycle = entity.spec?.lifecycle as string;
          if (lifecycle === 'production') healthCounts.healthy++;
          else if (lifecycle === 'experimental') healthCounts.warning++;
          else if (lifecycle === 'deprecated') healthCounts.critical++;
          else healthCounts.unknown++;
        });
        setHealthStatus(healthCounts);

        const allEntities = [
          ...components.items,
          ...apis.items,
          ...systems.items,
        ];
        const sortedEntities = allEntities
          .filter((e: Entity) => e.metadata?.name)
          .slice(0, 5)
          .map((e: Entity) => ({
            name: e.metadata.name,
            kind: e.kind,
            type: (e.spec?.type as string) || undefined,
            namespace: e.metadata.namespace || 'default',
          }));
        setRecentEntities(sortedEntities);
        setLoadingRecent(false);

        const templateResponse = await catalogApi.getEntities({
          filter: [{ kind: 'template' }],
        });
        const templateList = templateResponse.items
          .slice(0, 4)
          .map((t: Entity) => ({
            name: t.metadata.name,
            title: t.metadata.title || t.metadata.name,
            description: t.metadata.description || 'No description available',
            tags: (t.metadata.tags as string[]) || [],
          }));
        setTemplates(templateList);
        setLoadingTemplates(false);
      } catch (err) {
        // Failed to fetch catalog data
        setStats(prev => ({ ...prev, loading: false }));
        setLoadingRecent(false);
        setLoadingTemplates(false);
      }
    };

    fetchAllData();
  }, [catalogApi]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const quickActions = [
    {
      icon: (
        <AddIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: 'Create New',
      description: 'Scaffold a new project from templates',
      path: '/self-service',
    },
    {
      icon: (
        <ImportExportIcon
          sx={{ fontSize: 40, color: theme.palette.secondary.main }}
        />
      ),
      title: 'Register Existing',
      description: 'Import an existing component to the catalog',
      path: '/catalog-import',
    },
    {
      icon: (
        <DescriptionIcon
          sx={{ fontSize: 40, color: theme.palette.info.main }}
        />
      ),
      title: 'Browse Docs',
      description: 'Explore technical documentation',
      path: '/docs',
    },
    {
      icon: (
        <ApiIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
      ),
      title: 'API Explorer',
      description: 'Discover and explore available APIs',
      path: '/api-docs',
    },
  ];

  const catalogItems = [
    {
      icon: <WidgetsIcon />,
      label: 'Services',
      count: stats.services,
      path: '/catalog?filters[kind]=component&filters[type]=service',
      color: theme.palette.primary.main,
    },
    {
      icon: <ApiIcon />,
      label: 'APIs',
      count: stats.apis,
      path: '/api-docs',
      color: theme.palette.secondary.main,
    },
    {
      icon: <CategoryIcon />,
      label: 'Components',
      count: stats.components,
      path: '/catalog?filters[kind]=component',
      color: theme.palette.info.main,
    },
    {
      icon: <AccountTreeIcon />,
      label: 'Systems',
      count: stats.systems,
      path: '/catalog?filters[kind]=system',
      color: theme.palette.success.main,
    },
    {
      icon: <LibraryBooksIcon />,
      label: 'Documentation',
      count: stats.docs,
      path: '/docs',
      color: theme.palette.warning.main,
    },
    {
      icon: <GroupsIcon />,
      label: 'Teams',
      count: stats.groups,
      path: '/catalog?filters[kind]=group',
      color: theme.palette.error.main,
    },
  ];

  const totalHealth =
    healthStatus.healthy +
    healthStatus.warning +
    healthStatus.critical +
    healthStatus.unknown;
  const healthPercentage =
    totalHealth > 0
      ? Math.round((healthStatus.healthy / totalHealth) * 100)
      : 0;

  return (
    <Page themeId="home">
      <Content>
        <HeroSection>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
              color: theme.palette.text.primary,
            }}
          >
            Welcome to the Developer Portal
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: theme.palette.text.secondary,
              maxWidth: 600,
            }}
          >
            Your single pane of glass for discovering services, APIs, and
            documentation
          </Typography>
          <SearchTextField
            placeholder="Search for services, APIs, docs, or teams..."
            variant="outlined"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSearch}
                    sx={{ borderRadius: 2 }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </HeroSection>

        <Box sx={{ mb: 4 }}>
          <Alert
            severity="info"
            icon={<AnnouncementIcon />}
            action={
              <Button color="inherit" size="small">
                Learn More
              </Button>
            }
          >
            <AlertTitle>Getting Started?</AlertTitle>
            Check out our{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => navigate('/docs')}
            >
              documentation
            </Box>{' '}
            to learn how to create your first service and register it in the
            catalog.
          </Alert>
        </Box>

        <Box sx={{ mb: 5 }}>
          <SectionHeader
            icon={
              <RocketLaunchIcon
                sx={{ fontSize: 28, color: theme.palette.primary.main }}
              />
            }
            title="Quick Actions"
          />
          <Grid container spacing={3}>
            {quickActions.map(action => (
              <Grid item xs={12} sm={6} md={3} key={action.title}>
                <QuickActionCard>
                  <CardActionArea
                    onClick={() => navigate(action.path)}
                    sx={{ height: '100%', p: 3 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 2,
                      }}
                    >
                      {action.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </QuickActionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 5 }}>
          <SectionHeader
            icon={
              <CategoryIcon
                sx={{ fontSize: 28, color: theme.palette.secondary.main }}
              />
            }
            title="Catalog Overview"
            action={
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/catalog')}
              >
                View All
              </Button>
            }
          />
          <Grid container spacing={3}>
            {catalogItems.map(item => (
              <Grid item xs={6} sm={4} md={2} key={item.label}>
                <StatCard onClick={() => navigate(item.path)}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 1.5,
                        bgcolor: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stats.loading ? (
                        <Skeleton width={40} sx={{ mx: 'auto' }} />
                      ) : (
                        item.count
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 5 }}>
              <SectionHeader
                icon={
                  <CodeIcon
                    sx={{ fontSize: 28, color: theme.palette.info.main }}
                  />
                }
                title="Popular Templates"
                action={
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/self-service')}
                  >
                    View All
                  </Button>
                }
              />
              {(() => {
                if (loadingTemplates) {
                  return (
                    <Grid container spacing={3}>
                      {[1, 2, 3, 4].map(i => (
                        <Grid item xs={12} sm={6} key={i}>
                          <Skeleton
                            variant="rectangular"
                            height={120}
                            sx={{ borderRadius: 2 }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  );
                }

                if (templates.length > 0) {
                  return (
                    <Grid container spacing={3}>
                      {templates.map(template => (
                        <Grid item xs={12} sm={6} key={template.name}>
                          <Card
                            sx={{
                              height: '100%',
                              cursor: 'pointer',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[4],
                              },
                            }}
                            onClick={() =>
                              navigate(
                                `/self-service/templates/default/${template.name}`,
                              )
                            }
                          >
                            <CardContent>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 1 }}
                              >
                                {template.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 2,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {template.description}
                              </Typography>
                              <Box
                                sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
                              >
                                {template.tags.slice(0, 3).map(tag => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  );
                }

                return (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <InfoOutlinedIcon
                      sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
                    />
                    <Typography color="text.secondary">
                      No templates available yet.{' '}
                      <Box
                        component="span"
                        sx={{ color: 'primary.main', cursor: 'pointer' }}
                        onClick={() => navigate('/self-service')}
                      >
                        Create your first template
                      </Box>
                    </Typography>
                  </Paper>
                );
              })()}
            </Box>

            <Box sx={{ mb: 5 }}>
              <SectionHeader
                icon={
                  <TrendingUpIcon
                    sx={{ fontSize: 28, color: theme.palette.success.main }}
                  />
                }
                title="Catalog Highlights"
                action={
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/catalog')}
                  >
                    View Catalog
                  </Button>
                }
              />
              <Paper sx={{ overflow: 'hidden' }}>
                {(() => {
                  if (loadingRecent) {
                    return (
                      <Box sx={{ p: 2 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                          <Skeleton key={i} height={48} sx={{ mb: 1 }} />
                        ))}
                      </Box>
                    );
                  }

                  if (recentEntities.length > 0) {
                    return (
                      <List disablePadding>
                        {recentEntities.map((entity, index) => (
                          <Box key={`${entity.kind}-${entity.name}`}>
                            <ListItem disablePadding>
                              <ListItemButton
                                onClick={() =>
                                  navigate(
                                    `/catalog/${
                                      entity.namespace
                                    }/${entity.kind.toLowerCase()}/${entity.name}`,
                                  )
                                }
                              >
                                <ListItemIcon>
                                  <Avatar
                                    sx={{
                                      width: 36,
                                      height: 36,
                                      bgcolor: theme.palette.primary.main,
                                      fontSize: '0.875rem',
                                    }}
                                  >
                                    {entity.kind.charAt(0)}
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                  primary={entity.name}
                                  secondary={`${entity.kind}${
                                    entity.type ? ` · ${entity.type}` : ''
                                  }`}
                                />
                                <Chip
                                  label={entity.kind}
                                  size="small"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              </ListItemButton>
                            </ListItem>
                            {index < recentEntities.length - 1 && <Divider />}
                          </Box>
                        ))}
                      </List>
                    );
                  }

                  return (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography color="text.secondary">
                        No entities in the catalog yet.
                      </Typography>
                    </Box>
                  );
                })()}
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <SectionHeader
                icon={
                  <SpeedIcon
                    sx={{ fontSize: 28, color: theme.palette.warning.main }}
                  />
                }
                title="System Health"
              />
              <Card>
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Overall Health
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {stats.loading ? (
                          <Skeleton width={30} />
                        ) : (
                          `${healthPercentage}%`
                        )}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={healthPercentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          bgcolor: (() => {
                            if (healthPercentage >= 80) {
                              return theme.palette.success.main;
                            }
                            if (healthPercentage >= 50) {
                              return theme.palette.warning.main;
                            }
                            return theme.palette.error.main;
                          })(),
                        },
                      }}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          bgcolor: `${theme.palette.success.main}10`,
                          borderRadius: 1,
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{ color: theme.palette.success.main }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, lineHeight: 1 }}
                          >
                            {stats.loading ? (
                              <Skeleton width={20} />
                            ) : (
                              healthStatus.healthy
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Production
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          bgcolor: `${theme.palette.warning.main}10`,
                          borderRadius: 1,
                        }}
                      >
                        <WarningAmberIcon
                          sx={{ color: theme.palette.warning.main }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, lineHeight: 1 }}
                          >
                            {stats.loading ? (
                              <Skeleton width={20} />
                            ) : (
                              healthStatus.warning
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Experimental
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          bgcolor: `${theme.palette.error.main}10`,
                          borderRadius: 1,
                        }}
                      >
                        <ErrorOutlineIcon
                          sx={{ color: theme.palette.error.main }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, lineHeight: 1 }}
                          >
                            {stats.loading ? (
                              <Skeleton width={20} />
                            ) : (
                              healthStatus.critical
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Deprecated
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          bgcolor: theme.palette.grey[100],
                          borderRadius: 1,
                        }}
                      >
                        <InfoOutlinedIcon
                          sx={{ color: theme.palette.grey[500] }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, lineHeight: 1 }}
                          >
                            {stats.loading ? (
                              <Skeleton width={20} />
                            ) : (
                              healthStatus.unknown
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Other
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/pulse-check')}
                  >
                    View Pulse Check
                  </Button>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mb: 4 }}>
              <SectionHeader
                icon={
                  <WidgetsIcon
                    sx={{ fontSize: 28, color: theme.palette.info.main }}
                  />
                }
                title="Quick Links"
              />
              <Paper>
                <List disablePadding>
                  <ListItemButton onClick={() => navigate('/scorecard')}>
                    <ListItemIcon>
                      <SpeedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Scorecard"
                      secondary="Entity quality metrics"
                    />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate('/explore')}>
                    <ListItemIcon>
                      <SearchIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Explore"
                      secondary="Discover tools & services"
                    />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate('/catalog-graph')}>
                    <ListItemIcon>
                      <AccountTreeIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Catalog Graph"
                      secondary="Visualize dependencies"
                    />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate('/notifications')}>
                    <ListItemIcon>
                      <AnnouncementIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Notifications"
                      secondary="System alerts"
                    />
                  </ListItemButton>
                </List>
              </Paper>
            </Box>

            <Box>
              <SectionHeader
                icon={
                  <InfoOutlinedIcon
                    sx={{ fontSize: 28, color: theme.palette.text.secondary }}
                  />
                }
                title="Getting Started"
              />
              <Card
                sx={{
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[50],
                }}
              >
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    New to the Developer Portal? Here are some helpful
                    resources:
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Button
                      variant="text"
                      size="small"
                      sx={{ justifyContent: 'flex-start' }}
                      onClick={() => navigate('/docs')}
                    >
                      📚 Read the Documentation
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ justifyContent: 'flex-start' }}
                      onClick={() => navigate('/self-service')}
                    >
                      🚀 Create Your First Service
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ justifyContent: 'flex-start' }}
                      onClick={() => navigate('/catalog-import')}
                    >
                      📦 Register Existing Component
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ justifyContent: 'flex-start' }}
                      onClick={() => navigate('/api-docs')}
                    >
                      🔌 Explore Available APIs
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
