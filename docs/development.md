# Development

## Creating a New Plugin

On the command line, run the following command to create a new plugin.

```bash
yarn new
```

[Documentation](https://backstage.io/docs/conf/defining/)

### Validating Configuration

Schemas can be validated using the command:

```bash
backstage-cli config:check
```

To validate and examine the frontend configuration, use the command:

```bash
backstage-cli config:print --frontend
```

## Using Storybook

There's a Backstage Storybook site that can be used to view and develop components.

https://backstage.io/storybook

Storybook is a tool for developing UI components in isolation. It encourages the creation of reusable components and allows for the visual testing of components in different states.

[What is Storybook?](https://www.perplexity.ai/search/backstage-storybook-QUfnZxrpQKST1rscB..iww)

## Theme Providers

https://mui.com/material-ui/customization/theming/#accessing-the-theme-in-a-component

## Guides

- [Debugging Jest Tests](https://backstage.io/docs/tooling/cli/build-system/#debugging-jest-tests)
- [Testing with Jest](https://backstage.io/docs/plugins/testing)
