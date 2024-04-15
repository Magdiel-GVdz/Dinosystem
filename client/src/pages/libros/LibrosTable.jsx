import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "code", label: "Code", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "precioU",
    label: "Precio Unitario",
    minWidth: 170,
    align: "right",
  },
  {
    id: "stock",
    label: "Stock",
    minWidth: 170,
    align: "right",
  },
];

function createData(code, name, precioU, stock) {
  return { code, name, precioU, stock };
}

const rows = [
  createData("83123124", "jose", "$ " + 85.99, 24),
  createData("12341234", "roberto", "$ " + 500, 15),
  createData("83123124", "jose", "$ " + 85.99, 24),
  createData("12341234", "roberto", "$ " + 500, 15),
  createData("83123124", "jose", "$ " + 85.99, 24),
  createData("12341234", "roberto", "$ " + 500, 15),
  createData("83123124", "jose", "$ " + 85.99, 24),
  createData("83123124", "jose", "$ " + 85.99, 24),
  createData("12341234", "roberto", "$ " + 500, 15),
  createData("83123124", "jose", "$ " + 85.99, 24),
];

export default function StickyHeadTable() {
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,background:"#dcdcdc" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    
    </Paper>
  );
}
