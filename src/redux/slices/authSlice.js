import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as BLM from "../../managers/BusinessLayerMethods";

import sliceConfig from "./authSlice.json";

// ----------------------------------------
// Initial State
// ----------------------------------------

const initialState = getDefaultSlice();

function getDefaultSlice() {
  let c = sliceConfig;
  return c;
}

// ----------------------------------------
// Thunks (async actions)
// ----------------------------------------

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await BLM.Login(username, password);
      if (result) {
        // BusinessLayerMethods.Login returns an object with { userDTO, profileCDO, roles, token }
        return {
          isAuthenticated: true,
          ...result,
        };
      }
      return thunkAPI.rejectWithValue("Invalid login");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const flag = await BLM.Logout();
    if (flag) {
      return { isAuthenticated: false };
    }
    return thunkAPI.rejectWithValue("Logout failed");
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password }, thunkAPI) => {
    try {
      const flag = await BLM.Register(username, password);
      if (flag) {
        // return { isAuthenticated: true };
        const result = await BLM.Login(username, password);
        if (result) {
          return {
            isAuthenticated: true,
            ...result,
          };
        }
      }
      return thunkAPI.rejectWithValue("Registration failed");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword, confirmPassword }, thunkAPI) => {
    try {
      const flag = await BLM.ChangePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      return flag;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (_, thunkAPI) => {
    try {
      const flag = await BLM.ResetPassword();
      return flag;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ----------------------------------------
// Slice
// ----------------------------------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: () => ({
      isAuthenticated: false,
      sequence: 0,
      apiInfo: { bearerToken: null },
      userDTO: null,
      profileCDO: null,
      roles: [],
    }),
    setApiInfo: (state, action) => {
      state.apiInfo = action.payload;
    },
    setToken: (state, action) => {
      state.apiInfo.bearerToken = action.payload;
    },
    setUser: (state, action) => {
      state.userDTO = action.payload;
    },
    setProfile: (state, action) => {
      state.profileCDO = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.sequence += 1;
        state.userDTO = action.payload.userDTO;
        state.profileCDO = action.payload.profileCDO;
        state.roles = action.payload.roles;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.sequence += 1;
        state.userDTO = null;
        state.profileCDO = null;
        state.roles = [];
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.sequence += 1;
        state.userDTO = action.payload.userDTO;
        state.profileCDO = action.payload.profileCDO;
        state.roles = action.payload.roles;
      });
  },
});

// ----------------------------------------
// Exports
// ----------------------------------------

export const {
  clearAuthState,
  setApiInfo,
  setToken,
  setUser,
  setProfile,
  setRoles,
} = authSlice.actions;

export default authSlice.reducer;
