import React from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import PageWithCardBackground from '../components/BackgroundCard'; // Adjust the path if needed

const SubscriptionPage = () => {
  return (
    <PageWithCardBackground>
      <Box sx={styles.container}>
        {/* Card 1 */}
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6">Basic Plan</Typography>
            <Typography variant="body2" sx={styles.price}>2.99€/month</Typography>
            <Button sx={styles.button}>Subscribe</Button>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6">Standard Plan</Typography>
            <Typography variant="body2" sx={styles.price}>4.99€/month</Typography>
            <Button sx={styles.button}>Subscribe</Button>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6">Premium Plan</Typography>
            <Typography variant="body2" sx={styles.price}>8.99€/month</Typography>
            <Button sx={styles.button}>Subscribe</Button>
          </CardContent>
        </Card>
      </Box>
    </PageWithCardBackground>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px', // Adds spacing between cards
  },
  card: {
    backgroundColor: '#121212',
    color: 'white',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    width: '250px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Hover scale effect
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Vertically centers content
    alignItems: 'center',
    padding: '20px',
    height: '100%', // Ensures content takes up full height
  },
  price: {
    margin: '10px 0',
    fontWeight: 'bold',
    color: '#1DB954',
  },
  button: {
    backgroundColor: '#1DB954',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1ed760',
    },
    marginTop: 'auto', // Pushes the button to the bottom
  },
};

export default SubscriptionPage;
