import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import BackgroundCard from '../components/BackgroundCard';

const ImageConversionPage = () => {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(URL.createObjectURL(file));
    },
  });

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleConvert = () => {
    if (image && format) {
      console.log(`Converting image to ${format}`);
    } else {
      alert('Please upload an image and select a format.');
    }
  };

  return (
    <BackgroundCard>
      <Box sx={styles.container}>
        <Card sx={styles.imageCard} {...getRootProps()}>
          <input {...getInputProps()} />
          <CardContent sx={styles.cardContent}>
            {image ? (
              <Box sx={styles.previewContainer}>
                <img src={image} alt="Preview" style={styles.previewImage} />
              </Box>
            ) : (
              <Typography variant="body2" sx={styles.instructions}>
                Drop an image here or click to select one.
              </Typography>
            )}
          </CardContent>
        </Card>
        <Card sx={styles.convertCard}>
          <CardContent sx={styles.cardContent}>
            {image && (
              <>
                <FormControl fullWidth sx={styles.formControl}>
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={format}
                    onChange={handleFormatChange}
                    label="Format"
                    sx={styles.select}
                  >
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="jpeg">JPEG</MenuItem>
                    <MenuItem value="webp">WEBP</MenuItem>
                  </Select>
                </FormControl>
                <Button sx={styles.convertButton} onClick={handleConvert}>
                  Convert
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </BackgroundCard>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px', 
  },
  imageCard: {
    backgroundColor: '#121212',
    color: 'white',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    width: '640px', 
    height: '360px', 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease', 
    '&:hover': {
      transform: 'scale(1.05)', 
    },
    cursor: 'pointer',
  },
  convertCard: {
    backgroundColor: '#121212',
    color: 'white',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '300px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '20px',
    height: '100%',
  },
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  previewImage: {
    marginTop: '20px',
    maxHeight: '320px',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  formControl: {
    marginBottom: '20px',
    width: '200px', 
  },
  select: {
    backgroundColor: 'white',
  },
  convertButton: {
    backgroundColor: '#1DB954',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1ed760',
    },
    padding: '10px 20px',
  },
  instructions: {
    marginTop: '10px',
    color: '#888',
    fontSize: '14px',
  },
};

export default ImageConversionPage;
