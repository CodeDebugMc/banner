import React from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import PostPlatform from './pages/PostPlatform';
import PostCarousel from './pages/PostCarousel';

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Post Submission Platform</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <PostPlatform />
        <PostCarousel />
      </Container>
    </>
  );
}
