import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useBook } from '../../hooks/useBook';

function createData(codigo, titulo, stock, precio) {
    return { codigo, titulo, stock, precio };
}

export default function LibrosTable() {
    const { getBooks } = useBook();
    const [data, setData] = useState([]);

    useEffect(() => {
        getBooks().then((newData) => setData(newData));
    }, [getBooks]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Codigo</TableCell>
                        <TableCell align="right">Titulo</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.barcode}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.barcode}
                            </TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.stock}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}
