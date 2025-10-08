import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as ACEDonation from "../../managers/ApiClient-Donation";
import * as ACM from "../../managers/ApiClientMethods";
import * as ACO from "../../managers/ApiClientObjects";

/* ============================================================
   Async Thunk: submitDonationForm
   ------------------------------------------------------------
   Description:
   • Submits a new donation request to the backend API.
   • Replicates the old `processForm()` logic that was previously 
     handled directly inside Donate.jsx.

   Flow:
   1. Create a new donation record (CreateDonationAsync)
   2. Retrieve the created record (GetDonationCDOAsync)
   3. Populate it with form and user data
   4. Update the donation record (UpdateDonationCDOAsync)
   5. Fetch and return the finalized DonationCDO

   Returns:
   • On success: fully populated donation object
   • On failure: rejects with an error message
   ============================================================ */
export const submitDonationForm = createAsyncThunk(
  "donation/submitDonationForm",
  async ({ formData, userDTO }, { rejectWithValue }) => {
    try {
      // Step 1: Create new donation record
      let apiResult = await ACEDonation.CreateDonationAsync();
      const id = ACM.getApiResultData(apiResult);
      if (id <= 0) throw new Error("Failed to create donation record");

      // Step 2: Retrieve the newly created donation CDO
      apiResult = await ACEDonation.GetDonationCDOAsync(id);
      let tmpDonationCDO = ACM.getApiResultData(apiResult);

      // Step 3: Populate donation fields
      tmpDonationCDO.userID = userDTO.id;
      tmpDonationCDO.donationDate = formData.donationDate;
      tmpDonationCDO.donationStatusID = ACO.DonationStatusCode.CREATED;
      tmpDonationCDO.units = formData.units;
      tmpDonationCDO.initialValuation = formData.valuation;
      tmpDonationCDO.currentValuation = formData.valuation;
      tmpDonationCDO.valuationDate = formData.donationDate;
      tmpDonationCDO.note = formData.note;

      tmpDonationCDO.companyCDO.name = formData.companyName;
      tmpDonationCDO.universityCDO.name =
        formData.recipient || formData.otherUniversity;

      // Step 4: Update the donation CDO
      apiResult = await ACEDonation.UpdateDonationCDOAsync(tmpDonationCDO);
      const flag = ACM.getApiResultData(apiResult);
      if (!flag) throw new Error("Failed to update donation");

      // Step 5: Fetch the final donation object
      apiResult = await ACEDonation.GetDonationCDOAsync(id);
      tmpDonationCDO = ACM.getApiResultData(apiResult);

      return tmpDonationCDO;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================================================
   Async Thunk: fetchDonations
   ------------------------------------------------------------
   Description:
   • Retrieves all donations tied to a specific user from the API.

   Input:
   • userId — the authenticated user's ID.

   Returns:
   • On success: array of donation objects
   • On failure: rejects with an error message
   ============================================================ */
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

/* ============================================================
   Slice: donationSlice
   ------------------------------------------------------------
   Description:
   • Manages all Redux state related to donations.

   State Structure:
   {
     donationCDO:  most recent or active donation object
     donations:    array of all fetched donations for current user
     currentDonation: last submitted donation
     loading:      boolean flag for active async operations
     error:        string describing the latest API error (if any)
   }

   Reducers:
   • clearDonations() — resets donation-related data (e.g. on logout)
   • setDonation(payload) — manually sets the active donation CDO

   Extra Reducers:
   • Handles all async thunk state transitions (pending, fulfilled, rejected)
   ============================================================ */
const donationSlice = createSlice({
  name: "donation",
  initialState: {
    donationCDO: null,
    donations: [],
    currentDonation: null,
    loading: false,
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
      .addCase(submitDonationForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDonationForm.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDonation = action.payload;
        state.donationCDO = action.payload;
        state.donations.push(action.payload);
      })
      .addCase(submitDonationForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to submit donation.";
      })

      // ===============================
      // FETCH DONATIONS
      // ===============================
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch donations.";
      });
  },
});

/* ============================================================
   Exports
   ------------------------------------------------------------
   • clearDonations, setDonation — regular Redux actions
   • donationSlice.reducer — the reducer to register in store.js
   ============================================================ */
export const { clearDonations, setDonation } = donationSlice.actions;
export default donationSlice.reducer;
