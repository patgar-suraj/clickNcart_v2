import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadcart: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

export const { loadcart } = cartSlice.actions;
export default cartSlice.reducer;
