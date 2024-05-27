import React, { createContext, useContext, useState } from "react";
import { useLosses } from "../hooks/useLosses";

const LossesContext = createContext();

const LossesProvider = ({ children }) => {
  const { createLosse } = useLosses();
  const [lossState, setLossState] = useState([]);
  const [bookToLoss, setBookToLoss] = useState();

  const addBookToLoss = ({ barcode, title, quantity, reason }) => {
    if (barcode && title && quantity && reason) {
      setBookToLoss({ barcode, title, quantity , reason });
    } else {
      setBookToLoss(null);
    }
  };

  const addBookToLossState = () => {
    setLossState([...lossState, bookToLoss]);
  };

  const removeBookToLoss = (barcode) => {
    setLossState(lossState.filter((book) => book.barcode !== barcode));
  };

  const resetLossState = () => {
    setLossState([]);
  };

  const lossBook = async () => {
    try {
      if (lossState.length === 0) {
        throw new Error("No books to loss");
      }

      const reason = lossState.reduce(
        (book) => book.reason + " ",
        ""
      );

      const response = await createLosse({
        lossItems: lossState,
        reason: reason,
      });
      return response;
    } catch (error) {
      console.error("An error occurred while loss the book:", error);
    }
  };

  return (
    <LossesContext.Provider
      value={{
        lossState,
        bookToLoss,
        addBookToLoss,
        addBookToLossState,
        removeBookToLoss,
        lossBook,
        resetLossState,
      }}
    >
      {children}
    </LossesContext.Provider>
  );
};

export const useContextLosses = () => {
  return useContext(LossesContext);
};

export default LossesProvider;
