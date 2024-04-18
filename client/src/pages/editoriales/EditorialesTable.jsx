import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination"; // Importa el componente de paginación
import Button from "@mui/material/Button";
import ConfirmModal from "../../components/ConfirmModal";

import { useBook } from "../../hooks/useBook";
import EditModal from "../../components/EditModal";

export default function EditorialesTable() {
  const { getPublishers, deletePublisher, updatePublisher } = useBook();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
  const [page, setPage] = useState(0); // Estado para controlar la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para controlar las filas por página
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmEditModal, setOpenConfirmEditModal] = useState(false);
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    getPublishers().then((newData) => setData(newData));
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
    // Aquí puedes implementar la lógica para editar la fila seleccionada
    console.log("Editar fila:", selectedRow);
    setOpenEditModal(true);
  };

  const handleDeleteButtonClick = () => {
    // Aquí puedes implementar la lógica para eliminar la fila seleccionada
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
                <TableCell>ID</TableCell>
                <TableCell align="right">Nombre</TableCell>
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
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row)} // Manejador de clics en la fila
                  selected={selectedRow && selectedRow.id === row.id} // Marcar la fila como seleccionada si coincide con la fila seleccionada
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
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
          <Button onClick={handleEditButtonClick} color="primary">
            Editar
          </Button>

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
              deletePublisher(selectedRow.id);
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
              updatePublisher({ id: selectedRow.id, name: newData });
              setSelectedRow(null);
            }}
          />

          <EditModal
            open={openEditModal}
            handleClose={() => setOpenEditModal(false)}
            handleCancel={() => setOpenEditModal(false)}
            handleAccept={(e) => {
              console.log(e.name);
              console.log(selectedRow.name);
              setOpenConfirmEditModal(true);
              setOpenEditModal(false);
              setNewData(e.name);
            }}
            value={selectedRow.name}
            label={"Nombre"}
          />
        </>
      )}
    </>
  );
}
