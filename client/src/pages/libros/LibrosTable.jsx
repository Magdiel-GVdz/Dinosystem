import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination'; // Importa el componente de paginación
import EditLibroModal from './EditLibroModal';
import ConfirmModal from "../../components/ConfirmModal";

import { useBook } from '../../hooks/useBook';
import { Button } from '@mui/material';
export default function LibrosTable() {
    const { getBooks, deleteBook, editBook } = useBook();
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
    const [page, setPage] = React.useState(0); 
    const [rowsPerPage, setRowsPerPage] = React.useState(5); 
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openConfirmEditModal, setOpenConfirmEditModal] = useState(false);
    const [newData, setNewData] = useState(null);

    useEffect(() => {
        getBooks().then((newData) => setData(newData));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    const handleEditButtonClick = () => {
        console.log("Editar fila:", selectedRow);
        setOpenEditModal(true);
    };

    const handleDeleteButtonClick = () => {
        console.log("Eliminar fila:", selectedRow);
        setOpenConfirmDeleteModal(true);
    };

    return (
        <>
            <Paper>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Codigo</TableCell>
                                <TableCell align="right">Titulo</TableCell>
                                <TableCell align="right">Stock</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Acciones</TableCell> {/* Agrega una columna para acciones */}
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
                                    <TableCell align="right"> {/* Agrega botones de editar y eliminar */}
                                        <Button onClick={() => handleEditButtonClick(row)} color="primary">
                                            Editar
                                        </Button>
                                        <Button onClick={() => handleDeleteButtonClick(row)} color="secondary">
                                            Eliminar
                                        </Button>
                                    </TableCell>
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

            <EditLibroModal
                open={openEditModal}
                handleClose={() => setOpenEditModal(false)}
                handleCancel={() => setOpenEditModal(false)}
                handleAccept={(e) => {
                    console.log(e.title);
                    console.log(selectedRow.title);
                    setNewData(e.title);
                    setOpenEditModal(false); 
                    setOpenConfirmEditModal(true); 
                }}
                value={selectedRow ? selectedRow.title : ""}
                label={"Titulo"}
            />

            <ConfirmModal
                open={openConfirmDeleteModal}
                handleClose={() => {
                    setOpenConfirmDeleteModal(false);
                    setSelectedRow(null);
                }}
                handleCancel={() => {
                    setOpenConfirmDeleteModal(false);
                    setSelectedRow(null);
                }}
                handleAccept={() => {
                    deleteBook(selectedRow.barcode);
                    setSelectedRow(null);
                }}
            />

            <ConfirmModal
                open={openConfirmEditModal}
                handleClose={() => {
                    setOpenConfirmEditModal(false);
                    setSelectedRow(null);
                }}
                handleCancel={() => {
                    setOpenConfirmEditModal(false);
                    setSelectedRow(null);
                }}
                handleAccept={() => {
                    setOpenConfirmEditModal(false);
                    editBook({ barcode: selectedRow.barcode, title: newData });
                    setSelectedRow(null);
                }}
            />
        </>
    );
}