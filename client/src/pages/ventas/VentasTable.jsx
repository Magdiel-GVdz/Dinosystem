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



useEffect(() => {
  getBooks().then((newData) => setData(newData));
  getAuthors().then((newData) => setAuthors(newData));
  getPromos().then((newData) => setData(newData));
 },[]);


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
          {data.map((row) => (
            
         
        <TableRow 
        key={row.title}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
        >
        <TableCell align="right" >{row.stock}</TableCell>
        <TableCell align="right">{row.title + " " + row.authors}</TableCell>
        <TableCell align="right"> {row.price}</TableCell>
        <TableCell align="right">{row.discount}</TableCell>
        <TableCell align="right">{row.subtotal}</TableCell>
        </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
