import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Chip from '@mui/material/Chip';

export interface DeploymentStats {
  totalDeployments: number;
  successfulDeployments: number;
  failedDeployments: number;
  rollbacks: number;
  averageDeploymentTime: number; // minutes
  deploymentFrequency: number; // per day
  changeFailureRate: number; // percentage
  meanTimeToRecovery: number; // minutes
  weeklyDeployments: number[];
}

interface DeploymentMetricsProps {
  stats: DeploymentStats;
  comparisonPeriod?: string;
  previousStats?: DeploymentStats;
}

const MetricCard = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}) => {
  const theme = useTheme();
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        {trendValue && trend !== 'neutral' && (
          <Chip
            icon={
              isPositive ? (
                <TrendingUpIcon fontSize="small" />
              ) : (
                <TrendingDownIcon fontSize="small" />
              )
            }
            label={trendValue}
            size="small"
            sx={{
              backgroundColor: isPositive
                ? theme.palette.success.light
                : theme.palette.error.light,
              color: isPositive
                ? theme.palette.success.dark
                : theme.palette.error.dark,
            }}
          />
        )}
      </Box>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export const DeploymentMetrics = ({
  stats,
  comparisonPeriod = 'vs last week',
}: DeploymentMetricsProps) => {
  const theme = useTheme();

  const successRate =
    stats.totalDeployments > 0
      ? ((stats.successfulDeployments / stats.totalDeployments) * 100).toFixed(
          1,
        )
      : 0;

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Deployment Metrics
        </Typography>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Past 7 days {comparisonPeriod}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={6} sm={3}>
            <MetricCard
              title="Total Deployments"
              value={stats.totalDeployments}
              trend="up"
              trendValue="+12%"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MetricCard
              title="Success Rate"
              value={`${successRate}%`}
              trend={Number(successRate) >= 95 ? 'up' : 'down'}
              trendValue={Number(successRate) >= 95 ? '+2.3%' : '-1.5%'}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MetricCard
              title="Avg Deploy Time"
              value={`${stats.averageDeploymentTime}m`}
              subtitle="Lead time to production"
              trend="up"
              trendValue="-15%"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MetricCard
              title="MTTR"
              value={`${stats.meanTimeToRecovery}m`}
              subtitle="Mean time to recovery"
              trend={stats.meanTimeToRecovery < 30 ? 'up' : 'down'}
              trendValue="-8%"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Deployments by Day
          </Typography>
          <Box sx={{ height: 200 }}>
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: weekDays,
                },
              ]}
              series={[
                {
                  data: stats.weeklyDeployments,
                  color: theme.palette.primary.main,
                },
              ]}
              height={200}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                backgroundColor: theme.palette.success.light,
              }}
            >
              <Typography variant="caption" color="success.dark">
                Successful
              </Typography>
              <Typography variant="h6" color="success.dark" fontWeight="bold">
                {stats.successfulDeployments}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                backgroundColor: theme.palette.error.light,
              }}
            >
              <Typography variant="caption" color="error.dark">
                Failed
              </Typography>
              <Typography variant="h6" color="error.dark" fontWeight="bold">
                {stats.failedDeployments}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                backgroundColor: theme.palette.warning.light,
              }}
            >
              <Typography variant="caption" color="warning.dark">
                Rollbacks
              </Typography>
              <Typography variant="h6" color="warning.dark" fontWeight="bold">
                {stats.rollbacks}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                backgroundColor: theme.palette.info.light,
              }}
            >
              <Typography variant="caption" color="info.dark">
                Change Failure Rate
              </Typography>
              <Typography variant="h6" color="info.dark" fontWeight="bold">
                {stats.changeFailureRate}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
