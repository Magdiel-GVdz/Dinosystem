import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination'; // Importa el componente de paginación

import { useBook } from '../../hooks/useBook';
export default function LibrosTable() {
    const { getBooks, deleteBook, editBook } = useBook();
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0); // Estado para controlar la página actual
    const [rowsPerPage, setRowsPerPage] = React.useState(5); // Estado para controlar las filas por página

    useEffect(() => {
        getBooks().then((newData) => setData(newData));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Resetear la página a 0 cuando se cambia el número de filas por página
    };

    return (
        <Paper>
            <TableContainer>
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
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row) => (
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

