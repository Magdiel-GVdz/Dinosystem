import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination"; // Importa el componente de paginación
import ConfirmModal from "../../components/ConfirmModal";
import Button from "@mui/material/Button";

import { useBook } from "../../hooks/useBook";
import EditModal from "../../components/EditModal";
import EditLibroModal from "./EditLibroModal";
function transformarFormato(entrada) {
    // Mapear los IDs de autores y categorías
    const autoresIDs = entrada.authors.map((author) => author.id);
    const categoriasIDs = entrada.categories.map((category) => category.id);
  
    // Obtener el ID del editor
    const editorID = entrada.publisher.id;
  
    // Crear el objeto en el nuevo formato
    const salida = {
      barcode: entrada.barcode,
      authors: autoresIDs,
      categories: categoriasIDs,
      publisher: editorID,
      title: entrada.title,
      price: entrada.price,
      isbn: entrada.ISBN,
    };
    console.log(salida);
    return salida;
  }



export default function LibrosTable() {
  const { getBooks, deleteBook, updateBook , getAuthors, getPublishers, getGenres } = useBook();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Estado para controlar la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para controlar las filas por página
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmEditModal, setOpenConfirmEditModal] = useState(false);
  const [newData, setNewData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    getBooks().then((newData) => setData(newData));
    getAuthors().then((newData) => setAuthors(newData));
    getPublishers().then((newData) => setPublishers(newData));
    getGenres().then((newData) => setGenres(newData));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Resetear la página a 0 cuando se cambia el número de filas por página
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
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row) => (
                <TableRow
                  key={row.barcode}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row)} // Manejador de clics en la fila
                  selected={selectedRow && selectedRow.barcode === row.barcode} // Marcar la fila como seleccionada si coincide con la fila seleccionada
                >
                  <TableCell component="th" scope="row">
                    {row.barcode}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{'$'+row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {selectedRow && ( // Mostrar el botón de editar si hay una fila seleccionada
        <>
        <Button onClick={handleDeleteButtonClick} color="secondary">
            Eliminar
          </Button>

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
              deleteBook(selectedRow.barcode).then(() => {
                getBooks().then((newData) => setData(newData));
                setOpenConfirmDeleteModal(false);
                setSelectedRow(null);
              });
            }}
          />

          <EditLibroModal/>
          
          
        </>
      )}
    </>
  );
}


