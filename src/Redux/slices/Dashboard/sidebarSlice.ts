import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  sidebarOpen: boolean;
  activeTab: string;
}

const initialState: SidebarState = {
  sidebarOpen: false,
  activeTab: "",
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;
