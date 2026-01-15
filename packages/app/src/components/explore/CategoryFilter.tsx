import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useTheme, alpha } from '@mui/material/styles';
import { ToolCategory, categoryLabels, categoryColors } from './toolsConfig';

interface CategoryFilterProps {
  categories: ToolCategory[];
  selectedCategory: ToolCategory | 'all';
  onCategoryChange: (_selection: ToolCategory | 'all') => void;
  categoryCounts?: Record<ToolCategory | 'all', number>;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}: CategoryFilterProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        mb: 4,
      }}
    >
      <Chip
        label={`All${categoryCounts ? ` (${categoryCounts.all})` : ''}`}
        onClick={() => onCategoryChange('all')}
        variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
        color={selectedCategory === 'all' ? 'primary' : 'default'}
        sx={{
          fontWeight: selectedCategory === 'all' ? 600 : 400,
        }}
      />
      {categories.map(category => {
        const isSelected = selectedCategory === category;
        const color = categoryColors[category];
        const count = categoryCounts?.[category];

        return (
          <Chip
            key={category}
            label={`${categoryLabels[category]}${
              count !== undefined ? ` (${count})` : ''
            }`}
            onClick={() => onCategoryChange(category)}
            variant={isSelected ? 'filled' : 'outlined'}
            sx={{
              fontWeight: isSelected ? 600 : 400,
              backgroundColor: isSelected ? color : 'transparent',
              borderColor: isSelected ? color : theme.palette.divider,
              color: isSelected
                ? theme.palette.getContrastText(color)
                : theme.palette.text.primary,
              '&:hover': {
                backgroundColor: isSelected ? color : alpha(color, 0.1),
              },
            }}
          />
        );
      })}
    </Box>
  );
};
