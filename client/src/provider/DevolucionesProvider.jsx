import React, { createContext, useState, useContext } from "react";
import { useSales } from "../hooks/useSales";
import { useBook } from "../hooks/useBook";

const SaleContext = createContext();

const DevolucionesProvider = ({ children }) => {
  const { updateBook, getBook } = useBook();  
  const [saleState, setSaleState] = useState([]);
  const [bookToSale, setBookToSale] = useState();
  const addBookToSale = ({id , barcode,  book, quantity, price }) => {
    if (id    && book && quantity && price) {
      setBookToSale({id , barcode, book, quantity, price });
    } else {
      setBookToSale(null);
    }
  };
  const addBookToSaleState = () => {
    setSaleState([...saleState, bookToSale]);
  };

  const removeBookToSale = (id) => {
    setSaleState(saleState.filter((sales) => sales.id !== id));
  };

  const resetSaleState = () => {
    setSaleState([]);
  };

  const saleBook = async () => {
    try {
      if (saleState.length === 0) {
        throw new Error("No books to sale");
      }

      const totalPrice = saleState.reduce(
        (total, book) => total + book.price * book.quantity,
        0
      );

      // const barcode = saleState.map((sale) => {
      //   const book = getBook().find((book) => book.title === sale.book);
      //   return book ? book.barcode : null;
      // });

      const response = await updateBook({
        returnItems: saleState, 
        total_price: totalPrice,
        // barcode:barcode
        
      });
      return response;
    } catch (error) {
      console.error("An error occurred while devolving the book:", error);
    }
  };
  return (
    <SaleContext.Provider
      value={{
        saleState,
        bookToSale,
        addBookToSale,
        addBookToSaleState,
        removeBookToSale,
        resetSaleState,
        saleBook,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

export const useContextSale = () => {
  return useContext(SaleContext);
};

export default DevolucionesProvider;
