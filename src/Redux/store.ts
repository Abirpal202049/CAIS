import { configureStore } from "@reduxjs/toolkit";
import uiDetailsSlice from "./slices/uiDetailsSlice";
import sidebarSlice from "./slices/Dashboard/sidebarSlice";

export const store = configureStore({
  reducer: {
    uiDetails: uiDetailsSlice,
    sideBar: sidebarSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
