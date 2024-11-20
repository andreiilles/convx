import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout, handleLoginSuccess, handleLoginError }) {
  return (
    <AppBar position="sticky" style={{ backgroundColor: '#1DB954' }}>
      <Toolbar>
        {/* Navbar Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/image-conversion">Image Conversion</Button>
          <Button color="inherit" component={Link} to="/file-compressor">File Compressor</Button>
        </div>
        {/* Google Login Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!user ? (
            <GoogleLogin 
              onSuccess={handleLoginSuccess} 
              onError={handleLoginError}
              render={(renderProps) => (
                <Button 
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled} 
                  color="inherit"
                >
                  <Typography variant="h6">Connect with Google</Typography>
                </Button>
              )}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;