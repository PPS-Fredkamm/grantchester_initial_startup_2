import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as AM from "../../managers/AuthManager";

// ----------------------------------------
// Thunks (async actions)
// ----------------------------------------

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await AM.Login(username, password);
      if (result) {
        // AuthManager.Login returns an object with { user, profile, roles, imageFile, address, token }
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
    const flag = await AM.Logout();
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
      const flag = await AM.Register(username, password);
      if (flag) {
        return { isAuthenticated: true };
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
      const flag = await AM.ChangePassword(
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
      const flag = await AM.ResetPassword();
      return flag;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ----------------------------------------
// Initial State
// ----------------------------------------

const initialState = {
  isAuthenticated: false,
  sequence: 0,
  apiInfo: {
    apiEnvironment: "",
    bearerToken: null,
  },
  user: null,
  profile: null,
  roles: [],
  imageFile: null,
};

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
      apiInfo: { apiEnvironment: "", bearerToken: null },
      user: null,
      profile: null,
      roles: [],
      imageFile: null,
      address: null,
    }),
    setApiInfo: (state, action) => {
      state.apiInfo = action.payload;
    },
    setToken: (state, action) => {
      state.apiInfo.bearerToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setImageFile: (state, action) => {
      state.imageFile = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.sequence += 1;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.roles = action.payload.roles;
        state.imageFile = action.payload.imageFile;
        state.address = action.payload.address;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.sequence += 1;
        state.user = null;
        state.profile = null;
        state.roles = [];
        state.imageFile = null;
        state.address = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.sequence += 1;
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
  setImageFile,
  setAddress,
} = authSlice.actions;

export default authSlice.reducer;
