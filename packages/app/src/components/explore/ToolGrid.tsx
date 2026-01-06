import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tool } from './toolsConfig';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  emptyMessage?: string;
}

export const ToolGrid = ({
  tools,
  emptyMessage = 'No tools found matching your criteria.',
}: ToolGridProps) => {
  if (tools.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {tools.map(tool => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={tool.id}>
          <ToolCard tool={tool} />
        </Grid>
      ))}
    </Grid>
  );
};
