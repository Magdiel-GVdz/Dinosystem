import React, { useState } from 'react';
import { useSales } from "../../hooks/useSales";
import { Button, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportesVentasPage = () => {
  const { getSales } = useSales();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const data = await getSales();
      setSalesData(data);
    } catch (error) {
      console.error('Error generando el reporte:', error);
    }
  };

  const handleClearReport = () => {
    setSalesData([]);
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Ventas', 10, 10);
    doc.autoTable({
      head: [['ID de Venta', 'Vendedor', 'Libros','Cantidad', 'Fecha de Venta', 'Total']],
      body: salesData.map(sale => [
        sale.id,
        sale.user,
        sale.book,
        sale.quantity,
        sale.date,
        sale.total_price
      ]),
    });
    doc.save('reporte_ventas.pdf');
  };

  return (
    <div>
      <h1>Reportes de Ventas</h1>
      <TextField
        label="Fecha de inicio"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ marginRight: '10px' }}
      />
      <TextField
        label="Fecha de fin"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ marginRight: '10px' }}
      />
      <Button variant="contained" onClick={handleGenerateReport}>Generar Reporte</Button>
      <Button variant="contained" onClick={handlePrintPDF} sx={{ marginLeft: '10px' }}>Descargar reporte</Button>
      <Button variant="contained" onClick={handleClearReport} sx={{ marginLeft: '10px' }}>Limpiar Reporte</Button>

      <h2>Tabla de Ventas</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de Venta</TableCell>
            <TableCell>Vendedor</TableCell>
            <TableCell>Libros</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Fecha de Venta</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.user}</TableCell>
              <TableCell>{sale.book}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>{sale.date}</TableCell>
              <TableCell>{sale.total_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportesVentasPage;
