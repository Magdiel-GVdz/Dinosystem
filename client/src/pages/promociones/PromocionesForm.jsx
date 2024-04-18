import { Button, Stack, Typography } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";


function PromocionesForm() {
  return (
    <>
      <FormContainer>
        <Stack spacing={2}>
          <Typography variant="h6">Nueva Promo</Typography>
          <TextFieldElement name="name" label="nombre de la promo" required />
          <TextFieldElement name="Description" label="descripción" required />
          <TextFieldElement name="discount" label="descuento" required type="number"/>
          <TextFieldElement name="start_date" label="fecha de inicio" required />
          <TextFieldElement name="end_date" label="fecha de fin" required />
          <TextFieldElement name="book" label="Libros" required />
          <Button variant="contained" type="submit">
            Añadir
          </Button>
        </Stack>
      </FormContainer>
    </>
  );
}

export default PromocionesForm;
