import {
  showcaseItems,
  filterShowcaseItems,
  countByCategory,
  templateShowcaseLink,
} from './showcaseConfig';

describe('showcaseConfig', () => {
  it('includes all seven software templates', () => {
    const templates = showcaseItems.filter(i => i.category === 'templates');
    expect(templates).toHaveLength(7);
    expect(templates.map(t => t.id)).toEqual(
      expect.arrayContaining([
        'template-ai-hub-service',
        'template-answer-engine-worker',
        'template-mcp-server',
        'template-github-blank-repo',
        'template-github-pull-request',
        'template-gitlab-blank-repo',
        'template-gitlab-merge-request',
      ]),
    );
  });

  it('includes GitHub and answer engine items', () => {
    const counts = countByCategory(showcaseItems);
    expect(counts.github).toBeGreaterThanOrEqual(3);
    expect(counts['answer-engine']).toBeGreaterThanOrEqual(2);
    expect(counts.all).toBe(showcaseItems.length);
  });

  it('every item links to a live portal surface', () => {
    const allowed = ['/self-service', '/catalog', '/api-docs', '/search', '/docs', '/catalog-graph'];
    showcaseItems.forEach(item => {
      const isTemplateLink = item.link.startsWith('/self-service/templates/default/');
      expect(allowed.includes(item.link) || isTemplateLink).toBe(true);
      expect(item.linkLabel.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(20);
    });
  });

  it('deep-links every template card to its real template entity', () => {
    // Entity names from examples/templates/*/template.yaml (metadata.name)
    const realTemplateNames = [
      'ai-hub-service',
      'answer-engine-worker',
      'mcp-server',
      'github-blank-repo',
      'github-pull-request-docs',
      'docs-blank-repo',
      'docs-template-gitlab-merge-request',
    ];
    const templates = showcaseItems.filter(i => i.category === 'templates');
    templates.forEach(item => {
      expect(item.link.startsWith('/self-service/templates/default/')).toBe(true);
      const templateName = item.link.replace('/self-service/templates/default/', '');
      expect(realTemplateNames).toContain(templateName);
    });
    expect(templates.map(t => t.link).sort()).toEqual(
      realTemplateNames.map(name => templateShowcaseLink(name)).sort(),
    );
    const workerCard = showcaseItems.find(i => i.id === 'answer-engine-worker-card');
    expect(workerCard?.link).toBe(templateShowcaseLink('answer-engine-worker'));
    expect(templateShowcaseLink('ai-hub-service')).toBe(
      '/self-service/templates/default/ai-hub-service',
    );
  });

  it('filters by category', () => {
    const github = filterShowcaseItems(showcaseItems, 'github', '');
    expect(github.every(i => i.category === 'github')).toBe(true);
    expect(github.length).toBeGreaterThan(0);

    const answer = filterShowcaseItems(showcaseItems, 'answer-engine', '');
    expect(answer.every(i => i.category === 'answer-engine')).toBe(true);
  });

  it('filters by search term across name, description and tags', () => {
    expect(
      filterShowcaseItems(showcaseItems, 'all', 'mcp').map(i => i.id),
    ).toContain('template-mcp-server');
    expect(
      filterShowcaseItems(showcaseItems, 'all', 'rag').length,
    ).toBeGreaterThan(0);
    expect(filterShowcaseItems(showcaseItems, 'all', 'zzzz-nothing')).toEqual(
      [],
    );
  });

  it('combines category and search', () => {
    const result = filterShowcaseItems(showcaseItems, 'templates', 'github');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(i => i.category === 'templates')).toBe(true);
  });

  it('countByCategory sums to the total', () => {
    const counts = countByCategory(showcaseItems);
    expect(
      counts.templates + counts.github + counts['answer-engine'] + counts.platform,
    ).toBe(counts.all);
  });
});
