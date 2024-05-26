import React from "react";
import VentasTable from "./VentasTable";
import VentasForm from "./VentasForm";
import VentasProvider from "../../provider/VentasProvider";
const VentasPage = () => {
  return (
    <div>
    ventasPage
    <VentasProvider>
      <VentasForm />
      <VentasTable />
    </VentasProvider>
    </div>
  );
};

export default VentasPage;
