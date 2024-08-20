# Code Templates

Backstage code templates, also known as software templates, are a powerful feature of the Backstage developer portal that allows organizations to standardize and automate the creation of new software projects, components, or services. These templates serve several important purposes:

1. **Standardization**: Templates help enforce consistent project structures, coding standards, and best practices across an organization.
2. **Automation**: They automate the scaffolding process, reducing the time and effort required to set up new projects.
3. **Customization**: Organizations can create templates tailored to their specific needs, technologies, and workflows.
4. **Onboarding**: Templates make it easier for new developers to start projects that align with organizational standards.

## Examples

Some good places to find example templates:

- [The official Backstage GitHub repo](https://github.com/backstage/software-templates)
- [Roadie's template collection](https://github.com/RoadieHQ/software-templates)

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

## Backends

Backstage supports multiple backends for fetching templates, including:

- [GitLab](https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend-module-gitlab)
- [GitHub](https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend-module-github)
- [Bitbucket](https://github.com/backstage/backstage/tree/master/plugins/scaffolder-backend-module-bitbucket)

## Writing Custom Actions

To write your own custom action in Backstage, follow these steps:

1. Run the following CLI command to create a new action:

   ```bash
   yarn backstage-cli new scaffolder-module
   ```

2. Create a new function that returns a `createTemplateAction` object. This function will define your custom action.

3. Use the `createTemplateAction` function from `@backstage/plugin-scaffolder-node` to structure your action:

   ```typescript
   import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

   export const myCustomAction = () => {
     return createTemplateAction({
       id: 'my:custom:action',
       description: 'Description of your custom action',
       schema: {
         input: z.object({
           // Define input parameters using Zod schema
         }),
       },
       async handler(ctx) {
         // Implement your action logic here
       },
     });
   };
   ```

4. Specify a unique `id` for your action, following the naming convention `provider:entity:verb` (e.g., `acme:file:create`)[1].

5. Define the `schema.input` using Zod or JSON schema to specify the expected input parameters for your action[1].

6. Implement the `handler` function, which contains the actual logic of your action. This function receives a `ctx` (context) object with useful properties and methods:

   - `ctx.workspacePath`: The working directory for the template
   - `ctx.input`: The input values provided by the user
   - `ctx.output`: A function to set output values
   - `ctx.logger`: A Winston logger for additional logging

7. Use the context object to access input parameters and perform the desired operations. For example:

   ```typescript
   async handler(ctx) {
   const { filename, contents } = ctx.input;
   await fs.outputFile(
       `${ctx.workspacePath}/${filename}`,
       contents
   );
   ctx.logger.info(`Created file: ${filename}`);
   }
   ```

8. Register your custom action in the Backstage backend. You can do this by creating a backend module and using the `scaffolderActionsExtensionPoint`:

   ```typescript
   import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
   import { createBackendModule } from '@backstage/backend-plugin-api';

   const scaffolderModuleCustomExtensions = createBackendModule({
     pluginId: 'scaffolder',
     moduleId: 'custom-extensions',
     register(env) {
       env.registerInit({
         deps: {
           scaffolder: scaffolderActionsExtensionPoint,
         },
         async init({ scaffolder }) {
           scaffolder.addActions(myCustomAction());
         },
       });
     },
   });
   ```

9. Add your custom action to the backend:

   ```typescript
   const backend = createBackend();
   backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
   backend.add(scaffolderModuleCustomExtensions());
   ```

   By following these steps, you can create and integrate your own custom actions into the Backstage scaffolder, extending its functionality to meet your specific needs[1].
