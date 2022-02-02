import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/Routes";
import { TransactionProvider } from "./src/Hook/TransactionsContext";

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <TransactionProvider>
          <Routes />
        </TransactionProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
