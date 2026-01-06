import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import HelpIcon from '@mui/icons-material/Help';
import { Entity } from '@backstage/catalog-model';

export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

export interface SystemHealth {
  entity: Entity;
  status: HealthStatus;
  uptime: number;
  lastChecked: Date;
  message?: string;
}

interface SystemHealthCardProps {
  health: SystemHealth;
}

const getStatusConfig = (status: HealthStatus) => {
  switch (status) {
    case 'healthy':
      return {
        icon: <CheckCircleIcon />,
        color: 'success' as const,
        label: 'Healthy',
      };
    case 'degraded':
      return {
        icon: <WarningIcon />,
        color: 'warning' as const,
        label: 'Degraded',
      };
    case 'down':
      return {
        icon: <ErrorIcon />,
        color: 'error' as const,
        label: 'Down',
      };
    default:
      return {
        icon: <HelpIcon />,
        color: 'default' as const,
        label: 'Unknown',
      };
  }
};

const formatUptime = (uptime: number): string => {
  if (uptime >= 99.9) return '99.9%+';
  return `${uptime.toFixed(2)}%`;
};

const formatLastChecked = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const SystemHealthCard = ({ health }: SystemHealthCardProps) => {
  const theme = useTheme();
  const { entity, status, uptime, lastChecked, message } = health;
  const statusConfig = getStatusConfig(status);
  const entityName = entity.metadata.name;
  const entityType = (entity.spec?.type as string) || 'service';

  return (
    <Card
      sx={{
        borderRadius: 2,
        borderLeft: `4px solid ${theme.palette[statusConfig.color].main}`,
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {entityName}
            </Typography>
            <Chip
              label={entityType}
              size="small"
              sx={{
                textTransform: 'capitalize',
                backgroundColor: theme.palette.action.selected,
              }}
            />
          </Box>
          <Chip
            icon={statusConfig.icon}
            label={statusConfig.label}
            color={statusConfig.color}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Uptime (30d)
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatUptime(uptime)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Last Checked
            </Typography>
            <Typography variant="body1">
              {formatLastChecked(lastChecked)}
            </Typography>
          </Box>
        </Box>

        {message && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
