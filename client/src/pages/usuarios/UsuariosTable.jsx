import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUser } from '../../hooks/useUser';
export default function PromocionesTable() {

    const { getUsers , getUser } = useUser();
    
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

    return (
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
                    {data.map((row) => (
                        <TableRow
                            key={row.email}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.email}
                            </TableCell>
                            
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.last_name }</TableCell>
                            <TableCell align="right">{row.middle_name}</TableCell>
                            <TableCell align="right">{row.date_joined}</TableCell>
                            <TableCell align="right">{verificarEstado(row.is_active) }</TableCell>
                            <TableCell align="right">{verificarEmpleado(row.is_staff) }</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.address }</TableCell>
                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
