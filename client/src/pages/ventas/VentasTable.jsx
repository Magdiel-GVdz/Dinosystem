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
import { usePromo } from "../../hooks/usePromo";
import { useContextSale } from "../../provider/VentasProvider";

const VentasTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Estado para controlar la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { getPromos, getPromo } = usePromo();
  const [promos, setPromos] = useState([]);
  const {
    saleState,
    bookToSale,
    addBookToSale,
    addBookToSaleState,
    removeBookToSale,
    saleBook,
    resetSaleState,
  } = useContextSale();

  useEffect(() => {
    console.log("data", saleState);
    console.log("bookToSale", bookToSale);
  }, [saleState]);

  useEffect(() => {
    getPromos().then((newData) => setPromos(newData));
  }, []);
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
              <TableCell>Precio unitario</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>descuento</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(saleState)}
            {saleState.map((row) => (
              <TableRow
                key={row.barcode}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.barcode} - {row.title} 
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.promo}</TableCell>
                <TableCell>{row.quantity * row.price }</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            <Table>
            <TableBody>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{saleState.length > 0 ? saleState.reduce((total, book) => total + (book.price * book.quantity), 0) : 0}</TableCell>
              </TableRow>
            </TableBody>
            </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {saleState.length > 0 && (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              saleBook()
                .then(resetSaleState())
                .then(console.log("Vendido")).catch((err) => console.log(err));
            }}
          >
            Vender
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => resetSaleState()}
          >
            Cancelar Venta
          </Button>
        </Stack>
      )}
    </>
  );
};
export default VentasTable;