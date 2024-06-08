import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

const StyledPaper = styled(Paper)(() => ({}));

export const HomePage = () => (
  <Container maxWidth="lg">
    <Box my={4}>
      <Typography variant="h2" gutterBottom>
        Welcome to echoHello
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The developer experience platform providing a hub to identify, discover,
        and create new software.
      </Typography>
    </Box>

    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <Typography variant="h6" gutterBottom>
            Create an app
          </Typography>
          <Typography variant="body1" gutterBottom>
            Get started quickly with our many blueprints
          </Typography>
          <Icon>build</Icon>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <Typography variant="h6" gutterBottom>
            Get access
          </Typography>
          <Typography variant="body1" gutterBottom>
            Self service access control for GitHub and more
          </Typography>
          <Icon>lock</Icon>
        </StyledPaper>
      </Grid>
    </Grid>

    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Need Help?
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Icon>description</Icon>
          <Typography variant="body2">Request a feature</Typography>
        </Grid>
        <Grid item>
          <Icon>chat</Icon>
          <Typography variant="body2">Chat with us</Typography>
        </Grid>
        <Grid item>
          <Icon>help</Icon>
          <Typography variant="body2">See new features</Typography>
        </Grid>
      </Grid>
    </Box>
  </Container>
);
