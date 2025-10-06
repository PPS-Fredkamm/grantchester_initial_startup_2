import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as ACEDonation from "../../managers/ApiClient-Donation";
import * as ACM from "../../managers/ApiClientMethods";
import * as BLM from "../../managers/BusinessLayerMethods";

// ========================================
// Async thunk: Submit a donation
// ----------------------------------------
// - Called when a user submits a new donation form
// - Sends the donationData object to the backend via BusinessLayerMethods
// - If successful, returns the new donation object { id, status, ... }
// - If it fails, rejects with an error message
// ========================================
export const submitDonation = createAsyncThunk(
  "donation/submit",
  async (donationData, thunkAPI) => {
    try {
      const result = await BLM.SubmitDonation(donationData);
      return result; // e.g. { id: 123, status: "Pending", ... }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ========================================
// Async thunk: Fetch donations
// ----------------------------------------
// - Called to load all donations tied to a specific user
// - Takes userId as input, calls backend, and retrieves an array of donations
// - If successful, returns something like:
//   [ {id:1, status:"Approved"}, {id:2, status:"Pending"} ]
// - If it fails, rejects with an error message
// ========================================
// donationSlice.js
export const fetchDonations = createAsyncThunk(
  "donation/fetchDonations",
  async (userId, { rejectWithValue }) => {
    try {
      const searchCriteria = "userID=" + userId;
      const apiResult = await ACEDonation.SearchDonationCDOAsync(
        searchCriteria
      );
      const list = ACM.getApiResultData(apiResult);
      return list;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ========================================
// Slice: Donation
// ----------------------------------------
// - Holds all donation-related state in Redux
// - initialState includes:
//   donations: array of all donations for the user
//   currentDonation: last submitted or currently active donation
//   loading: spinner flag for async operations
//   error: error message if an API call fails
// ========================================
const donationSlice = createSlice({
  name: "donation",
  initialState: {
    donationCDO: null,
    donations: [],
    currentDonation: null,
    error: null,
  },
  reducers: {
    // Clear all donation data (e.g., on logout or reset)
    clearDonations: (state) => {
      state.donations = [];
      state.currentDonation = null;
      state.error = null;
    },
    setDonation: (state, action) => {
      state.donationCDO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===============================
      // SUBMIT DONATION
      // ===============================
      .addCase(submitDonation.pending, (state) => {
        // Mark state as loading while API request is in-flight
        state.loading = true;
      })
      .addCase(submitDonation.fulfilled, (state, action) => {
        // Request finished successfully
        state.loading = false;
        // Save the new donation as currentDonation
        state.currentDonation = action.payload;
        // Add it to the donations list
        state.donations.push(action.payload);
      })
      .addCase(submitDonation.rejected, (state, action) => {
        // Request failed
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // FETCH DONATIONS
      // ===============================
      .addCase(fetchDonations.fulfilled, (state, action) => {
        // Replace donations array with the latest from API
        state.donations = action.payload;
      });
  },
});

// Export actions for components to call
export const { clearDonations, setDonation } = donationSlice.actions;

// Export reducer for store.js
export default donationSlice.reducer;
