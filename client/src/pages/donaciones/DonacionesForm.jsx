import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useDonations } from "../../hooks/useDonations";
import { useBook } from "../../hooks/useBook";
import { Button, Stack, Typography } from "@mui/material";
import { useContextDonations } from "../../provider/DonationsProvider";

const DonacionesForm = () => {
  const { getBooks, getBook } = useBook();
  const { control, handleSubmit } = useForm();
  const [books, setBooks] = useState([]);

  const {
    State,
    bookToDonate,
    addBookToDonate,
    addBookToDonationState,
    removeBookToDonate,
    donationBook,
  } = useContextDonations ();

  useEffect(() => {
    getBooks().then((newData) => setBooks(newData));
  }, []);

 
  const onSuccess = handleSubmit(async (data) => {
    getBook(data.barcode.value).then((newData) => {
      const barcode = data.barcode.value
      const title = newData.title
      const quantity = data.quantity
      const reason = data.reason
      const beneficiary = data.beneficiary

      addBookToDonate({barcode, title, quantity, reason , beneficiary})
      console.log(barcode)
      console.log(title);
      console.log(quantity);
      console.log(reason);
      console.log(beneficiary)
    })
  });

  return (
    <div>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2} justifyContent="center" alignContent="center">
          <Stack direction= "row" spacing={2} justifyContent="center"  mt={2}>
            <AutocompleteElement
              sx={{
                bgcolor: "green",
                "& .MuiOutlinedInput-root": {
                  bgcolor: "green",
                },
                "& mui.InputBase-root": { bgcolor: "green" }}}
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
            />
            <TextFieldElement
              control={control}
              required
              name="reason"
              label="Motivo"
              type="text"
            />
            <TextFieldElement
              control={control}
              required
              name="beneficiary"
              label="Beneficiario"
              type="text"
            />
            <Button variant="contained" type="submit">
              Añadir
            </Button>
          </Stack>
          {bookToDonate != null && (
            <>
              <Typography variant="p" mt={2}>
                Libro a perder: {bookToDonate.title}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("bookToLoss:", bookToDonate);
                  addBookToDonationState()
                  addBookToDonate(null)
                
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

export default DonacionesForm;