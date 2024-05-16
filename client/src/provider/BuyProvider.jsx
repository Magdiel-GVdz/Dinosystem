import React, { createContext, useContext, useState } from "react";
import { useBuys } from "../hooks/useBuys";

const BuyContext = createContext();

const BuyProvider = ({ children }) => {
  const { createBuy } = useBuys();
  // Ejemplo de petición para crear una compra
  // {
  //   "buyItems": [
  //     {
  //       "barcode": "12345",
  //       "quantity": 1000,
  //       "price": 0.00
  //     },
  //     {
  //       "barcode": "123",
  //       "quantity": 1000,
  //       "price": 0.00
  //     }
  //   ],
  //   "total_price": 0.00
  // }
  const [buyState, setBuyState] = useState([]
  );
  const [bookToBuy, setBookToBuy] = useState({
    barcode: "",
    quantity: 0,
    price: 0.0,
  });

  const addBookToBuy = ({ barcode, quantity, price }) => {
    setBookToBuy({ barcode, quantity, price });
  };

  const addBookToBuyState = () => {
    setBuyState([...buyState, bookToBuy]);
  };

  const removeBookToBuy = (barcode) => {
    setBuyState(
      buyState.filter((book) => book.barcode !== barcode)
    );
  };

  const buyBook = async () => {
    try {
      if (buyState.length === 0) {
        throw new Error("No books to buy");
      }

      const totalPrice = buyState.reduce((total, book) => total + (book.price * book.quantity), 0);
      const response = await createBuy({ buyItems: buyState, total_price: totalPrice });
      return response;
    } catch (error) {
      console.error("An error occurred while buying the book:", error);
      
    }
  };

  return (
    <BuyContext.Provider
      value={{ buyState, bookToBuy, addBookToBuy, addBookToBuyState, removeBookToBuy, buyBook }}
    >
      {children}
    </BuyContext.Provider>
  );
};

export const useContextBuy = () => {
  return useContext(BuyContext);
};

export default BuyProvider;
