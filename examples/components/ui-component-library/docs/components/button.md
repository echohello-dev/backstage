# Button Component

The Button component is a customizable button that can be used throughout the application.

## Props

| Prop     | Type                              | Default   | Description                   |
|----------|-----------------------------------|-----------|-------------------------------|
| variant  | 'primary' \| 'secondary' \| 'text' | 'primary' | The visual style of the button |
| size     | 'small' \| 'medium' \| 'large'     | 'medium'  | The size of the button         |
| disabled | boolean                           | false     | Whether the button is disabled |

## Example

Here's an example of how to use the Button component:

```tsx
import { Button } from '@your-org/ui-component-library';

function SubmitButton() {
  return (
    <Button variant="primary" size="large" onClick={handleSubmit}>
      Submit
    </Button>
  );
}
```
