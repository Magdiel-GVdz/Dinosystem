import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useBuys } from "../../hooks/useBuys";
import { useBook } from "../../hooks/useBook";
import { Button, Stack, Typography } from "@mui/material";
import { useContextBuy } from "../../provider/BuyProvider";

const ComprasForm = () => {
  const { getBooks, getBook } = useBook();
  const { control, handleSubmit } = useForm();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const {
    buyState,
    bookToBuy,
    addBookToBuy,
    addBookToBuyState,
    removeBookToBuy,
    buyBook,
  } = useContextBuy() || {};

  useEffect(() => {
    getBooks().then((newData) => setBooks(newData));
    if (bookToBuy) {
      console.log(bookToBuy);
      if (bookToBuy.barcode) {
        getBook(bookToBuy.barcode).then((newData) => setSelectedBook(newData));
      } else {
        console.error("Error getting book with id undefined");
      }
    }
  }, [bookToBuy]);

  const onSuccess = handleSubmit(async (data) => {
    console.log(data);
    if (data && data.barcode) {
      await addBookToBuy(data.barcode.value, data.quantity, data.price);
      console.log(data.barcode.value, data.quantity, data.price);
    }
    console.log(bookToBuy);
  });
  return (
    <div>
      <FormContainer onSuccess={onSuccess}>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <AutocompleteElement
            control={control}
            required
            name="barcode"
            label="Codigo de barras"
            options={books.map((book) => ({
              label: book.barcode,
              value: book.barcode,
              id: book.barcode,
            }))}
          />
          <TextFieldElement
            control={control}
            required
            name="quantity"
            label="Cantidad"
            type="number"
            defaultValue={1}
          />
          <TextFieldElement
            control={control}
            required
            name="price"
            label="Precio"
            type="number"
          />
          <Button variant="contained" type="submit">
            Añadir
          </Button>
        </Stack>
      </FormContainer>
      {selectedBook && (
        <Typography variant="h6" mt={2}>
          Libro a comprar: {selectedBook.title}
        </Typography>
      )}
    </div>
  );
};

export default ComprasForm;
