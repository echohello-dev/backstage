import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { Page, Header, Content } from '@backstage/core-components';
import SearchIcon from '@mui/icons-material/Search';
import { TelescopeIcon } from '@primer/octicons-react';
import {
  Tool,
  ToolCategory,
  defaultTools,
  categoryLabels,
} from './toolsConfig';
import { ToolGrid } from './ToolGrid';
import { CategoryFilter } from './CategoryFilter';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
  alignItems: 'center',
}));

export const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ToolCategory | 'all'
  >('all');

  // Get unique categories from tools
  const categories = useMemo(() => {
    const cats = [...new Set(defaultTools.map(t => t.category))];
    return cats.sort((a, b) =>
      categoryLabels[a].localeCompare(categoryLabels[b]),
    );
  }, []);

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<ToolCategory | 'all', number> = {
      all: defaultTools.length,
      development: 0,
      infrastructure: 0,
      monitoring: 0,
      documentation: 0,
      communication: 0,
      security: 0,
      data: 0,
      productivity: 0,
    };

    defaultTools.forEach(tool => {
      counts[tool.category]++;
    });

    return counts;
  }, []);

  // Filter tools
  const filteredTools = useMemo(() => {
    return defaultTools.filter(tool => {
      const matchesSearch =
        searchTerm === '' ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags?.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group tools by category for display
  const groupedTools = useMemo(() => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredTools };
    }

    const grouped: Record<string, Tool[]> = {};
    filteredTools.forEach(tool => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });

    return grouped;
  }, [filteredTools, selectedCategory]);

  return (
    <Page themeId="tool">
      <Header
        title="Explore"
        subtitle="Discover tools, resources, and integrations available to your team"
      />
      <Content>
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
            }}
          >
            <TelescopeIcon size={24} />
            <Typography variant="h5">Explore Tools & Services</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            A curated collection of tools and resources to help you build,
            deploy, and monitor your applications.
          </Typography>
        </Box>

        <SearchContainer sx={{ mb: 4 }}>
          <TextField
            placeholder="Search tools..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 300, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}{' '}
            available
          </Typography>
        </SearchContainer>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {selectedCategory === 'all' ? (
          // Show grouped by category
          Object.entries(groupedTools)
            .sort(([a], [b]) =>
              categoryLabels[a as ToolCategory].localeCompare(
                categoryLabels[b as ToolCategory],
              ),
            )
            .map(([category, tools]) => (
              <Box key={category} sx={{ mb: 5 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, color: 'text.secondary' }}
                >
                  {categoryLabels[category as ToolCategory]}
                </Typography>
                <ToolGrid tools={tools} />
              </Box>
            ))
        ) : (
          // Show flat list for selected category
          <ToolGrid tools={filteredTools} />
        )}

        {filteredTools.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">
              No tools found matching "{searchTerm}"
              {selectedCategory !== 'all' &&
                ` in ${categoryLabels[selectedCategory]}`}
            </Typography>
          </Box>
        )}
      </Content>
    </Page>
  );
};
