import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function NuevoAutoresModal() {
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
              <Typography variant="h6">Nuevo Autor</Typography>
              <TextFieldElement
                name="Autor"
                label="Nombre del Autor"
                required
                control={control}
              />
              <TextFieldElement
                name="ApellidoP"
                label="Apellido Paterno"
                required
                control={control}
              />
              <TextFieldElement
                name="ApellidoM"
                label="Apellido Materno"
                required
                control={control}
              />
             
            </Stack>
          </FormContainer>
          <Button onClick={() => setOpen(!open)}>Cerrar</Button>
        </Box>
      </Modal>
    </>
  );
}

export default NuevoAutoresModal;
