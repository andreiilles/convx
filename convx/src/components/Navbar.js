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
          <Button color="inherit" component={Link} to="/image-conversion">Image Conversion</Button>
          <Button color="inherit" component={Link} to="/file-compressor">File Compressor</Button>
          <Button color="inherit" component={Link} to="/subscriptions">Subscriptions</Button>
        </Box>

        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          <ShuffleOnRoundedIcon style={{ marginRight: '8px', fontSize: '36px' }} />
          <Typography variant="h5" style={{ color: 'white' }}>convX</Typography>
        </Box>

        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {!user ? (
            <GoogleLogin 
              onSuccess={handleLoginSuccess} 
              onError={handleLoginError}
              render={(renderProps) => (
                <Button 
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled} 
                  color="inherit"
                  startIcon={<ShuffleOnRoundedIcon />} 
                >
                  <Typography variant="h6">Connect with Google</Typography>
                </Button>
              )}
            />
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={user.picture} 
                alt="User Profile" 
                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: '10px' }} 
              />
              <Typography variant="h6" style={{ color: 'white', marginRight: '20px' }}>
                {user.name}
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={onLogout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
