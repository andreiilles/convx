import React from 'react';
import { Typography } from '@mui/material';
import PageWithCardBackground from '../components/BackgroundCard'; // Adjust the import path

function HomePage() {
  return (
    <PageWithCardBackground>
      <Typography variant="h4" align="center" sx={{ color: '#fff' }}>
        Welcome to the Platform!
      </Typography>
      <Typography variant="h6" align="center" sx={{ color: '#bbb', marginTop: 2 }}>
        Your go-to place for all your file conversions and compressions.
      </Typography>
    </PageWithCardBackground>
  );
}

export default HomePage;
