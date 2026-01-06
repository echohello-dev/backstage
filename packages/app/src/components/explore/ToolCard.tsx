import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useTheme, alpha } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Tool, categoryColors, categoryLabels } from './toolsConfig';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const theme = useTheme();
  const categoryColor = categoryColors[tool.category];

  return (
    <Card
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ mb: 0 }}>
              {tool.name}
            </Typography>
            {tool.isNew && (
              <Chip
                label="New"
                size="small"
                color="primary"
                sx={{ height: 20, fontSize: '0.65rem' }}
              />
            )}
          </Box>
          {tool.isInternal && (
            <Chip
              label="Internal"
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: '0.65rem' }}
            />
          )}
        </Box>

        <Chip
          label={categoryLabels[tool.category]}
          size="small"
          sx={{
            mb: 1.5,
            backgroundColor: alpha(categoryColor, 0.1),
            color: categoryColor,
            fontWeight: 500,
          }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.description}
        </Typography>

        {tool.tags && tool.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {tool.tags.slice(0, 3).map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  borderColor: theme.palette.divider,
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          href={tool.url}
          target={tool.isInternal ? '_self' : '_blank'}
          rel={tool.isInternal ? undefined : 'noopener noreferrer'}
          variant="outlined"
          size="small"
          endIcon={!tool.isInternal && <OpenInNewIcon fontSize="small" />}
          fullWidth
        >
          {tool.isInternal ? 'Open' : 'Visit'}
        </Button>
      </CardActions>
    </Card>
  );
};
