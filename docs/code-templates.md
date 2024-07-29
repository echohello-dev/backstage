# Code Templates

Backstage code templates, also known as software templates, are a powerful feature of the Backstage developer portal that allows organizations to standardize and automate the creation of new software projects, components, or services. These templates serve several important purposes:

1. **Standardization**: Templates help enforce consistent project structures, coding standards, and best practices across an organization.
2. **Automation**: They automate the scaffolding process, reducing the time and effort required to set up new projects.
3. **Customization**: Organizations can create templates tailored to their specific needs, technologies, and workflows.
4. **Onboarding**: Templates make it easier for new developers to start projects that align with organizational standards.

## Examples

Some good places to find example templates:

- The official Backstage GitHub repo: https://github.com/backstage/software-templates
- Roadie's template collection: https://github.com/RoadieHQ/software-templates

## Getting Started

To create a new software template, you need to define a template in your Backstage instance. The template is a directory containing the files and folders that make up the template. The template directory should be structured as follows:

A basic template structure includes:

- A skeleton code structure to stamp out new projects
- A `template.yaml` file describing the scaffolding steps
- Parameters to collect user input
- Steps that define actions to take (e.g. fetch template, publish to GitHub)

Common built-in actions include:

- `fetch:template` - Fetch and template a skeleton
- `publish:github` - Publish to GitHub
- `catalog:register` - Register the new component in the catalog
