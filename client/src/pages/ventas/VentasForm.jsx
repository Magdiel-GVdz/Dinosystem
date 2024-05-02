import { Button, Stack, Typography, tableContainerClasses } from "@mui/material";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form-mui";
import { useBook } from "../../hooks/useBook";
import { useEffect, useState } from "react";


function transformarFormato(entrada) {
  // Mapear los IDs de libros
  const librosBarcodes = entrada.book.map((book) => book.barcode);
  const Subtotal = entrada.book.map((book) => book.price * (1 - (book.discount / 100)));
  const salida = {
    stock: entrada.stock,
    name: entrada.name,
    description: entrada.description,
    price: entrada.price,
    discount: entrada.discount,
    book: librosBarcodes,
    subtotal: Subtotal
  };
  console.log(salida);
  return salida;
}

function VentasForm() {
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
    
  });


  return (
    <>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2}>
          <AutocompleteElement control={control}
          options={books.map((book) => ({
            label: book.barcode,
            value: book.barcode,
            id: book.barcode,
          }))}
          name="barcode"
          label="codigo de barras"
          required
           />
          <AutocompleteElement
            control={control}
            options={books.map((book) => ({
              label: book.title,
              value: book.title,
              id: book.barcode,
            }))}
            name="book"
            label="Nombre Del Libro"
            required
          />
          <TextFieldElement  type="number" name="stock" label="cantidad" required/>
        </Stack>
      </FormContainer>
      <Button  type="submit">
            Añadir
          </Button>
          <Button  type="submit">
            Realizar Venta
          </Button>
          <Button  type="submit">
            Cancelar Venta
          </Button>
    </>
  );
}

export default  VentasForm;
