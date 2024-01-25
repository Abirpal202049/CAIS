// a slice file which should have a navbarHight state and a setNavbarHeight action creator which takes a number as a payload

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarHeight: 0,
};

export const uiDetailsSlice = createSlice({
  name: "uiDetails",
  initialState,
  reducers: {
    setNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    },
  },
});

export const { setNavbarHeight } = uiDetailsSlice.actions;
export default uiDetailsSlice.reducer;
