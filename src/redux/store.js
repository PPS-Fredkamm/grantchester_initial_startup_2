import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import appReducer from "./slices/appSlice.js";

// Load from sessionStorage
function loadState() {
  try {
    const serialized = sessionStorage.getItem("grantchester.auth");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
}

// Save to sessionStorage
function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    sessionStorage.setItem("grantchester.auth", serialized);
  } catch {
    // ignore write errors
  }
}

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});
