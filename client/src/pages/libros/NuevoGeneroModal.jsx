import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

function NuevoGeneroModal() {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control } = useForm();
  const onSuccess = handleSubmit((e) => {
    console.log(e);
  });

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        
      >
        Nuevo
      </Button>
      <Modal open={open} onClose={() => setOpen(!open)} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
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
          <FormContainer onSuccess={onSuccess}>
            <Stack spacing={2}>
              <Typography variant="h6">Nuevo Genero</Typography>
              <TextFieldElement
                name="Genero"
                label="Nuevo Genero"
                required
                control={control}
              />
              <Button variant="contained" type="submit">
                Añadir
              </Button>
            </Stack>
          </FormContainer>
          <Button onClick={() => setOpen(!open)}>Cerrar</Button>
        </Box>
      </Modal>
    </>
  );
}

export default NuevoGeneroModal;
