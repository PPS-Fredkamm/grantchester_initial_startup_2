import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as BLM from "../../managers/BusinessLayerMethods";

// ----------------------------------------
// Thunks (async actions)
// ----------------------------------------

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await BLM.Login(username, password);
      if (result) {
        // BusinessLayerMethods.Login returns an object with { user, profile, roles, imageFile, address, token }
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

export const register = createAsyncThunk("auth/register", async ({ username, password }, thunkAPI) => {
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
});

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
  addressCDO: null,
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
      apiInfo: { bearerToken: null },
      user: null,
      profile: null,
      roles: [],
      imageFile: null,
      addressCDO: null,
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
      state.addressCDO = action.payload;
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
        state.addressCDO = action.payload.addressCDO;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.sequence += 1;
        state.user = null;
        state.profile = null;
        state.roles = [];
        state.imageFile = null;
        state.addressCDO = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.sequence += 1;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.roles = action.payload.roles;
        state.imageFile = action.payload.imageFile;
        state.addressCDO = action.payload.addressCDO;
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
