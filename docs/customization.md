# Customization

## Customizing React Components

Using styled components to customize the appearance of MUI components.

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

See more information on MUI [customisation](https://mui.com/material-ui/react-button/#customization).

## Catalog

The catalog is a place to store and manage all your software components. We can customize the catalog to suit our needs:

- Pagniation
- Filtering
- Columns
- Actions

See more information on the [catalog customisation](https://backstage.io/docs/features/software-catalog/catalog-customization).
