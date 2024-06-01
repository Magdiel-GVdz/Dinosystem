import React, { useState } from 'react';
import { useBook } from "../../hooks/useBook";
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportesInventarioPage = () => {
  const { getBooks } = useBook();
  const [bookData, setBookData] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const data = await getBooks();  // Cambiado a getBooks para obtener todos los libros
      setBookData(data);
    } catch (error) {
      console.error('Error generando el reporte:', error);
    }
  };

  const handleClearReport = () => {
    setBookData([]);
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Inventario', 10, 10);
    doc.autoTable({
      head: [['Codigo de Barras', 'Titulo', 'Precio', 'Stock']],
      body: bookData.map(book => [
        book.barcode,
        book.title,
        book.price,
        book.stock
      ]),
    });
    doc.save('reporte_inventario.pdf');
  };

  return (
    <div>
      <h1>Dinolibros</h1>
      <Button variant="contained" onClick={handleGenerateReport}>Generar Reporte</Button>
      <Button variant="contained" onClick={handlePrintPDF} sx={{ marginLeft: '10px' }}>Descargar reporte</Button>
      <Button variant="contained" onClick={handleClearReport} sx={{ marginLeft: '10px' }}>Limpiar Reporte</Button>

      <h2>Libros en Existencia</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo de Barras</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookData.map((book) => (
            <TableRow key={book.barcode}>
              <TableCell>{book.barcode}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.price}</TableCell>
              <TableCell>{book.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportesInventarioPage;
