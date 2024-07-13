/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

export const CounterContext = createContext();

export const useCounter = () => useContext(CounterContext);

export const CounterProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  const initialState = {
    counter: 0,
    price: 0,
    totalPrice: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { ...state, counter: state.counter + 1 };
      case "decrement":
        return { ...state, counter: state.counter - 1 };
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch({ type: "increment" });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <CounterContext.Provider
      value={{ value, setValue, state, handleIncrement, handleDecrement }}
    >
      {children}
    </CounterContext.Provider>
  );
};
