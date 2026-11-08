import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { Page, Header, Content } from '@backstage/core-components';
import SearchIcon from '@mui/icons-material/Search';
import {
  ShowcaseCategory,
  showcaseCategoryLabels,
  showcaseItems,
  filterShowcaseItems,
  countByCategory,
} from './showcaseConfig';
import { ShowcaseCard } from './ShowcaseCard';

const categories: ShowcaseCategory[] = [
  'templates',
  'github',
  'answer-engine',
  'platform',
];

export const ShowcasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ShowcaseCategory | 'all'
  >('all');

  const counts = useMemo(() => countByCategory(showcaseItems), []);
  const filtered = useMemo(
    () => filterShowcaseItems(showcaseItems, selectedCategory, searchTerm),
    [selectedCategory, searchTerm],
  );

  return (
    <Page themeId="tool">
      <Header
        title="Plugin Showcase"
        subtitle="Templates, GitHub integration and the answer engine, curated from what this portal already ships"
      />
      <Content>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            What this portal can do
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start a new service from a proven template, publish it to GitHub,
            and make it findable through the catalog and answer engine. Pick a
            card to jump straight to the live surface.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <TextField
            placeholder="Search showcase..."
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
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} available
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
          <Chip
            label={`All (${counts.all})`}
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            sx={{ fontWeight: selectedCategory === 'all' ? 600 : 400 }}
          />
          {categories.map(category => (
            <Chip
              key={category}
              label={`${showcaseCategoryLabels[category]} (${counts[category]})`}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              color={selectedCategory === category ? 'primary' : 'default'}
              sx={{
                fontWeight: selectedCategory === category ? 600 : 400,
              }}
            />
          ))}
        </Box>

        {filtered.length > 0 ? (
          <Grid container spacing={3}>
            {filtered.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ShowcaseCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">
              No showcase items found matching &quot;{searchTerm}&quot;
              {selectedCategory !== 'all' &&
                ` in ${showcaseCategoryLabels[selectedCategory]}`}
            </Typography>
          </Box>
        )}
      </Content>
    </Page>
  );
};
