import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducres/userSlice"
import productSlice from "./reducres/productSlice"
import cartSlice from "./reducres/cartSlice"

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productReducer: productSlice,
    cartReducer: cartSlice,
  },
});
