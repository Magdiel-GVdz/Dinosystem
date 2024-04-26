import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import { usePromo } from "../../hooks/usePromo";


function transformarFormato(entrada) {
  // Mapear los IDs de libros
  const librosBarcodes = entrada.book.map((book) => book.barcode);

  const salida = {
   
    book: librosBarcodes,
  }
 return salida;
}
export default function VentasTable() {





  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">descripcion</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Descuento</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 

        </TableBody>
      </Table>
    </TableContainer>
  );
}
