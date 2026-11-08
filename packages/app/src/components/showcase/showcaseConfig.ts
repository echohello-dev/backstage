export type ShowcaseCategory =
  | 'templates'
  | 'github'
  | 'answer-engine'
  | 'platform';

export interface ShowcaseItem {
  id: string;
  name: string;
  description: string;
  category: ShowcaseCategory;
  link: string;
  linkLabel: string;
  tags: string[];
  isRecommended?: boolean;
}

export const showcaseCategoryLabels: Record<ShowcaseCategory, string> = {
  templates: 'Code Templates',
  github: 'GitHub',
  'answer-engine': 'Answer Engine',
  platform: 'Platform',
};

export const showcaseCategoryColors: Record<ShowcaseCategory, string> = {
  templates: '#0969da',
  github: '#1f2328',
  'answer-engine': '#8250df',
  platform: '#1a7f37',
};

export function templateShowcaseLink(templateName: string): string {
  return `/self-service/templates/default/${templateName}`;
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'template-ai-hub-service',
    name: 'AI Hub Service',
    description:
      'Scaffold a provider-agnostic gateway in front of your organisation LLM providers, with auth, rate limiting, cost tracking and audit logging.',
    category: 'templates',
    link: templateShowcaseLink('ai-hub-service'),
    linkLabel: 'Use template',
    tags: ['recommended', 'ai', 'llm', 'github'],
    isRecommended: true,
  },
  {
    id: 'template-answer-engine-worker',
    name: 'Answer Engine Worker',
    description:
      'Scaffold a queue consumer that retrieves context from a document index and produces cited answers, with an indexer and query API.',
    category: 'templates',
    link: templateShowcaseLink('answer-engine-worker'),
    linkLabel: 'Use template',
    tags: ['recommended', 'ai', 'rag', 'github'],
    isRecommended: true,
  },
  {
    id: 'template-mcp-server',
    name: 'MCP Server',
    description:
      'Scaffold a Model Context Protocol server that AI assistants connect to for domain-specific tools and context.',
    category: 'templates',
    link: templateShowcaseLink('mcp-server'),
    linkLabel: 'Use template',
    tags: ['recommended', 'ai', 'mcp', 'github'],
    isRecommended: true,
  },
  {
    id: 'template-github-blank-repo',
    name: 'GitHub Blank Repo',
    description:
      'Create a new blank repository in GitHub from a local skeleton and register it in the catalog.',
    category: 'templates',
    link: templateShowcaseLink('github-blank-repo'),
    linkLabel: 'Use template',
    tags: ['recommended', 'github', 'repo'],
    isRecommended: true,
  },
  {
    id: 'template-github-pull-request',
    name: 'GitHub Pull Request Docs',
    description:
      'Create a documentation site in a GitHub repository and open it as a pull request for review.',
    category: 'templates',
    link: templateShowcaseLink('github-pull-request-docs'),
    linkLabel: 'Use template',
    tags: ['recommended', 'github', 'techdocs'],
    isRecommended: true,
  },
  {
    id: 'template-gitlab-blank-repo',
    name: 'GitLab Blank Repo',
    description:
      'Create a new blank repository in GitLab from a local skeleton and register it in the catalog.',
    category: 'templates',
    link: templateShowcaseLink('docs-blank-repo'),
    linkLabel: 'Use template',
    tags: ['recommended', 'gitlab', 'repo'],
    isRecommended: true,
  },
  {
    id: 'template-gitlab-merge-request',
    name: 'GitLab Merge Request Docs',
    description:
      'Create a documentation site in a GitLab repository and open it as a merge request for review.',
    category: 'templates',
    link: templateShowcaseLink('docs-template-gitlab-merge-request'),
    linkLabel: 'Use template',
    tags: ['recommended', 'gitlab', 'techdocs'],
    isRecommended: true,
  },
  {
    id: 'github-catalog',
    name: 'GitHub Catalog Sync',
    description:
      'Browse services, APIs and docs discovered from GitHub in the software catalog.',
    category: 'github',
    link: '/catalog',
    linkLabel: 'Open catalog',
    tags: ['github', 'catalog', 'discovery'],
  },
  {
    id: 'github-scaffolder',
    name: 'GitHub Scaffolder Actions',
    description:
      'Publish new repositories and pull requests from templates with the GitHub scaffolder actions.',
    category: 'github',
    link: '/self-service',
    linkLabel: 'Create component',
    tags: ['github', 'scaffolder', 'automation'],
  },
  {
    id: 'github-api-docs',
    name: 'API Explorer',
    description:
      'Explore OpenAPI definitions synced from GitHub repositories alongside the services that own them.',
    category: 'github',
    link: '/api-docs',
    linkLabel: 'Explore APIs',
    tags: ['github', 'openapi', 'api'],
  },
  {
    id: 'answer-engine-search',
    name: 'Answer Engine Search',
    description:
      'Ask questions across the catalog and docs and get cited answers grounded in your own content.',
    category: 'answer-engine',
    link: '/search',
    linkLabel: 'Try search',
    tags: ['ai', 'search', 'rag'],
    isRecommended: true,
  },
  {
    id: 'answer-engine-worker-card',
    name: 'Answer Engine Worker Template',
    description:
      'Start your own answer engine worker with retrieval, citation handling and catalog registration built in.',
    category: 'answer-engine',
    link: templateShowcaseLink('answer-engine-worker'),
    linkLabel: 'Use template',
    tags: ['ai', 'rag', 'template'],
    isRecommended: true,
  },
  {
    id: 'platform-techdocs',
    name: 'TechDocs',
    description:
      'Read documentation that lives with the code, published from the same repository as each service.',
    category: 'platform',
    link: '/docs',
    linkLabel: 'Read docs',
    tags: ['docs', 'techdocs'],
  },
  {
    id: 'platform-catalog-graph',
    name: 'Catalog Graph',
    description:
      'See how services, APIs, systems and teams relate to each other in one graph view.',
    category: 'platform',
    link: '/catalog-graph',
    linkLabel: 'View graph',
    tags: ['catalog', 'graph'],
  },
];

export function filterShowcaseItems(
  items: ShowcaseItem[],
  category: ShowcaseCategory | 'all',
  searchTerm: string,
): ShowcaseItem[] {
  const term = searchTerm.trim().toLowerCase();
  return items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!term) return true;
    return (
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });
}

export function countByCategory(
  items: ShowcaseItem[],
): Record<ShowcaseCategory | 'all', number> {
  const counts: Record<ShowcaseCategory | 'all', number> = {
    all: items.length,
    templates: 0,
    github: 0,
    'answer-engine': 0,
    platform: 0,
  };
  items.forEach(item => {
    counts[item.category] += 1;
  });
  return counts;
}
