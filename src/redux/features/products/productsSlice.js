import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PIZZA_API, PIZZA_ORDER } from "../../../apis/PizzaApi";

const initialState = {
  pizzas: [],
  filteredPizzasList: [],
  orderData: {},
  pizzaName: "",
  isLoading: false,
  error: null,
};

export const getProductItems = createAsyncThunk(
  "products/getProductItems",
  async () => {
    try {
      const response = await fetch(PIZZA_API);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const sendOrderData = createAsyncThunk(
  "products/sendOrderData",
  async (orderData) => {
    try {
      const response = await fetch(PIZZA_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPizzaName: (state, action) => {
      state.pizzaName = action.payload;
    },
    filterPizzasList: (state) => {
      if (state.pizzaName) {
        state.filteredPizzasList = state.pizzas.filter((pizza) =>
          pizza.name.toLowerCase().includes(state.pizzaName.toLowerCase())
        );
      } else {
        state.filteredPizzasList = state.pizzas;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pizzas = action.payload;
        state.filteredPizzasList = action.payload;
      })
      .addCase(getProductItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOrderData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOrderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(sendOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const { setPizzaName, filterPizzasList, setOrderData } =
  productsSlice.actions;
