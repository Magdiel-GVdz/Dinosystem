import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form-mui";
import { DateTimePickerElement } from "react-hook-form-mui/date-pickers";
import { 
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography 
} from '@mui/material';

const ReportesVentasPage = () => {
  const { control, getValues } = useForm();
  const [sales, setSales] = useState([]);

  const fetchSales = () => {
    const values = getValues();
    fetch('/sales/fetch-sales-by-date/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ startDate: values.start_date, endDate: values.end_date })
    })
    .then(response => response.json())
    .then(data => setSales(data));
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Reportes de Ventas</Typography>
      <form noValidate autoComplete="off">
        <DateTimePickerElement
          control={control}
          name="start_date"
          views={['day', 'month', 'year', 'hours', 'minutes']}
          label="Fecha inicio"
          required
        />
        <DateTimePickerElement
          control={control}
          name="end_date"
          views={['day', 'month', 'year', 'hours', 'minutes']}
          label="Fecha final"
          required
        />
        <Button variant="contained" color="primary" onClick={fetchSales} fullWidth style={{ marginTop: '20px' }}>
          Buscar
        </Button>
      </form>
      {sales.length > 0 && (
        <>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Venta</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Libros Vendidos</TableCell>
                  <TableCell>Fecha de Venta</TableCell>
                  <TableCell>Nombre del Vendedor</TableCell>
                  <TableCell>Total de la Compra</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale, index) => (
                  <TableRow key={index}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.precio}</TableCell>
                    <TableCell>{sale.nombre_libro}</TableCell>
                    <TableCell>{sale.fecha_venta}</TableCell>
                    <TableCell>{sale.vendedor}</TableCell>
                    <TableCell>{sale.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handlePrint} 
            fullWidth 
            style={{ marginTop: '20px' }}
          >
            Imprimir Reporte
          </Button>
        </>
      )}
    </Container>
  );
};

export default ReportesVentasPage;
