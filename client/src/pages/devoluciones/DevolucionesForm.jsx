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
import { useContextSale } from "../../provider/DevolucionesProvider";
import {usePromo } from "../../hooks/usePromo";
const DevolucionesForm = () => {
  const { getBooks, getBook } = useBook();
  const { getSales, getSale } = useSales();
  const { getPromos, getPromo } = usePromo();
  const { control, handleSubmit } = useForm();
  const [promos, setPromos] = useState([]);
  const [books, setBooks] = useState([]);
  const [Book , setBook] = useState([]);
  const [selectedBook, setSelectedBook] = useState();
  const [ sales, setSale] = useState([]);

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

  useEffect (() => {
    getSales().then((newData) => setSale(newData));
  },[]);
  
  useEffect(() => {
    getPromos().then((newData) => setPromos(newData));
  }, []);

  const onSuccess = handleSubmit(async (data) => {
    const selectedSale = sales.find(sale => sale.id === data.id.value)
    selectedSale.sales_items.forEach(returnItem => {
      const { id, price, book  } = returnItem;
      addBookToSale({ id,  barcode:returnItem.barcode , book, quantity: returnItem.quantity, price });
    })
  });

//  const barcode = saleState.map((sale) => {
//     const book = getBook().find((book) => book.title === sale.book);
//    return book ? book.barcode : null;
//  });
const findBookBarcode = (title) => {
  const book = Book.find((book) => book.title === title);
  return book ? book.barcode : null;
};


  return (
    <div>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2} justifyContent="center" alignContent="center">
          <Stack  direction="row" spacing={2} justifyContent="center" mt={2} 

          >
            <AutocompleteElement
             
              control={control}
              required
              name="id"
              label="id de la venta"
              options={sales.map((sale) => ({
                label: sale.id,
                value: sale.id,
                id: sale.id,
              }))}
              onChange={(event, newValue) => {
                if (newValue) {
                  const selectedBook = sales.find(
                    (sale) => sale.id === newValue.value
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
              defaultValue={selectedBook ? selectedBook.quantity : 1}
              disabled={!selectedBook}
              sx={{
                display: selectedBook ? "block" : "none",
              }}

            />
            <TextFieldElement
              control={control}
             
              name="barcode"
              label="Codigo de barras"
              defaultValue={selectedBook ? findBookBarcode(selectedBook.book) : ""}
              disabled={!selectedBook}
              sx={{
                display: selectedBook ? "block" : "none",
              }}
            />
          
            <TextFieldElement
              control={control}
              
              name="price"
              label="Precio"
              type="number"
              defaultValue={selectedBook ? selectedBook.price : ""}
              disabled={!selectedBook}
              sx={{
                display: selectedBook ? "block" : "none",
              }}
            />
            <Button variant="contained" type="submit">
              Agregar
            </Button>
          </Stack>
          {bookToSale != null && (
            <>
              <Typography variant="p" mt={2}>
                Libro a devolver: {bookToSale.book}
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

export default DevolucionesForm; 
