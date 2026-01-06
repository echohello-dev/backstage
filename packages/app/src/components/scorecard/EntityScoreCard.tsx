import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { Entity } from '@backstage/catalog-model';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

export interface EntityScore {
  entity: Entity;
  scores: {
    documentation: number;
    ownership: number;
    cicd: number;
    metadata: number;
  };
  overallScore: number;
}

interface EntityScoreCardProps {
  entityScore: EntityScore;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'success';
  if (score >= 50) return 'warning';
  return 'error';
};

const getScoreIcon = (score: number) => {
  if (score >= 80) return <CheckCircleIcon fontSize="small" />;
  if (score >= 50) return <WarningIcon fontSize="small" />;
  return <ErrorIcon fontSize="small" />;
};

const ScoreBar = ({
  label,
  score,
}: {
  label: string;
  score: number;
}) => {
  const theme = useTheme();
  const color = getScoreColor(score);

  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {score}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={score}
        color={color}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.palette.action.hover,
        }}
      />
    </Box>
  );
};

export const EntityScoreCard = ({ entityScore }: EntityScoreCardProps) => {
  const theme = useTheme();
  const { entity, scores, overallScore } = entityScore;
  const entityName = entity.metadata.name;
  const entityKind = entity.kind;
  const entityType =
    (entity.spec?.type as string) || entityKind.toLowerCase();

  return (
    <Card
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
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
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                justifyContent: 'flex-end',
              }}
            >
              {getScoreIcon(overallScore)}
              <Typography
                variant="h4"
                fontWeight="bold"
                color={`${getScoreColor(overallScore)}.main`}
              >
                {overallScore}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Overall Score
            </Typography>
          </Box>
        </Box>

        <ScoreBar label="Documentation" score={scores.documentation} />
        <ScoreBar label="Ownership" score={scores.ownership} />
        <ScoreBar label="CI/CD" score={scores.cicd} />
        <ScoreBar label="Metadata" score={scores.metadata} />
      </CardContent>
    </Card>
  );
};
