import React from 'react';
import { Box, Card, CardContent } from '@mui/material';

const PageWithCardBackground = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212', // Dark background for contrast
      }}
    >
      <Card
        sx={{
          width: '80%',
          maxWidth: 1200,
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: 6,
          borderRadius: 3,
          backgroundColor: '#1E1E1E', // Dark gray for card background
        }}
      >
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

export default PageWithCardBackground;
