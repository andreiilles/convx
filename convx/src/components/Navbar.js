import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import ShuffleOnRoundedIcon from '@mui/icons-material/ShuffleOnRounded';

function Navbar({ user, onLogout, handleLoginSuccess, handleLoginError }) {
  return (
    <AppBar position="sticky" style={{ backgroundColor: '#1DB954' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/image-conversion">File Conversion</Button>
          <Button color="inherit" component={Link} to="/file-compressor">File Compressor</Button>
         
        </Box>

        <Box style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
          <ShuffleOnRoundedIcon style={{ marginRight: '8px', fontSize: '36px' }} />
          <Typography variant="h5" style={{ color: 'white' }}>convX</Typography>
        </Box>

        
      </Toolbar>
      <style jsx>{`
        @media (max-width: 600px) {
          .logo-container {
            display: none;
          }
        }
      `}</style>
    </AppBar>
  );
}
export default Navbar;