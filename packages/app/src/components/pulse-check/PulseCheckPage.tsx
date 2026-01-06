import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import { Page, Header, Content } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { PulseIcon } from '@primer/octicons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import {
  SystemHealthCard,
  SystemHealth,
  HealthStatus,
} from './SystemHealthCard';
import { IncidentTimeline, Incident } from './IncidentTimeline';
import { DeploymentMetrics, DeploymentStats } from './DeploymentMetrics';

// Mock function to generate health status for demo
const generateMockHealth = (entity: Entity): SystemHealth => {
  const statuses: HealthStatus[] = [
    'healthy',
    'healthy',
    'healthy',
    'degraded',
    'unknown',
  ];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const uptimes: Record<HealthStatus, number> = {
    healthy: 99.5 + Math.random() * 0.49,
    degraded: 95 + Math.random() * 4,
    down: 80 + Math.random() * 10,
    unknown: 0,
  };

  return {
    entity,
    status: randomStatus,
    uptime: uptimes[randomStatus],
    lastChecked: new Date(Date.now() - Math.random() * 3600000),
    message:
      randomStatus === 'degraded'
        ? 'Elevated error rates detected'
        : randomStatus === 'down'
        ? 'Service unreachable'
        : undefined,
  };
};

// Mock incidents for demo
const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Database connection timeout',
    description: 'Primary database experienced connection timeouts',
    severity: 'resolved',
    timestamp: new Date(Date.now() - 2 * 3600000),
    affectedService: 'payment-service',
    duration: 23,
  },
  {
    id: '2',
    title: 'API Gateway latency spike',
    description: 'Increased latency on API gateway affecting multiple services',
    severity: 'minor',
    timestamp: new Date(Date.now() - 8 * 3600000),
    duration: 15,
  },
  {
    id: '3',
    title: 'Memory pressure alert',
    description: 'High memory usage on worker nodes',
    severity: 'major',
    timestamp: new Date(Date.now() - 24 * 3600000),
    affectedService: 'notification-service',
    duration: 45,
  },
];

// Mock deployment stats for demo
const mockDeploymentStats: DeploymentStats = {
  totalDeployments: 47,
  successfulDeployments: 44,
  failedDeployments: 2,
  rollbacks: 1,
  averageDeploymentTime: 8,
  deploymentFrequency: 6.7,
  changeFailureRate: 4.3,
  meanTimeToRecovery: 18,
  weeklyDeployments: [8, 12, 6, 9, 7, 3, 2],
};

export const PulseCheckPage = () => {
  const theme = useTheme();
  const catalogApi = useApi(catalogApiRef);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true);
        const response = await catalogApi.getEntities({
          filter: [{ kind: 'component', 'spec.type': 'service' }],
        });
        setEntities(response.items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, [catalogApi]);

  const healthData = entities.map(generateMockHealth);

  // Calculate summary stats
  const healthyCount = healthData.filter(h => h.status === 'healthy').length;
  const degradedCount = healthData.filter(h => h.status === 'degraded').length;
  const downCount = healthData.filter(h => h.status === 'down').length;
  const unknownCount = healthData.filter(h => h.status === 'unknown').length;

  if (loading) {
    return (
      <Page themeId="tool">
        <Header
          title="Pulse Check"
          subtitle="Monitor the health and status of your services"
        />
        <Content>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <CircularProgress />
          </Box>
        </Content>
      </Page>
    );
  }

  if (error) {
    return (
      <Page themeId="tool">
        <Header
          title="Pulse Check"
          subtitle="Monitor the health and status of your services"
        />
        <Content>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error">
              Error loading services: {error.message}
            </Typography>
          </Box>
        </Content>
      </Page>
    );
  }

  return (
    <Page themeId="tool">
      <Header
        title="Pulse Check"
        subtitle="Monitor the health and status of your services"
      />
      <Content>
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
            }}
          >
            <PulseIcon size={24} />
            <Typography variant="h5">System Status Overview</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.success.main}`,
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {healthyCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Healthy
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.warning.main}`,
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <WarningIcon color="warning" />
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {degradedCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Degraded
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.error.main}`,
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ErrorIcon color="error" />
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {downCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Down
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.grey[400]}`,
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.grey[400],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    >
                      ?
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {unknownCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Unknown
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DeploymentMetrics stats={mockDeploymentStats} />
            </Grid>
            <Grid item xs={12} md={4}>
              <IncidentTimeline incidents={mockIncidents} />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Service Health
          </Typography>
          <Grid container spacing={3}>
            {healthData.map(health => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${health.entity.kind}:${health.entity.metadata.namespace}/${health.entity.metadata.name}`}
              >
                <SystemHealthCard health={health} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {entities.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No services found in the catalog.
            </Typography>
          </Box>
        )}
      </Content>
    </Page>
  );
};
