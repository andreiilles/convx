import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import ImageConversionPage from './pages/ImageConversionPage';
import FileCompressorPage from './pages/FileCompressorPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import { ThemeProvider } from '@mui/material';
import spotifyTheme from './styles/theme';
import AdCard from './components/AdCard'; 

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Credential Response:', credentialResponse);

    try {
      const decodedToken = jwt_decode(credentialResponse.credential);
      console.log('Decoded Token:', decodedToken);
      setUser({
        name: decodedToken.name,
        picture: decodedToken.picture,
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={spotifyTheme}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                           locale="en">
        <Router>
          <ScrollToTop />
          <div>
            <Navbar user={user} onLogout={handleLogout} handleLoginSuccess={handleLoginSuccess} handleLoginError={handleLoginError} />
            <Routes>
              <Route path="/" element={<MainPage user={user} onLogout={handleLogout} handleLoginSuccess={handleLoginSuccess} handleLoginError={handleLoginError} />} />
              <Route path="/image-conversion" element={<ImageConversionPage user={user} onLogout={handleLogout} handleLoginSuccess={handleLoginSuccess} handleLoginError={handleLoginError} />} />
              <Route path="/file-compressor" element={<FileCompressorPage user={user} onLogout={handleLogout} handleLoginSuccess={handleLoginSuccess} handleLoginError={handleLoginError} />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
            </Routes>
            <AdCard position="left" />
            <AdCard position="right" />
          </div>
        </Router>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
