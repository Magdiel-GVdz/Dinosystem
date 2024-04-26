import React from "react";

import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes/Routes";
import DateAdapter from "./components/DateAdapter";


const App = () => {
  return (
    <DateAdapter>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </DateAdapter>
  );
};

export default App;
