import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useBook } from "../../hooks/useBook";


function transformarFormato(entrada) {
  // Mapear los IDs de autores y categorías
  const autoresIDs = entrada.authors.map((author) => author.id);
  const categoriasIDs = entrada.categories.map((category) => category.id);

  // Obtener el ID del editor
  const editorID = entrada.publisher.id;

  // Crear el objeto en el nuevo formato
  const salida = {
    barcode: entrada.barcode,
    authors: autoresIDs,
    categories: categoriasIDs,
    publisher: editorID,
    title: entrada.title,
    price: entrada.price,
    isbn: entrada.ISBN,
  };
  console.log(salida);
  return salida;
}

function EditFormBook() {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);

  const { getAuthors, getPublishers, getGenres, updateBook } = useBook();

  useEffect(() => {
    getAuthors().then((newData) => setAuthors(newData));
    getPublishers().then((newData) => setPublishers(newData));
    getGenres().then((newData) => setGenres(newData));
  }, []);
  
  const { handleSubmit, control } = useForm();

  const onSuccess = handleSubmit((entrada) => {
    console.log(entrada);
    console.log("onSuccess");
    const data = transformarFormato(entrada);
    console.log(data);
    updateBook(data)
      .then(() => {
        console.log("se edito el libro");
      })
      .catch((error) => {
        console.error(error);
        console.log("no se edito el libro");
      });
  });

  return (
    <>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2}>
          <Typography variant="h6">Editar Libro</Typography>
          <TextFieldElement
            name="title"
            label="Titulo del Libro"
            required
            control={control}
          />
          <TextFieldElement
            name="barcode"
            label="Codigo de Barras"
            required
            control={control}
          />
          <TextFieldElement
            name="price"
            label="Precio"
            required
            control={control}
            type={"number"}
          />
          
          <Button variant="contained" type="submit">
            editar
          </Button>
        </Stack>
      </FormContainer>
      
    </>
  );
}

export default EditFormBook;
