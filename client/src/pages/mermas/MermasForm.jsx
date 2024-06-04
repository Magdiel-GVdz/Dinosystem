import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useLosses } from "../../hooks/useLosses";
import { useBook } from "../../hooks/useBook";
import { Button, Stack, Typography } from "@mui/material";
import {useContextLosses } from "../../provider/LossesProvider";

const MermasForm = () => {
  const { getBooks, getBook } = useBook();
  const { control, handleSubmit } = useForm();
  const [books, setBooks] = useState([]);

  const {
    State,
    bookToLoss,
    addBookToLoss,
    addBookToLossState,
    removeBookToLoss,
    lossBook,
  } = useContextLosses();

  useEffect(() => {
    getBooks().then((newData) => setBooks(newData));
  }, []);

  // const onSuccess = handleSubmit(async (data) => {
  //   const { barcode, quantity, reason } = data;
  //   const book = books.find((book) => book.barcode === barcode);
  //   const newData = {
  //     barcode,
  //     title: book.title,
  //     quantity,
  //     reason,
  //   };
  //   addBookToLoss(newData);
  // });
  const onSuccess = handleSubmit(async (data) => {
    getBook(data.barcode.value).then((newData) => {
      const barcode = data.barcode.value
      const title = newData.title
      const quantity = data.quantity
      const reason = data.reason

      addBookToLoss({barcode, title, quantity, reason})
      console.log(barcode)
      console.log(title);
      console.log(quantity);
      console.log(reason);
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
              name="reason"
              label="Motivo"
              type="text"
            />
            <Button variant="contained" type="submit">
              Añadir
            </Button>
          </Stack>
          {bookToLoss != null && (
            <>
              <Typography variant="p" mt={2}>
                Libro a perder: {bookToLoss.title}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("bookToLoss:", bookToLoss);
                  addBookToLossState()
                  addBookToLoss(null)
                
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

export default MermasForm;

