
import { styled } from '@mui/material/styles';

import { CatalogSearchResultListItem } from '@backstage/plugin-catalog';
import {
  catalogApiRef,
  CATALOG_FILTER_EXISTS,
} from '@backstage/plugin-catalog-react';
import { TechDocsSearchResultListItem } from '@backstage/plugin-techdocs';

import { SearchType } from '@backstage/plugin-search';
import {
  SearchBar,
  SearchFilter,
  SearchResult,
  SearchPagination,
  useSearch,
} from '@backstage/plugin-search-react';
import {
  CatalogIcon,
  Content,
  DocsIcon,
  Header,
  Page,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Bar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const Filters = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const SearchFilterSelect = styled(SearchFilter.Select)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(2.5),
  },
}));

const SearchFilterCheckbox = styled(SearchFilter.Checkbox)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(2.5),
  },
}));

const SearchPage = () => {
  const { types } = useSearch();
  const catalogApi = useApi(catalogApiRef);

  return (
    <Page themeId="home">
      <Header title="Search" />
      <Content>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Bar>
              <SearchBar />
            </Bar>
          </Grid>
          <Grid item xs={3}>
            <SearchType.Accordion
              name="Result Type"
              defaultValue="software-catalog"
              types={[
                {
                  value: 'software-catalog',
                  name: 'Software Catalog',
                  icon: <CatalogIcon />,
                },
                {
                  value: 'techdocs',
                  name: 'Documentation',
                  icon: <DocsIcon />,
                },
              ]}
            />
            <Filters>
              {types.includes('techdocs') && (
                <SearchFilterSelect
                  label="Entity"
                  name="name"
                  values={async () => {
                    // Return a list of entities which are documented.
                    const { items } = await catalogApi.getEntities({
                      fields: ['metadata.name'],
                      filter: {
                        'metadata.annotations.backstage.io/techdocs-ref':
                          CATALOG_FILTER_EXISTS,
                      },
                    });

                    const names = items.map(entity => entity.metadata.name);
                    names.sort();
                    return names;
                  }}
                />
              )}
              <SearchFilterSelect
                label="Kind"
                name="kind"
                values={['Component', 'Template']}
              />
              <SearchFilterCheckbox
                label="Lifecycle"
                name="lifecycle"
                values={['experimental', 'production']}
              />
            </Filters>
          </Grid>
          <Grid item xs={9}>
            <SearchPagination />
            <SearchResult>
              <CatalogSearchResultListItem icon={<CatalogIcon />} />
              <TechDocsSearchResultListItem icon={<DocsIcon />} />
            </SearchResult>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

export const searchPage = <SearchPage />;
