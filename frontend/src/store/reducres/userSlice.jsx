import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    removeuser: (state, action) => {
      state.userData = null;
      localStorage.removeItem('userData');
    },
  },
});

export const { loaduser, removeuser } = userSlice.actions;
export default userSlice.reducer;
