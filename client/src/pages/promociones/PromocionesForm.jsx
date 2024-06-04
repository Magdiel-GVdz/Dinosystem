import { Button, Stack, Typography } from "@mui/material";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form-mui";
import { DateTimePickerElement } from "react-hook-form-mui/date-pickers";
import { useBook } from "../../hooks/useBook";
import { useEffect, useState } from "react";
import { usePromo } from "../../hooks/usePromo";

function transformarFormato(entrada) {
  // Mapear los IDs de libros
  const librosBarcodes = entrada.book.map((book) => book.id);
  const new_start_date = entrada.start_date.toISOString();
  const new_end_date = entrada.end_date.toISOString();

  const salida = {
    name: entrada.name,
    description: entrada.description,
    discount: entrada.discount,
    start_date: new_start_date,
    end_date: new_end_date,
    book: librosBarcodes,
  };
  console.log(salida);
  return salida;
}

function PromocionesForm() {
  const { postPromo } = usePromo();
  const [books, setBooks] = useState([]);
  const { getBooks } = useBook();

  useEffect(() => {

    getBooks().then((newData) => setBooks(newData));
  },[]);


  const { handleSubmit, control } = useForm();

  const onSuccess = handleSubmit((entrada) => {
    console.log(entrada);
    console.log("onSuccess");
    const data = transformarFormato(entrada);
    console.log(data);
    postPromo(data)
      .then(() => {
        console.log("se agrego la promocion");
      })
      .catch((error) => {
        console.error(error);
        console.log("no se agrego la promocion");
      });
  });

  return (
    <>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2}>
          <Typography variant="h6">Nueva Promo</Typography>
          <TextFieldElement
            control={control}
            name="name"
            label="nombre de la promo"
            required
          />
          <TextFieldElement
            control={control}
            name="description"
            label="descripción"
            required
          />
            <TextFieldElement
              control={control}
              name="discount"
              label="descuento"
              required
              type="number"
              inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]*", step: "1" }}
              onKeyDown={(event) => {
                const key = event.key;
                if (key === "-" || key === "+" || key === "." || key === "e") {
                  event.preventDefault();
                }
              }}
            />
          <DateTimePickerElement
            control={control}
            name="start_date"
            views={['day', 'month', 'year', 'hours', 'minutes']}
            label="Fecha inicio"
            required
          />
          <DateTimePickerElement
            control={control}
            name="end_date"
            views={['day', 'month', 'year','hours','minutes']}
            label="Fecha final"
            required
          />
          <AutocompleteElement
            multiple
            control={control}
            options={books.map((book) => ({
              label: book.title,
              value: book.title,
              id: book.barcode,
            }))}
            name="book"
            label="Libros"
            required
          />
          <Button variant="contained" type="submit">
            Añadir
          </Button>
        </Stack>
      </FormContainer>
    </>
  );
}

export default PromocionesForm;
