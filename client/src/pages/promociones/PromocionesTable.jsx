import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { usePromo } from '../../hooks/usePromo';
import { useBook } from '../../hooks/useBook';
export default function PromocionesTable() {

    const { getPromos, getPromo } = usePromo();
    const {getBooks,getBook} = useBook();
    const [data, setData] = useState([]);


    useEffect(() => {
        getPromos().then((newData) => setData(newData));
       
    }, []);
   
    


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                       
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">descripcion</TableCell>
                        <TableCell align="right">descuento</TableCell>
                        <TableCell align="right">fecha de inicio</TableCell>
                        <TableCell align="right">fecha de fin</TableCell>
                        <TableCell align="right">libros</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.discount + "%"}</TableCell>
                            <TableCell align="right">{row.start_date}</TableCell>
                            <TableCell align="right">{row.end_date}</TableCell>
                            <TableCell align="right">{ row.book + " " }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
