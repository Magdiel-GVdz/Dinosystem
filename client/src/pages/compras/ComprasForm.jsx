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
  const [selectedBook, setSelectedBook] = useState();

  const {
    buyState,
    bookToBuy,
    addBookToBuy,
    addBookToBuyState,
    removeBookToBuy,
    buyBook,
  } = useContextBuy();

  useEffect(() => {
    getBooks().then((newData) => setBooks(newData));
  }, []);

  const onSuccess = handleSubmit(async (data) => {
    getBook(data.barcode.value).then((newData) => {
      const barcode = data.barcode.value
      const title = newData.title
      const quantity = data.quantity
      const price = data.price

      addBookToBuy({barcode, title, quantity, price})
      console.log(barcode)
      console.log(title);
      console.log(quantity);
      console.log(price);
    })
  });
  return (
    <div>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2} justifyContent="center" alignContent="center">
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
              defaultValue={1}
              type="number"
              inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]*", step: "1" }}
              onKeyDown={(event) => {
                const key = event.key;
                if (key === "-" || key === "+" || key === "." || key === "e") {
                  event.preventDefault();
                }
              }}
            />
            <TextFieldElement
              control={control}
              required
              name="price"
              label="Precio"
              type="number"
              inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]*", step: "1" }}
              onKeyDown={(event) => {
                const key = event.key;
                if (key === "-" || key === "+" || key === "." || key === "e") {
                  event.preventDefault();
                }
              }}
            />
            <Button variant="contained" type="submit">
              Añadir
            </Button>
          </Stack>
          {bookToBuy != null && (
            <>
              <Typography variant="p" mt={2}>
                Libro a comprar: {bookToBuy.title}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("bookToBuy:", bookToBuy);
                  addBookToBuyState()
                  addBookToBuy(null)
                
                }}
              >
                Aceptar
              </Button>
            </>
          )}
        </Stack>
      </FormContainer>
    </div>
  );
};

export default ComprasForm;
