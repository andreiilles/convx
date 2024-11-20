import React from 'react';
import { Typography } from '@mui/material';
import PageWithCardBackground from '../components/BackgroundCard'; // Adjust the import path

function HomePage() {
  return (
    <PageWithCardBackground>
      <Typography variant="h4" align="center" sx={{ color: '#fff' }}>
        Welcome to convX
      </Typography>
      <Typography variant="h6" align="center" sx={{ color: '#bbb', marginTop: 2 }}>
        convX is an all-in-one tool for image conversion and file compression
      </Typography>
    </PageWithCardBackground>
  );
}

export default HomePage;
