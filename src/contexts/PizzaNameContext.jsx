/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const PizzaNameContext = createContext();

export const usePizzaName = () => useContext(PizzaNameContext);

export const PizzaNameProvider = ({ children }) => {
  const [pizzaName, setPizzaName] = useState("");

  return (
    <PizzaNameContext.Provider value={{ pizzaName, setPizzaName }}>
      {children}
    </PizzaNameContext.Provider>
  );
};
