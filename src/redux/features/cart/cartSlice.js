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
} = cartSlice.actions;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { PIZZA_API } from "../../../apis/PizzaApi";

// const initialState = {
//   cartItems: [],
//   amount: 1,
//   total: 0,
//   isLoading: true,
// };

// export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
//   const response = await fetch(PIZZA_API);
//   const data = await response.json();
//   const modifeData = data.data.map((item) => ({ ...item, amount: 0 }));
//   return modifeData;
// });

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.amount = 0;
//     },
//     removeItem: (state, action) => {
//       const itemId = action.payload;
//       state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
//     },
//     increment: (state, { payload }) => {
//       const cartItem = state.cartItems.find((item) => item.id === payload.id);
//       cartItem.amount = cartItem.amount + 1;
//     },
//     decrement: (state, { payload }) => {
//       const cartItem = state.cartItems.find((item) => item.id === payload.id);
//       cartItem.amount = cartItem.amount - 1;
//     },
//     calculateTotals: (state) => {
//       let amount = 1;
//       let total = 0;
//       state.cartItems.forEach((item) => {
//         amount += item.amount;
//         total += item.amount * item.unitPrice;
//       });
//       state.amount = amount;
//       state.total = total;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCartItems.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getCartItems.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload;
//       })
//       .addCase(getCartItems.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
// });

// export default cartSlice.reducer;
// export const { clearCart, removeItem, increment, decrement, calculateTotals } =
//   cartSlice.actions;
