import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import UsusariosForm from "./UsuariosForm";
import SuperUsersForm from "./SuperUsersForm";
const SuperUserModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  return (
    <>
      <Button onClick={handleOpen}>Nuevo Gerente</Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            width: "70%",
            maxWidth: "700px", // Ajusta el ancho máximo del modal según sea necesario
            maxHeight: "80vh", // Ajusta la altura máxima del modal según sea necesario
            overflowY: "auto", // Agrega scroll vertical si el contenido es demasiado largo
          }}
        >
        <SuperUsersForm />
        </Box>
        
      </Modal>
      
    </>
  );
};

export default SuperUserModal;
