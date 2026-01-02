import { useTheme as useMuiTheme } from '@mui/material/styles';
import { BaseStyles, Button, Label, ThemeProvider } from '@primer/react';

export function PrimerDemo() {
  const muiTheme = useMuiTheme();
  const colorMode = muiTheme.palette.mode === 'dark' ? 'night' : 'day';

  return (
    <ThemeProvider colorMode={colorMode}>
      <BaseStyles>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 16,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'var(--borderColor-default, rgba(27, 31, 36, 0.16))',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <Button variant="primary">Primer Button</Button>
            <Label variant="accent">Primer Label</Label>
          </div>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Primer BaseStyles + ThemeProvider are scoped to this card only.
          </p>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}
