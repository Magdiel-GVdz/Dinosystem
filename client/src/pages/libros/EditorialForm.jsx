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
function NuevoEditorialModal() {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control } = useForm();
  const onSuccess = handleSubmit((e) => {
    console.log(e);
  });

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        style={{
          color: "white",
          fontFamily: "Arial",
          margin: "5px",
          background: "green",
          borderRadius: "15px",
          width: "100px",
          height: "30px",
        }}
      >
        Nuevo
      </Button>
      <Modal open={open}>
        <Box sx={{ ...style, width: 700, height: 600 }}>
          <FormContainer onSuccess={onSuccess}>
            <Stack spacing={2}>
              <Typography variant="h6">Nuevo Editorial</Typography>
              <TextFieldElement
                name="Editorial"
                label="Nueva Editorial"
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

export default NuevoEditorialModal;