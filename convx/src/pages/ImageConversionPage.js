import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import BackgroundCard from '../components/BackgroundCard'; // Assuming you have this component
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';
import PptxGenJS from 'pptxgenjs';
import * as pdfjsLib from 'pdfjs-dist/webpack';

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

function ImageConversionPage() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [format, setFormat] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const formatOptions = {
    image: ['png', 'jpeg', 'webp'],
    text: ['pdf', 'word'],
    word: ['docx', 'pdf'],
    pptx: ['pptx', 'pdf'],
    pdf: ['docx', 'pptx' , 'txt'], 
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,text/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation', // Add more file types here
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileType = file.type.split('/')[0];
        setFileType(fileType);
        setFormat(formatOptions[fileType] ? formatOptions[fileType][0] : ''); // Set default format for the file type
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (fileType === 'text') {
            setFileContent(reader.result);
          } else if (file.name.endsWith('.pdf')) {

            setFileContent(reader.result);
            setFileType('pdf');
          } else {
            setFile(reader.result);
          }
        };
        if (fileType === 'text') {
          reader.readAsText(file);
        } else if (fileType === 'application' && file.name.endsWith('.pdf')) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsDataURL(file);
        }
      } else {
        alert('Please upload a valid file.');
      }
    },
  });

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleConvert = async () => {
    if (fileType === 'image') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = file;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const convertedImage = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.href = convertedImage;
        link.download = `converted_image.${format}`;
        link.click();
      };
    } else if (fileType === 'text') {
      if (format === 'pdf') {
        const doc = new jsPDF();
        doc.text(fileContent, 10, 10);
        doc.save('converted_text.pdf');
      } else {
        const blob = new Blob([fileContent], { type: `text/${format}` });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `converted_text.${format}`;
        link.click();
      }
    } else if (fileType === 'application' && fileName.endsWith('.pdf')) {
      const pdfDoc = await PDFDocument.load(fileContent);
      pdfDoc.save('converted.pdf');
    } else if (fileType === 'pdf') {
      const pdfDoc = await PDFDocument.load(fileContent);
      let convertedBytes;
      if (format === 'docx') {
         const blob = new Blob([textContent], { type: 'application/msword;charset=utf-8' });
          saveAs(blob, 'converted.doc');
      }
       else if (format === 'pptx') {
        const pptx = new PptxGenJS();
        pptx.addSlide().addText(await extractTextFromPDF(pdfDoc), { x: 1, y: 1, fontSize: 18 });
        convertedBytes = await pptx.write('blob');
      } else if (format === 'txt') {
        const textContent = await extractTextFromPDF(pdfDoc);
        convertedBytes = new Blob([textContent], { type: 'text/plain' });
      }
      const link = document.createElement('a');
      link.href = URL.createObjectURL(convertedBytes);
      link.download = `converted_file.${format}`;
      link.click();
    }
  };

  const extractTextFromPDF = async (pdfDoc) => {
    const pdf = await pdfjsLib.getDocument({ data: fileContent }).promise;
    let textContent = '';
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const text = await page.getTextContent();
      textContent += text.items.map(item => item.str).join(' ') + '\n';
    }
    return textContent;
  };

  return (
    <BackgroundCard>
      <Box sx={styles.container}>
        <Card sx={styles.imageCard} {...getRootProps()}>
          <input {...getInputProps()} />
          <CardContent sx={styles.cardContent}>
            {file || fileContent ? (
              <Box sx={styles.previewContainer}>
                {fileType === 'image' ? (
                  <img src={file} alt="Preview" style={styles.previewImage} />
                ) : (
                  <Typography variant="body2" sx={styles.instructions}>
                    File uploaded: {fileName}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" sx={styles.instructions}>
                Drop a file here or click to select one.
              </Typography>
            )}
          </CardContent>
        </Card>
        <Card sx={styles.convertCard}>
          <CardContent sx={styles.cardContent}>
            {file || fileContent ? (
              <>
                <FormControl fullWidth sx={{ ...styles.formControl }}>
                  <InputLabel shrink style={{ color: '#fff', fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
                    Convert to :
                  </InputLabel>
                  <br></br>
                  <Select
                    value={format}
                    onChange={handleFormatChange}
                    sx={{ ...styles.select, color: '#1E1E1E', textAlign: 'center', width: '100%' }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#1E1E1E',
                          color: '#fff',
                        },
                      },
                    }}
                  >
                    {formatOptions[fileType] && formatOptions[fileType].map((option) => (
                      <MenuItem key={option} value={option} sx={{ backgroundColor: '#1E1E1E', color: '#fff' }}>
                        {option.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button sx={styles.convertButton} onClick={handleConvert}>
                  Convert
                </Button>
              </>
            ) : null}
          </CardContent>
        </Card>
      </Box>
    </BackgroundCard>
  );
}

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