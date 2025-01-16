import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import AdCard from './AdCard';

const BackgroundCard = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
        {[...Array(2)].map((_, index) => (
          <AdCard key={`left-${index}`} position="left" />
        ))}
      </Box>
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
          backgroundColor: '#1E1E1E',
        }}
      >
        <CardContent>{children}</CardContent>
      </Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
        {[...Array(2)].map((_, index) => (
          <AdCard key={`right-${index}`} position="right" />
        ))}
      </Box>
    </Box>
  );
};

export default BackgroundCard;