import { ReactNode } from 'react';

export type ToolCategory = 
  | 'development'
  | 'infrastructure'
  | 'monitoring'
  | 'documentation'
  | 'communication'
  | 'security'
  | 'data'
  | 'productivity';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  url: string;
  icon?: ReactNode;
  tags?: string[];
  isInternal?: boolean;
  isNew?: boolean;
}

export const categoryLabels: Record<ToolCategory, string> = {
  development: 'Development',
  infrastructure: 'Infrastructure',
  monitoring: 'Monitoring & Observability',
  documentation: 'Documentation',
  communication: 'Communication',
  security: 'Security',
  data: 'Data & Analytics',
  productivity: 'Productivity',
};

export const categoryColors: Record<ToolCategory, string> = {
  development: '#2196f3',
  infrastructure: '#ff9800',
  monitoring: '#4caf50',
  documentation: '#9c27b0',
  communication: '#e91e63',
  security: '#f44336',
  data: '#00bcd4',
  productivity: '#607d8b',
};

export const defaultTools: Tool[] = [
  // Development
  {
    id: 'github',
    name: 'GitHub',
    description: 'Source code management, pull requests, and code review',
    category: 'development',
    url: 'https://github.com',
    tags: ['git', 'scm', 'code'],
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'DevOps platform with built-in CI/CD',
    category: 'development',
    url: 'https://gitlab.com',
    tags: ['git', 'scm', 'cicd'],
  },
  {
    id: 'vscode',
    name: 'VS Code Web',
    description: 'Browser-based code editor',
    category: 'development',
    url: 'https://vscode.dev',
    tags: ['ide', 'editor'],
    isNew: true,
  },
  {
    id: 'codespaces',
    name: 'GitHub Codespaces',
    description: 'Cloud development environments',
    category: 'development',
    url: 'https://github.com/codespaces',
    tags: ['cloud', 'dev-environment'],
  },

  // Infrastructure
  {
    id: 'aws',
    name: 'AWS Console',
    description: 'Amazon Web Services management console',
    category: 'infrastructure',
    url: 'https://console.aws.amazon.com',
    tags: ['cloud', 'aws'],
  },
  {
    id: 'azure',
    name: 'Azure Portal',
    description: 'Microsoft Azure management portal',
    category: 'infrastructure',
    url: 'https://portal.azure.com',
    tags: ['cloud', 'azure'],
  },
  {
    id: 'gcp',
    name: 'Google Cloud Console',
    description: 'Google Cloud Platform management console',
    category: 'infrastructure',
    url: 'https://console.cloud.google.com',
    tags: ['cloud', 'gcp'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes Dashboard',
    description: 'Web-based Kubernetes user interface',
    category: 'infrastructure',
    url: '/kubernetes',
    tags: ['k8s', 'containers'],
    isInternal: true,
  },
  {
    id: 'terraform',
    name: 'Terraform Cloud',
    description: 'Infrastructure as code collaboration',
    category: 'infrastructure',
    url: 'https://app.terraform.io',
    tags: ['iac', 'infrastructure'],
  },

  // Monitoring
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Metrics visualization and dashboards',
    category: 'monitoring',
    url: 'https://grafana.example.com',
    tags: ['metrics', 'dashboards'],
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Cloud monitoring and security platform',
    category: 'monitoring',
    url: 'https://app.datadoghq.com',
    tags: ['apm', 'logs', 'metrics'],
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Incident management and on-call scheduling',
    category: 'monitoring',
    url: 'https://app.pagerduty.com',
    tags: ['incidents', 'oncall'],
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Error tracking and performance monitoring',
    category: 'monitoring',
    url: 'https://sentry.io',
    tags: ['errors', 'performance'],
  },

  // Documentation
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Team documentation and knowledge base',
    category: 'documentation',
    url: 'https://confluence.example.com',
    tags: ['wiki', 'docs'],
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Notes, docs, and project management',
    category: 'documentation',
    url: 'https://notion.so',
    tags: ['wiki', 'notes'],
  },
  {
    id: 'swagger',
    name: 'Swagger UI',
    description: 'API documentation and testing',
    category: 'documentation',
    url: '/api-docs',
    tags: ['api', 'openapi'],
    isInternal: true,
  },

  // Communication
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team messaging and collaboration',
    category: 'communication',
    url: 'https://slack.com',
    tags: ['chat', 'messaging'],
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Video meetings and team chat',
    category: 'communication',
    url: 'https://teams.microsoft.com',
    tags: ['chat', 'video'],
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Community chat and voice',
    category: 'communication',
    url: 'https://discord.com',
    tags: ['chat', 'community'],
  },

  // Security
  {
    id: 'vault',
    name: 'HashiCorp Vault',
    description: 'Secrets management and data protection',
    category: 'security',
    url: 'https://vault.example.com',
    tags: ['secrets', 'encryption'],
  },
  {
    id: 'snyk',
    name: 'Snyk',
    description: 'Security vulnerability scanning',
    category: 'security',
    url: 'https://app.snyk.io',
    tags: ['vulnerabilities', 'dependencies'],
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    description: 'Code quality and security analysis',
    category: 'security',
    url: 'https://sonarqube.example.com',
    tags: ['code-quality', 'static-analysis'],
  },

  // Data
  {
    id: 'bigquery',
    name: 'BigQuery',
    description: 'Google Cloud data warehouse',
    category: 'data',
    url: 'https://console.cloud.google.com/bigquery',
    tags: ['sql', 'analytics'],
  },
  {
    id: 'redash',
    name: 'Redash',
    description: 'Data visualization and dashboards',
    category: 'data',
    url: 'https://redash.example.com',
    tags: ['dashboards', 'sql'],
  },
  {
    id: 'airflow',
    name: 'Apache Airflow',
    description: 'Workflow orchestration platform',
    category: 'data',
    url: 'https://airflow.example.com',
    tags: ['etl', 'pipelines'],
  },

  // Productivity
  {
    id: 'jira',
    name: 'Jira',
    description: 'Project and issue tracking',
    category: 'productivity',
    url: 'https://jira.example.com',
    tags: ['issues', 'agile'],
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Modern issue tracking for teams',
    category: 'productivity',
    url: 'https://linear.app',
    tags: ['issues', 'projects'],
    isNew: true,
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Design and prototyping tool',
    category: 'productivity',
    url: 'https://figma.com',
    tags: ['design', 'ui'],
  },
];
