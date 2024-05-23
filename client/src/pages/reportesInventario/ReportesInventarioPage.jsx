import React from 'react';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import LibrosTable from '../libros/LibrosTable';

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
      <button onClick={downloadPdf}>Download PDF</button>
      <div id="libros-table-container">
        <LibrosTable />
      </div>
    </div>
  );
};

export default ReportesInventarioPage;

