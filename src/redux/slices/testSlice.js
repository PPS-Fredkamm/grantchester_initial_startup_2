import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  message: "Initial test message",
  loading: false,
  error: null,
};

// Example async thunk (just fakes an API delay)
export const fakeApiCall = createAsyncThunk("test/fakeApiCall");

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    // Define your synchronous reducers here
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { increment } = testSlice.actions;
export default testSlice.reducer;
