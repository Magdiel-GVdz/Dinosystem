import React, { createContext, useContext, useState } from "react";
import { useDonations } from "../hooks/useDonations";

const DonationsContext = createContext();

const DonationsProvider = ({ children }) => {
  const { createDonation } = useDonations();
 
  const [donationState, setDonationState] = useState([]);
  const [bookToDonate, setBookToDonate] = useState();

  const addBookToDonate = ({ barcode, title, quantity, reason, beneficiary }) => {
    if (barcode && title && quantity && reason && beneficiary) {
      setBookToDonate({ barcode, title, quantity, reason, beneficiary });
    } else {
      setBookToDonate(null);
    }
  };

  const addBookToDonationState = () => {
    setDonationState([...donationState, bookToDonate]);
  };

  const removeBookToDonate = (barcode) => {
    setDonationState(donationState.filter((book) => book.barcode !== barcode));
  };

  const resetDonationState = () => {
    setDonationState([]);
  };

  const donationBook = async () => {
    try {
      if (donationState.length === 0) {
        throw new Error("No books to donate");
      }

      const beneficiary = donationState.reduce(
        (book) => book.beneficiary + " ",
        ""
      );

      const reason = donationState.reduce(
        (book) => book.reason + " ",
      );

      const response = await createDonation({
        donationItems: donationState,
        beneficiary: beneficiary,
        reason: reason,
      });
      return response;
    } catch (error) {
      console.error("An error occurred while donating the book:", error);
    }
  };

  return (
    <DonationsContext.Provider
      value={{
        donationState,
        bookToDonate,
        addBookToDonate,
        addBookToDonationState,
        removeBookToDonate,
        resetDonationState,
        donationBook,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
};

export const useContextDonations = () => {
  return useContext(DonationsContext);
};

export default DonationsProvider;
