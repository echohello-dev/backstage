import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Grid from '@mui/material/Grid';
import { EntityScore } from './EntityScoreCard';

interface ScoreMetricsProps {
  entityScores: EntityScore[];
}

export const ScoreMetrics = ({ entityScores }: ScoreMetricsProps) => {
  const theme = useTheme();

  // Calculate score distribution
  const excellent = entityScores.filter(e => e.overallScore >= 80).length;
  const good = entityScores.filter(
    e => e.overallScore >= 50 && e.overallScore < 80,
  ).length;
  const needsWork = entityScores.filter(e => e.overallScore < 50).length;

  const distributionData = [
    {
      id: 0,
      value: excellent,
      label: 'Excellent (80+)',
      color: theme.palette.success.main,
    },
    {
      id: 1,
      value: good,
      label: 'Good (50-79)',
      color: theme.palette.warning.main,
    },
    {
      id: 2,
      value: needsWork,
      label: 'Needs Work (<50)',
      color: theme.palette.error.main,
    },
  ].filter(d => d.value > 0);

  // Calculate average scores by category
  const avgDocumentation =
    entityScores.reduce((sum, e) => sum + e.scores.documentation, 0) /
    entityScores.length;
  const avgOwnership =
    entityScores.reduce((sum, e) => sum + e.scores.ownership, 0) /
    entityScores.length;
  const avgCicd =
    entityScores.reduce((sum, e) => sum + e.scores.cicd, 0) /
    entityScores.length;
  const avgMetadata =
    entityScores.reduce((sum, e) => sum + e.scores.metadata, 0) /
    entityScores.length;

  const overallAvg =
    entityScores.reduce((sum, e) => sum + e.overallScore, 0) /
    entityScores.length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overall Health
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 3,
              }}
            >
              <Typography variant="h2" fontWeight="bold" color="primary.main">
                {Math.round(overallAvg)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Across {entityScores.length} entities
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Score Distribution
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}
            >
              {distributionData.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: distributionData,
                      innerRadius: 40,
                      paddingAngle: 3,
                      cornerRadius: 4,
                    },
                  ]}
                  width={300}
                  height={200}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: 0,
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      markGap: 5,
                      itemGap: 8,
                    },
                  }}
                />
              ) : (
                <Typography color="text.secondary">No data</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Category Averages
            </Typography>
            <Box sx={{ height: 200 }}>
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: ['Docs', 'Owner', 'CI/CD', 'Meta'],
                  },
                ]}
                series={[
                  {
                    data: [
                      Math.round(avgDocumentation),
                      Math.round(avgOwnership),
                      Math.round(avgCicd),
                      Math.round(avgMetadata),
                    ],
                    color: theme.palette.primary.main,
                  },
                ]}
                height={200}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
