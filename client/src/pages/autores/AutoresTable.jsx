import { useBook } from "../../hooks/useBook";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, nombre, apellidos) {
    return { id, nombre, apellidos };
}

export default function AutoresTable() {
    const { getAuthors } = useBook();
    const [data, setData] = useState([]);

    useEffect(() => {
        getAuthors().then((newData) => setData(newData));
    }, []);
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Apellidos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.last_name}</TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>

                        
    )
}