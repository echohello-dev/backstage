import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  ShowcaseItem,
  showcaseCategoryColors,
  showcaseCategoryLabels,
} from './showcaseConfig';

export const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const theme = useTheme();
  const color = showcaseCategoryColors[item.category];

  return (
    <Card
      data-testid={`showcase-card-${item.id}`}
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
          <Typography variant="h6" sx={{ mb: 0 }}>
            {item.name}
          </Typography>
          {item.isRecommended && (
            <Chip
              label="Recommended"
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: '0.65rem' }}
            />
          )}
        </Box>
        <Chip
          label={showcaseCategoryLabels[item.category]}
          size="small"
          sx={{
            mb: 1.5,
            backgroundColor: alpha(color, 0.12),
            color: theme.palette.mode === 'dark' ? theme.palette.text.primary : color,
            fontWeight: 500,
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {item.tags.slice(0, 4).map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: '0.65rem' }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={item.link}
          variant="outlined"
          size="small"
          fullWidth
        >
          {item.linkLabel}
        </Button>
      </CardActions>
    </Card>
  );
};
