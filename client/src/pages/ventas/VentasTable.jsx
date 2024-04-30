import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import { usePromo } from "../../hooks/usePromo";

export default function VentasTable() {
const {getBooks,updateBook, getAuthors} = useBook();
const {getUser} = useUser();
const {getPromos} = usePromo();
const [authors, setAuthors] = useState([]);
const [data, setData] = useState([]);

// useEffect(() => {
//   getBooks().then((newData) => setData(newData));
//   getAuthors().then((newData) => setAuthors(newData));
//   getPromos().then((newData) => setData(newData));
// }, []);


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
          </TableRow >
        </TableHead>
        <TableBody> 
        <TableRow 
          
        >
        <TableCell align="right"></TableCell>
        <TableCell> </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
