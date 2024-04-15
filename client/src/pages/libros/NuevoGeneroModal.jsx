import { Box, Button, Modal, Stack } from '@mui/material'
import React from 'react'
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';


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
function NuevoGeneroModal() {
    const [open, setOpen] = React.useState(false);
    const { handleSubmit, control } = useForm();
    const onSuccess = handleSubmit((e) => {
      console.log(e);
    });
  
    return (
      <>
        <Button onClick={() => setOpen(!open)}>Nuevo Genero</Button>
        <Modal open={open}>
          <Box sx={{ ...style, width: 700, height: 600 }}>
            <FormContainer onSuccess={onSuccess}>
              <Stack spacing={2}>
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

export default NuevoGeneroModal