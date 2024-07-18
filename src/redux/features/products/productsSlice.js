import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PIZZA_API } from "../../../apis/PizzaApi";

const initialState = {
  pizzas: [],
  filteredPizzasList: [],
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
      });
  },
});

export default productsSlice.reducer;
export const { setPizzaName, filterPizzasList } = productsSlice.actions;
