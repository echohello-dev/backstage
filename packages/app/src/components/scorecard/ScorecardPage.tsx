import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, useTheme } from '@mui/material/styles';
import { Page, Header, Content } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import SearchIcon from '@mui/icons-material/Search';
import { ChecklistIcon } from '@primer/octicons-react';
import { EntityScoreCard, EntityScore } from './EntityScoreCard';
import { ScoreMetrics } from './ScoreMetrics';

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
}));

// Calculate score for an entity based on its metadata
const calculateEntityScore = (entity: Entity): EntityScore => {
  const scores = {
    documentation: 0,
    ownership: 0,
    cicd: 0,
    metadata: 0,
  };

  // Documentation score: Check for techdocs annotation
  const hasTechdocs = !!entity.metadata.annotations?.[
    'backstage.io/techdocs-ref'
  ];
  const hasDescription = !!entity.metadata.description;
  scores.documentation = (hasTechdocs ? 50 : 0) + (hasDescription ? 50 : 0);

  // Ownership score: Check for owner
  const hasOwner = !!(entity.spec?.owner as string);
  const hasSystem = !!(entity.spec?.system as string);
  scores.ownership = (hasOwner ? 60 : 0) + (hasSystem ? 40 : 0);

  // CI/CD score: Check for CI/CD annotations
  const hasGithubActions =
    !!entity.metadata.annotations?.['github.com/project-slug'];
  const hasGitlabCi =
    !!entity.metadata.annotations?.['gitlab.com/project-slug'];
  const hasJenkins = !!entity.metadata.annotations?.['jenkins.io/job-full-name'];
  scores.cicd = hasGithubActions || hasGitlabCi || hasJenkins ? 100 : 0;

  // Metadata score: Check for labels, tags, links
  const hasLabels =
    entity.metadata.labels && Object.keys(entity.metadata.labels).length > 0;
  const hasTags = entity.metadata.tags && entity.metadata.tags.length > 0;
  const hasLinks = entity.metadata.links && entity.metadata.links.length > 0;
  scores.metadata =
    (hasLabels ? 33 : 0) + (hasTags ? 34 : 0) + (hasLinks ? 33 : 0);

  const overallScore = Math.round(
    (scores.documentation + scores.ownership + scores.cicd + scores.metadata) /
      4,
  );

  return {
    entity,
    scores,
    overallScore,
  };
};

export const ScorecardPage = () => {
  const theme = useTheme();
  const catalogApi = useApi(catalogApiRef);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [kindFilter, setKindFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true);
        const response = await catalogApi.getEntities({
          filter: [
            { kind: 'component' },
            { kind: 'api' },
            { kind: 'system' },
          ],
        });
        setEntities(response.items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, [catalogApi]);

  const entityScores = entities.map(calculateEntityScore);

  // Get unique kinds and types for filters
  const kinds = [...new Set(entities.map(e => e.kind))];
  const types = [
    ...new Set(
      entities
        .map(e => e.spec?.type as string)
        .filter(Boolean),
    ),
  ];

  // Filter entities
  const filteredScores = entityScores.filter(es => {
    const matchesSearch =
      searchTerm === '' ||
      es.entity.metadata.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      es.entity.metadata.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesKind =
      kindFilter === 'all' || es.entity.kind === kindFilter;
    const matchesType =
      typeFilter === 'all' || es.entity.spec?.type === typeFilter;
    return matchesSearch && matchesKind && matchesType;
  });

  // Sort by score (lowest first to highlight issues)
  const sortedScores = [...filteredScores].sort(
    (a, b) => a.overallScore - b.overallScore,
  );

  if (loading) {
    return (
      <Page themeId="tool">
        <Header
          title="Scorecard"
          subtitle="Track the health and quality of your software catalog"
        />
        <Content>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <CircularProgress />
          </Box>
        </Content>
      </Page>
    );
  }

  if (error) {
    return (
      <Page themeId="tool">
        <Header
          title="Scorecard"
          subtitle="Track the health and quality of your software catalog"
        />
        <Content>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error">
              Error loading entities: {error.message}
            </Typography>
          </Box>
        </Content>
      </Page>
    );
  }

  return (
    <Page themeId="tool">
      <Header
        title="Scorecard"
        subtitle="Track the health and quality of your software catalog"
      />
      <Content>
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <ChecklistIcon size={24} />
            <Typography variant="h5">Catalog Health Overview</Typography>
          </Box>
          <ScoreMetrics entityScores={entityScores} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Entity Scores
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scores are calculated based on documentation, ownership, CI/CD
            integration, and metadata completeness.
          </Typography>
        </Box>

        <FilterContainer>
          <TextField
            placeholder="Search entities..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Kind</InputLabel>
            <Select
              value={kindFilter}
              label="Kind"
              onChange={e => setKindFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {kinds.map(kind => (
                <MenuItem key={kind} value={kind}>
                  {kind}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={e => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {types.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterContainer>

        <Grid container spacing={3}>
          {sortedScores.map(entityScore => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`${entityScore.entity.kind}:${entityScore.entity.metadata.namespace}/${entityScore.entity.metadata.name}`}
            >
              <EntityScoreCard entityScore={entityScore} />
            </Grid>
          ))}
        </Grid>

        {sortedScores.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No entities found matching your filters.
            </Typography>
          </Box>
        )}
      </Content>
    </Page>
  );
};
