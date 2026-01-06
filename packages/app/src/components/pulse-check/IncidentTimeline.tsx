import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export type IncidentSeverity = 'critical' | 'major' | 'minor' | 'resolved';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  timestamp: Date;
  affectedService?: string;
  duration?: number; // minutes
}

interface IncidentTimelineProps {
  incidents: Incident[];
  maxItems?: number;
}

const getSeverityConfig = (severity: IncidentSeverity) => {
  switch (severity) {
    case 'critical':
      return { icon: <ErrorIcon fontSize="small" />, color: 'error' as const };
    case 'major':
      return {
        icon: <WarningIcon fontSize="small" />,
        color: 'warning' as const,
      };
    case 'minor':
      return { icon: <InfoIcon fontSize="small" />, color: 'info' as const };
    case 'resolved':
      return {
        icon: <CheckCircleIcon fontSize="small" />,
        color: 'success' as const,
      };
    default:
      return { icon: <InfoIcon fontSize="small" />, color: 'grey' as const };
  }
};

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);

  if (hours < 1) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  }
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return 'Yesterday';
  return date.toLocaleDateString();
};

const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const IncidentTimeline = ({
  incidents,
  maxItems = 5,
}: IncidentTimelineProps) => {
  const theme = useTheme();
  const displayedIncidents = incidents.slice(0, maxItems);

  if (incidents.length === 0) {
    return (
      <Card sx={{ borderRadius: 2, height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Incidents
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 48,
                color: theme.palette.success.main,
                mb: 1,
              }}
            />
            <Typography color="text.secondary">
              No incidents in the past 30 days
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 2, height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Recent Incidents
        </Typography>
        <Timeline position="right" sx={{ p: 0, m: 0 }}>
          {displayedIncidents.map((incident, index) => {
            const config = getSeverityConfig(incident.severity);
            return (
              <TimelineItem key={incident.id}>
                <TimelineOppositeContent
                  sx={{
                    flex: 0.2,
                    py: 1,
                    px: 0,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {formatTimestamp(incident.timestamp)}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={config.color} sx={{ m: 0 }}>
                    {config.icon}
                  </TimelineDot>
                  {index < displayedIncidents.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 1, px: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {incident.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {incident.description}
                  </Typography>
                  {incident.duration && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Duration: {formatDuration(incident.duration)}
                    </Typography>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
        {incidents.length > maxItems && (
          <Typography
            variant="body2"
            color="primary"
            sx={{ textAlign: 'center', mt: 1, cursor: 'pointer' }}
          >
            View all {incidents.length} incidents
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
