import { createSlice } from "@reduxjs/toolkit";
import sliceConfig from "./appSlice.json";

const initialState = getDefaultSlice();

function getDefaultSlice() {
  let c = sliceConfig;
  return c;
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDocumentTitle: (state, action) => {
      state.documentTitle = action.payload;
    },
    setApiEnvironment: (state, action) => {
      state.apiEnvironment = action.payload;
    },
    setVersion: (state, action) => {
      state.version = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setApiEnvironment, setDocumentTitle } = appSlice.actions;
export default appSlice.reducer;
