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
      const filteredData = data.filter(sale => {
        const saleDate = new Date(sale.date);
        return (!startDate || saleDate >= new Date(startDate)) && (!endDate || saleDate <= new Date(endDate)) && (startDate || saleDate <= new Date(startDate));
      });
      setSalesData(filteredData);
    } catch (error) {
      console.error('Error generando el reporte:', error);
    }
  };

  const handleClearReport = () => {
    setSalesData([]);
    setStartDate('');
    setEndDate('');
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Ventas', 10, 10);
    doc.autoTable({
      head: [['ID de Venta', 'Vendedor', 'Fecha de Venta', 'Total']],
      body: salesData.map(sale => [
        sale.id,
        sale.user,
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
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha de fin"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ marginRight: '10px' }}
        InputLabelProps={{ shrink: true }}
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
            <TableCell>Fecha de Venta</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.user}</TableCell>
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
