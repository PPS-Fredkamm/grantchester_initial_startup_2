import { createSlice } from "@reduxjs/toolkit";
import ctxConfig from "../../context/ApplContext.json";

const initialState = {
  documentTitle: ctxConfig.documentTitle,
  apiEnvironment: ctxConfig.apiEnvironment,
  version: ctxConfig.version,
};

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
  },
});

export const { setApiEnvironment, setDocumentTitle } = appSlice.actions;
export default appSlice.reducer;
