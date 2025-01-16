import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const FileConverterPage = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('txt');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const convertFile = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
      let textContent = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        text.items.forEach(item => {
          textContent += item.str + ' ';
        });
      }

      let convertedContent;
      if (format === 'txt') {
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'converted.txt');
      } else if (format === 'word') {
        const blob = new Blob([textContent], { type: 'application/msword;charset=utf-8' });
        saveAs(blob, 'converted.doc');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>PDF to Word/TXT Converter</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <select value={format} onChange={handleFormatChange}>
        <option value="txt">TXT</option>
        <option value="word">Word</option>
      </select>
      <button onClick={convertFile}>Convert</button>
    </div>
  );
};

export default FileConverterPage;