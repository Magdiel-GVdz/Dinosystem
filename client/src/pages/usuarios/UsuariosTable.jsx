import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUser } from "../../hooks/useUser";
import { Button, TablePagination } from "@mui/material";
import EditModal from "../../components/EditModal";
import ConfirmModal from "../../components/ConfirmModal";
import { Style } from "@mui/icons-material";
import EditUsuariosModal from "./EditUsuariosModal";
export default function PromocionesTable() {
  const [page, setPage] = useState(0); // Estado para controlar la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para controlar las filas por página
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmEditModal, setOpenConfirmEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
  const [newData, setNewData] = useState(null);

  const { getUsers, getUser, updateUser } = useUser();

  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers().then((newData) => setData(newData));
  }, []);
  function verificarEmpleado(estado) {
    return estado ? "Gerente" : "Empleado";
  }

  function verificarEstado(estado) {
    return estado ? "Activo" : "Inactivo";
  }

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

  return (
    <>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">nombre</TableCell>
                <TableCell align="right">apellido</TableCell>
                <TableCell align="right">segundo nombre</TableCell>
                <TableCell align="right">fecha de creacion</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">rol</TableCell>
                <TableCell align="right">numero de celular </TableCell>
                <TableCell align="right">domicilio</TableCell>
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
                  key={row.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row)} // Manejador de clics en la fila
                  selected={selectedRow && selectedRow.id === row.id} // Marcar la fila como seleccionada si coincide con la fila seleccionada
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>

                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.middle_name}</TableCell>
                  <TableCell align="right">{row.date_joined}</TableCell>
                  <TableCell align="right">
                    {verificarEstado(row.is_active)}
                  </TableCell>
                  <TableCell align="right">
                    {verificarEmpleado(row.is_staff)}
                  </TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
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
              updateUser({ id: selectedRow.id, email: newData, name: newData, last_name: newData, middle_name: newData, phone: newData, address: newData });
              setSelectedRow(null);
            }}
          />

          <EditUsuariosModal
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          handleCancel={() => setOpenEditModal(false)}
          handleAccept={(e) => {
            console.log(e.email , e.name , e.last_name , e.middle_name , e.phone , e.address );
            console.log(selectedRow.email , selectedRow.name , selectedRow.last_name , selectedRow.middle_name , selectedRow.phone , selectedRow.address );
            setOpenConfirmEditModal(true);
            setOpenEditModal(false);
            setNewData(e.email + e.name + e.last_name + e.middle_name  + e.phone  + e.address); 
          }}
          value1={selectedRow.email}
          label1={"Email"}
          value2={selectedRow.name}
          label2={"Nombre"}
          value3={selectedRow.last_name}
          label3={"Apellido"}
          value4={selectedRow.middle_name}
          label4={"Segundo Nombre"}
          value5={selectedRow.phone}
          label5={"Numero de Celular"}
          value6={selectedRow.address}
          label6={"Domicilio"}
          />
        </>
      )}
    </>
  );
}
