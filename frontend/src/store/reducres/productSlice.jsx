import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproduct: (state, action) => {
      state.productData = action.payload;
    },
    loadlazyproduct: (state, action) => {
      state.productData = [...state.productData, ...action.payload];
    },
  },
});

export const { loadproduct, loadlazyproduct } = productSlice.actions;
export default productSlice.reducer;
