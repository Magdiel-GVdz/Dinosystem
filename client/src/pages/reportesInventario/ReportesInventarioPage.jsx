import React from 'react';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import LibrosTable from '../libros/LibrosTable';
import { Button } from '@mui/material';

// Opciones de configuración para el PDF
const options = {
  filename: "libros-inventario.pdf",
  method: "save",
  resolution: Resolution.EXTREME,
  page: {
    margin: Margin.SMALL,
    format: "letter",
    orientation: "landscape"
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1
  },
  overrides: {
    pdf: {
      compress: true
    },
    canvas: {
      useCORS: true
    }
  }
};

// Función para obtener el elemento objetivo
const getTargetElement = () => document.getElementById("libros-table-container");

// Función para descargar el PDF
const downloadPdf = () => generatePDF(getTargetElement, options);

const ReportesInventarioPage = () => {
  return (
    <div>
      ReportesInventarioPage
      <div id="libros-table-container">
        <LibrosTable />
      </div>
      <Button onClick={downloadPdf}>Descargar reporte</Button>
    </div>
  );
};

export default ReportesInventarioPage;

