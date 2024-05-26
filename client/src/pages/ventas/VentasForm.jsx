import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useSales } from "../../hooks/useSales";
import { useBook } from "../../hooks/useBook";
import { Button, Stack, Typography } from "@mui/material";
import { useContextSale } from "../../provider/VentasProvider";
import {usePromo } from "../../hooks/usePromo";
const VentasForm = () => {
  const { getBooks, getBook } = useBook();
  const { getPromos, getPromo } = usePromo();
  const { control, handleSubmit } = useForm();
  const [promos, setPromos] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState();

  const {
    saleState,
    bookToSale,
    addBookToSale,
    addBookToSaleState,
    removeBookToSale,
    saleBook,
  } = useContextSale();

  useEffect(() => {
    getBooks().then((newData) => setBooks(newData));
  }, []);

  useEffect(() => {
    getPromos().then((newData) => setPromos(newData));
  }, []);

  const onSuccess = handleSubmit(async (data) => {
    getBook(data.barcode.value).then((newData) => {
      const barcode = data.barcode.value
      const title = newData.title
      const quantity = data.quantity
      const price = newData.price
      

      addBookToSale({barcode, title, quantity, price})
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
              onChange={(event, newValue) => {
                if (newValue) {
                  const selectedBook = books.find(
                    (book) => book.barcode === newValue.value
                  );
                  setSelectedBook(selectedBook);
                }
              }}
            />
            <TextFieldElement
              control={control}
              required
              name="quantity"
              label="Cantidad"
              type="number"
              defaultValue={-1}
            />
            <TextFieldElement
              control={control}
              required
              name="price"
              label="Precio"
              type="number"
              defaultValue={selectedBook ? selectedBook.price : ""}
              disabled={!selectedBook}
            />
            <Button variant="contained" type="submit">
              Añadir
            </Button>
          </Stack>
          {bookToSale != null && (
            <>
              <Typography variant="p" mt={2}>
                Libro a vender: {bookToSale.title}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("bookToSale:", bookToSale);
                  addBookToSaleState()
                  addBookToSale(null)
                
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

export default VentasForm;