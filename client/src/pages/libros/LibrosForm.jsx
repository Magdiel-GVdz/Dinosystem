import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import NuevoAutoresModal from "./NuevoAutoresModal";
import NuevoGeneroModal from "./NuevoGeneroModal";
import NuevoEditorialModal from "./NuevoEditorialModal";
import { useBook } from "../../hooks/useBook";
import { generatePath } from "react-router-dom";

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

function LibrosForm() {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);

  const { getAuthors, getPublishers, getGenres, postBook, postAuthor, postGenre, postPublisher } = useBook();

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
    postBook(data)
      .then(() => {
        console.log("se agrego el libro");
      })
      .catch((error) => {
        console.error(error);
        console.log("no se agrego el libro");
      });
  });

  return (
    <>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2}>
          <Typography variant="h6">Nuevo Libro</Typography>
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
            name="ISBN"
            label="ISBN"
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
          <AutocompleteElement
            name="authors"
            label="Autor(es)"
            required
            multiple
            control={control}
            options={authors.map((author) => ({
              label: author.name,
              value: author.name,
              id: author.id,
            }))}
          />
          <AutocompleteElement
            name="publisher"
            label="Editorial"
            control={control}
            required
            options={publishers.map((publisher) => ({
              label: publisher.name,
              value: publisher.name,
              id: publisher.id,
            }))}
          />
          <AutocompleteElement
            name="categories"
            label="Genero(s)"
            control={control}
            required
            multiple
            options={genres.map((gener) => ({
              label: gener.name,
              value: gener.name,
              id: gener.id,
            }))}
          />
          <Button variant="contained" type="submit">
            Añadir
          </Button>
        </Stack>
      </FormContainer>
      <NuevoEditorialModal />
      <NuevoAutoresModal />
      <NuevoGeneroModal />
    </>
  );
}

export default LibrosForm;
