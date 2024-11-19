import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Divider } from '@mui/material';
import { useDropzone } from 'react-dropzone';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);

  // Funciones para drag-and-drop del PDF y certificado
  const onDropPDF = (acceptedFiles) => {
    setPdfFile(acceptedFiles[0]);
  };

  const onDropCertificate = (acceptedFiles) => {
    setCertificateFile(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsPDF, getInputProps: getInputPropsPDF } = useDropzone({
    onDrop: onDropPDF,
    accept: '.pdf',
  });

  const { getRootProps: getRootPropsCertificate, getInputProps: getInputPropsCertificate } = useDropzone({
    onDrop: onDropCertificate,
    accept: '.p12, .pfx, .pem, .crt, .cer',
  });

  const handleSign = () => {
    // Lógica para firmar el PDF (puede ser una función o llamada a backend)
    if (pdfFile && certificateFile) {
      console.log("Archivo PDF:", pdfFile);
      console.log("Archivo de certificado:", certificateFile);
      alert("Documento firmado exitosamente");
    } else {
      alert("Sube un archivo PDF y un certificado para continuar.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Firmar Documento PDF
      </Typography>
      <Grid container spacing={3}>
        
        {/* Sección para el PDF */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6">Arrastra tu archivo PDF aquí</Typography>
            <Box
              {...getRootPropsPDF()}
              sx={{
                border: '2px dashed #1976d2',
                padding: 4,
                marginTop: 2,
                cursor: 'pointer',
                borderRadius: 1,
                color: pdfFile ? '#4caf50' : '#1976d2',
              }}
            >
              <input {...getInputPropsPDF()} />
              {pdfFile ? (
                <Typography variant="body1">Archivo PDF cargado: {pdfFile.name}</Typography>
              ) : (
                <Typography variant="body2">Arrastra o haz clic para seleccionar tu archivo PDF</Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Sección para el Certificado */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
            <Typography variant="h6">Cargar certificado digital</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
              Aceptamos los siguientes formatos de certificados:
            </Typography>
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>.p12 - Certificados PKCS#12</li>
              <li>.pfx - Certificados PKCS#12</li>
              <li>.pem - Certificados PEM</li>
              <li>.crt - Certificados CRT</li>
              <li>.cer - Certificados CER</li>
            </ul>
            <Box
              {...getRootPropsCertificate()}
              sx={{
                border: '2px dashed #1976d2',
                padding: 4,
                marginTop: 2,
                cursor: 'pointer',
                borderRadius: 1,
                color: certificateFile ? '#4caf50' : '#1976d2',
                textAlign: 'center',
              }}
            >
              <input {...getInputPropsCertificate()} />
              {certificateFile ? (
                <Typography variant="body1">Certificado cargado: {certificateFile.name}</Typography>
              ) : (
                <Typography variant="body2">Arrastra o haz clic para seleccionar tu certificado</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 3 }} />

      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSign} sx={{ marginTop: 2 }}>
          Firmar Documento
        </Button>
      </Box>
    </Box>
  );
}

export default App;
