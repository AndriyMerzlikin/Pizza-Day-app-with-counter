import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!cartItem) {
        state.cartItems.push({ ...action.payload, amount: 1 });
      } else {
        cartItem.amount = cartItem.amount + 1;
      }
      state.amount += 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increment: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
      state.amount += 1;
    },
    decrement: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
      state.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.unitPrice;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  clearCart,
  removeItem,
  increment,
  decrement,
  calculateTotals,
  setCart,
} = cartSlice.actions;
