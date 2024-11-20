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
      <AdCard position="left" />
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
      <AdCard position="right" />
    </Box>
  );
};

export default BackgroundCard;
