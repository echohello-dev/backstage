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

## Customising React Components

https://mui.com/material-ui/react-button/#customization

Using styled components to customise the appearance of MUI components.

```jsx
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function CustomizedButtons() {
  return <CustomButton>Custom Button</CustomButton>;
}
```

## Theme Providers

https://mui.com/material-ui/customization/theming/#accessing-the-theme-in-a-component

## Guides

- [Debugging Jest Tests](https://backstage.io/docs/tooling/cli/build-system/#debugging-jest-tests)
- [Testing with Jest](https://backstage.io/docs/plugins/testing)
