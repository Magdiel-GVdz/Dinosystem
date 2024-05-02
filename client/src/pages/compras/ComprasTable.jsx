import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { AutocompleteElement } from 'react-hook-form-mui';

function TemporalTable() {
  // Estado para almacenar la información temporal
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState('');
  // Función para agregar un nuevo elemento a la tabla
  const agregarElemento = () => {
    const nuevoElemento = {
      id: data.length + 1,
      nombre: nombre,
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
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              {/* Añade aquí más encabezados si lo necesitas */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Iteramos sobre los elementos en el estado para renderizar las filas */}
            {data.map((elemento) => (
              <TableRow key={elemento.id}>
                <TableCell>{elemento.id}</TableCell>
                <TableCell>{elemento.nombre}</TableCell>
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


