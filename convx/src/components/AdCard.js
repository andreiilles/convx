import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const AdCard = () => {
  return (
    <Card
      sx={{
        width: '100%',
        paddingTop: '177.78%', 
        backgroundColor: '#1E1E1E',
        boxShadow: 3,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
      }}
    >
      <CardContent sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
          Your ad here
        </Typography>
      </CardContent>
    </Card>
  );
};

const AdCardsPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: '#121212',
      }}
    >
      <AdCard />
      <AdCard />
      <AdCard />
    </Box>
  );
};

export default AdCardsPage;
