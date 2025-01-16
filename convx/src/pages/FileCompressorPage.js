import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import BackgroundCard from '../components/BackgroundCard';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const FileCompressorPage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setError(null);
    },
  });

  const handleCompress = async (compressionLevel) => {
    try {
      const zip = new JSZip();
      for (const file of files) {
        console.log(`Reading file: ${file.name}`);
        const fileContent = await readFileInChunks(file);
        zip.file(file.name, fileContent);
      }

      console.log('Generating compressed blob');
      const compressedBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: compressionLevel } });
      saveAs(compressedBlob, 'compressed_files.zip');
      console.log('Compression successful');
    } catch (err) {
      console.error('Compression failed:', err);
      setError(`Compression failed: ${err.message}`);
    }
  };

  const readFileInChunks = (file) => {
    return new Promise((resolve, reject) => {
      const chunkSize = 1024 * 1024; // 1MB
      const chunks = [];
      let offset = 0;

      const reader = new FileReader();

      reader.onload = (e) => {
        chunks.push(e.target.result);
        offset += chunkSize;
        if (offset < file.size) {
          readNextChunk();
        } else {
          resolve(new Blob(chunks));
        }
      };

      reader.onerror = (e) => {
        reject(new Error(`Error reading file: ${e.target.error.message}`));
      };

      const readNextChunk = () => {
        try {
          const slice = file.slice(offset, offset + chunkSize);
          reader.readAsArrayBuffer(slice);
        } catch (err) {
          reject(new Error('The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.'));
        }
      };

      readNextChunk();
    });
  };

  return (
    <BackgroundCard>
      <Box sx={styles.container}>
        <Card sx={styles.card} {...getRootProps()}>
          <input {...getInputProps()} />
          <CardContent sx={styles.cardContent}>
            {files.length > 0 ? (
              <Box sx={styles.fileList}>
                {files.map((file, index) => (
                  <Typography key={index} variant="body2">
                    {file.name}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" sx={styles.instructions}>
                Drop files here or click to select files.
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6">Basic Compression</Typography>
            <Typography variant="body2" sx={styles.price}>Small File Sizes</Typography>
            <Button sx={styles.button} onClick={() => handleCompress(1)}>Compress</Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6">Standard Compression</Typography>
            <Typography variant="body2" sx={styles.price}>Medium File Sizes</Typography>
            <Button sx={styles.button} onClick={() => handleCompress(5)}>Compress</Button>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6">High Compression</Typography>
            <Typography variant="body2" sx={styles.price}>Large File Sizes</Typography>
            <Button sx={styles.button} onClick={() => handleCompress(9)}>Compress</Button>
          </CardContent>
        </Card>
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={styles.error}>
          {error}
        </Typography>
      )}
    </BackgroundCard>
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
    gap: '20px',
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
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100%',
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
    marginTop: 'auto',
  },
  instructions: {
    marginTop: '10px',
    color: '#888',
    fontSize: '14px',
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  error: {
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default FileCompressorPage;