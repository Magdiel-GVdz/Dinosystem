
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TablePagination,
  Stack,
} from "@mui/material";
import { useBook } from "../../hooks/useBook";
import { useContextlosses } from "../../provider/LossesProvider";

const MermasTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Estado para controlar la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    lossState,
    bookToLoss,
    addBookToLoss
    addBookToLossState,
    removeBookToLoss,
    lossBook,
    resetLossState,
  } = useContextlosses();

  useEffect(() => {
    console.log("data", lossState);
    console.log("bookToloss", bookToLoss);
  }, [lossState]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Resetear la página a 0 cuando se cambia el número de filas por página
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Libro</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Motivo de la perdida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(lossState)}
            {buyState.map((row) => (
              <TableRow
                key={row.barcode}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.barcode} - {row.title}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.reason}</TableCell>
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
      {lossState.length > 0 && (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              lossBook()
                .then(resetLossState())
                .then(console.log("perdida")).catch((err) => console.log(err));
            }}
          >
            Guardar perdida
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => resetLossState()}
          >
            Cancelar perdida
          </Button>
        </Stack>
      )}
    </>
  );
};

export default MermasTable;
