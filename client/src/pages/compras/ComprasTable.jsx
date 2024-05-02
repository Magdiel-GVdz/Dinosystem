import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { useBook } from '../../hooks/useBook';
import { usePromo } from '../../hooks/usePromo';

function TemporalTable() {
  // Estado para almacenar la información temporal
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState('');
  const { getBook } = useBook();
  const {getBooks } = usePromo();
  const [book, setBook] = useState([]);

  useEffect(() => {
    getBook().then((newData) => setBook(newData));
  },[]);
  
  // Función para agregar un nuevo elemento a la tabla
  const agregarElemento = () => {
    const nuevoElemento = {
      id: data.length + 1,
      nombre: nombre,
      titulo: book.title,
      cantidad: 0,
      precio: data.price,
      descuento: data.discount,
      subtotal: data.price * (1 - (data.discount / 100)),
      // Otras propiedades...
    };


    // Actualizamos el estado agregando el nuevo elemento al final del array
    setData([...data, nuevoElemento]);
    // Limpiamos el campo de nombre después de agregar el elemento
    setNombre('');
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); agregarElemento(); }}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Agregar Elemento</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>cantidad</TableCell>
              <TableCell>titulo</TableCell>
              <TableCell>precio</TableCell>
              <TableCell>descuento</TableCell>
              <TableCell>subtotal</TableCell>
              {/* Añade aquí más encabezados si lo necesitas */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Iteramos sobre los elementos en el estado para renderizar las filas */}
            {data.map((elemento) => (
              <TableRow key={elemento.barcode}>

                <TableCell>{elemento.cantidad}</TableCell>
                <TableCell>{elemento.titulo}</TableCell>
                <TableCell>{elemento.precio}</TableCell>
                <TableCell>{elemento.descuento}</TableCell>
                <TableCell>{elemento.subtotal}</TableCell>
                
                {/* Renderiza más celdas si hay más propiedades en el objeto */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TemporalTable;
