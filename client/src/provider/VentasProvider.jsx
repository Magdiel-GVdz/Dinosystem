import React, { createContext, useState, useContext } from "react";
import { useSales } from "../hooks/useSales";

const SaleContext = createContext();

const SaleProvider = ({ children }) => {
  const { createSale } = useSales();

  const [saleState, setSaleState] = useState([]);
  const [bookToSale, setBookToSale] = useState();

  const addBookToSale = ({ barcode, title, quantity, price }) => {
    if (barcode && title && quantity && price) {
      setBookToSale({ barcode, title, quantity, price });
    } else {
      setBookToSale(null);
    }
  };
  const addBookToSaleState = () => {
    setSaleState([...saleState, bookToSale]);
  };

  const removeBookToSale = (barcode) => {
    setSaleState(saleState.filter((book) => book.barcode !== barcode));
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
      const response = await createSale({
        sellItems: saleState,
        total_price: totalPrice,
      });
      return response;
    } catch (error) {
      console.error("An error occurred while selling the book:", error);
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

export default SaleProvider;
