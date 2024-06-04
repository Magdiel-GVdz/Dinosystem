import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useBook } from "../../hooks/useBook";


function NuevoEditorialModal() {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm();
  const { postPublisher } = useBook();

  const onSuccess = handleSubmit((e) => {
    console.log(e);
    postPublisher(e).then(() => {
      setOpen(false)
      console.log("success");
    }).catch((error) => {
      console.log(error);
    });
  });

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}>
        Nueva Editorial
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
              <Typography variant="h6">Nuevo Editorial</Typography>
              <TextFieldElement
                name="name"
                label="Nueva Editorial"
                required
                control={control}
                type="text"
                inputProps={{inputMode: "text", pattern: "^[a-zA-Z\\s]+$"}}
                onKeyDown={(event) => {
                  const key = event.key;
                  const regex = /^[a-zA-Z\s]+$/;
                  if (!regex.test(key)) {
                    event.preventDefault();
                  }
                }}
              />
              <Button variant="contained" type="submit">
                Añadir
              </Button>
            </Stack>
          </FormContainer>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </Box>
      </Modal>
    </>
  );
}

export default NuevoEditorialModal;