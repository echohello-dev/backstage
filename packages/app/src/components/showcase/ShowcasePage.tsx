import { useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
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
  const searchInputRef = useRef<HTMLInputElement>(null);
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
        subtitle="Templates, GitHub integration and search, with an answer-engine extension to build on"
      />
      <Content>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            What this portal can do
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explore how templates, GitHub integration and catalog search fit
            together. Pick a card to try a portal feature or preview a software
            template.
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          Guest access is read-only. You can preview template forms and steps.
          Running a template to create a repository or pull request requires
          developer permissions.
        </Alert>

        <Alert severity="info" sx={{ mb: 3 }}>
          Catalog and TechDocs keyword search runs in this portal. Generated
          answers are an extension you can build with the Answer Engine Worker
          template, your own document index and AI Hub. The demo does not
          generate answers.
        </Alert>

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
            label="Search showcase"
            placeholder="Search showcase..."
            inputRef={searchInputRef}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: '100%', maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography role="status" variant="body2" color="text.secondary">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} available
          </Typography>
        </Box>

        <Box
          role="group"
          aria-label="Showcase categories"
          sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}
        >
          <Chip
            label={`All (${counts.all})`}
            aria-pressed={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            sx={{ fontWeight: selectedCategory === 'all' ? 600 : 400 }}
          />
          {categories.map(category => (
            <Chip
              key={category}
              label={`${showcaseCategoryLabels[category]} (${counts[category]})`}
              aria-pressed={selectedCategory === category}
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
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                searchInputRef.current?.focus();
              }}
            >
              Clear filters
            </Button>
          </Box>
        )}
      </Content>
    </Page>
  );
};
