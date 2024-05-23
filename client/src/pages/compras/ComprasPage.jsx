import React from "react";
import ComprasTable from "./ComprasTable";
import ComprasForm from "./ComprasForm";
import BuyProvider from "../../provider/BuyProvider";
const ComprasPage = () => {
  return (
    <div>
      ComprasPage
      <BuyProvider>
        <ComprasForm />
        <ComprasTable />
      </BuyProvider>
    </div>
  );
};

export default ComprasPage;
