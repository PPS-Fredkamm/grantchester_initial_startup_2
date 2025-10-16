import { store } from "../redux/store";
import { clearAuthState, setToken, setUser, setProfile, setRoles } from "../redux/slices/authSlice";

import * as apiClient from "./ApiClient";
import * as ACELocation from "./ApiClient-Location";
import * as ACEImage from "./ApiClient-ImageFile";
import * as ACM from "./ApiClientMethods";

// ========================================
//  ChangePassword
// ========================================

export async function ChangePassword(currentPassword, newPassword) {
  var flag = false;
  var apiResult, id;

  try {
    var state = store.getState();
    var userDTO = state.auth.userDTO;

    if (!userDTO || !userDTO.id) {
      console.error("No user in Redux state — cannot change password.");
      return false;
    }

    id = userDTO.id;

    // ----------------------------------------
    // 1. Check current password
    apiResult = await apiClient.CheckPasswordAsync(id, currentPassword);
    flag = ACM.getApiResultData(apiResult);

    // ----------------------------------------
    // 2. Set new password
    if (flag) {
      apiResult = await apiClient.SetPasswordAsync(id, newPassword);
      flag = ACM.getApiResultData(apiResult);
    }
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  Login
// ========================================

export async function Login(username, password) {
  var apiResult;
  var token;
  var userDTO;
  var profileCDO;
  var rolesList, roles;
  try {
    store.dispatch(clearAuthState());
    // ----------------------------------------
    apiResult = await apiClient.AcquireTokenAsync(username, password);
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      store.dispatch(setToken(token));
      // ----------------------------------------
      apiResult = await apiClient.GetUserByUsernameAsync(username);
      userDTO = ACM.getApiResultData(apiResult);
      store.dispatch(setUser(userDTO));
      // ----------------------------------------
      apiResult = await apiClient.GetProfileCDOAsync(userDTO.profileID);
      profileCDO = ACM.getApiResultData(apiResult);
      store.dispatch(setProfile(profileCDO));
      // ----------------------------------------
      apiResult = await apiClient.GetRolesByUserIDAsync(userDTO.id);
      rolesList = ACM.getApiResultData(apiResult);
      roles = [];
      if (rolesList !== undefined && rolesList !== null) {
        for (var i = 0; i < rolesList.length; i++) {
          roles.push(rolesList[i].name);
        }
      }
      store.dispatch(setRoles(roles));
      // ----------------------------------------
      return { userDTO, profileCDO, roles, token };
    }
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return null;
}

// ========================================
//  Logout
// ========================================

export async function Logout() {
  var flag = false;
  try {
    store.dispatch(clearAuthState());
    flag = true;
  } catch (ex) {
    console.error("Error during logout:", ex);
  }
  return flag;
}

// ========================================
//  Register
// ========================================

export async function Register(username, password) {
  var flag = false;
  var apiResult, token;
  var userID, user;
  var profileID, profile;
  var addressID, address;

  try {
    // ----------------------------------------
    // 1. Acquire registration token
    // ----------------------------------------
    apiResult = await apiClient.AcquireRegistrationTokenAsync();
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      store.dispatch(setToken(token));
      // ----------------------------------------
      // 2. Create a new user
      // ----------------------------------------
      apiResult = await apiClient.CreateUserAsync();
      userID = ACM.getApiResultData(apiResult);
      if (userID > 0) {
        apiResult = await apiClient.GetUserAsync(userID);
        user = ACM.getApiResultData(apiResult);
        // Set the username and the isEnabled flag.
        user.isEnabled = true;
        user.username = username;
        apiResult = await apiClient.UpdateUserAsync(user);
        flag = ACM.getApiResultData(apiResult);
        if (flag) {
          // ----------------------------------------
          // 3. Set the specified user password
          // ----------------------------------------
          apiResult = await apiClient.SetPasswordAsync(userID, password);
          flag = ACM.getApiResultData(apiResult);
          if (flag) {
            // Get the updated user record from the database
            apiResult = await apiClient.GetUserAsync(userID);
            user = ACM.getApiResultData(apiResult);
            // ----------------------------------------
            // 4. Create a new profile
            // ----------------------------------------
            apiResult = await apiClient.CreateProfileAsync();
            profileID = ACM.getApiResultData(apiResult);
            if (profileID > 0) {
              // Update the profile ID in the user record
              user.profileID = profileID;
              apiResult = await apiClient.UpdateUserAsync(user);
              flag = ACM.getApiResultData(apiResult);
              if (flag) {
                // ----------------------------------------
                // 5. Get the created profile
                // ----------------------------------------
                apiResult = await apiClient.GetProfileAsync(profileID);
                profile = ACM.getApiResultData(apiResult);
                // Create a new address for the profile
                apiResult = await ACELocation.CreateAddressAsync();
                addressID = ACM.getApiResultData(apiResult);
                if (addressID > 0) {
                  // Update the profile
                  profile.addressID = addressID;
                  apiResult = await apiClient.UpdateProfileAsync(profile);
                  flag = ACM.getApiResultData(apiResult);
                  if (flag) {
                    apiResult = await ACELocation.GetAddressAsync(addressID);
                    address = ACM.getApiResultData(apiResult);
                    if (address !== undefined && address !== null) {
                      flag = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  ResetPassword
// ========================================

export async function ResetPassword() {
  var flag = false;
  try {
    // Not implemented
    flag = true;
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  UpdateProfileCDO
// ========================================

export async function UpdateProfileCDO(tmpProfileCDO) {
  var flag = false;
  var apiResult;

  try {
    apiResult = await apiClient.UpdateProfileCDOAsync(tmpProfileCDO);
    flag = ACM.getApiResultData(apiResult);
    if (flag) {
      store.dispatch(setProfile(tmpProfileCDO));
    }
  } catch (error) {
    console.error("Error in UpdateProfileCDO:", error);
    flag = false;
  }

  return flag;
}
