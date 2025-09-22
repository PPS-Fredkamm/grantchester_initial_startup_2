import { store } from "../redux/store";
import {
  setToken,
  setUser,
  setRoles,
  setProfile,
  setAddress,
  setImageFile,
} from "../redux/slices/authSlice";
import { clearAuthState } from "../redux/slices/authSlice";

import * as apiClient from "./ApiClient";
import * as ACEAddress from "./ApiClient-Location";
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
    var user = state.auth.user;

    if (!user || !user.id) {
      console.error("No user in Redux state — cannot change password.");
      return false;
    }

    id = user.id;

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
  var addressCDO;
  var token, user, roles, profile, imageFile, roleNames;
  try {
    store.dispatch(clearAuthState());
    // ----------------------------------------
    apiResult = await apiClient.AcquireTokenAsync(username, password);
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      store.dispatch(setToken(token));
      // ----------------------------------------
      apiResult = await apiClient.GetUserByUsernameAsync(username);
      user = ACM.getApiResultData(apiResult);
      store.dispatch(setUser(user));
      // ----------------------------------------
      apiResult = await apiClient.GetRolesByUserIDAsync(user.id);
      roles = ACM.getApiResultData(apiResult);
      roleNames = [];
      if (roles !== undefined && roles !== null) {
        for (var i = 0; i < roles.length; i++) {
          roleNames.push(roles[i].name);
        }
      }
      store.dispatch(setRoles(roleNames));
      // ----------------------------------------
      apiResult = await apiClient.GetProfileAsync(user.profileID);
      profile = ACM.getApiResultData(apiResult);
      store.dispatch(setProfile(profile));
      // ----------------------------------------
      apiResult = await ACEAddress.GetAddressCDOAsync(profile.addressID);
      addressCDO = ACM.getApiResultData(apiResult);
      if (addressCDO !== undefined && addressCDO !== null) {
        store.dispatch(setAddress(addressCDO));
      }
      // ----------------------------------------
      apiResult = await ACEImage.GetImageFileAsync(profile.imageID);
      imageFile = ACM.getApiResultData(apiResult);
      if (imageFile !== undefined && imageFile !== null) {
        store.dispatch(setImageFile(imageFile));
      }
      return { user, profile, roles: roleNames, imageFile, addressCDO, token };
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
    // Reset Redux auth state
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
  var userID, user, profileID, profile, addressID;
  try {
    // ----------------------------------------
    // 1. Acquire registration token
    apiResult = await apiClient.AcquireRegistrationTokenAsync();
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      store.dispatch(setToken(token));
      // ----------------------------------------
      // 2. Create user
      apiResult = await apiClient.CreateUserAsync();
      userID = ACM.getApiResultData(apiResult);

      if (userID > 0) {
        apiResult = await apiClient.GetUserAsync(userID);
        user = ACM.getApiResultData(apiResult);

        user.isEnabled = true;
        user.username = username;

        apiResult = await apiClient.UpdateUserAsync(user);
        flag = ACM.getApiResultData(apiResult);

        if (flag) {
          // ----------------------------------------
          // 3. Set password
          apiResult = await apiClient.SetPasswordAsync(userID, password);
          flag = ACM.getApiResultData(apiResult);
          if (flag) {
            // ----------------------------------------
            // 4. Create profile
            apiResult = await apiClient.CreateProfileAsync();
            profileID = ACM.getApiResultData(apiResult);

            if (profileID > 0) {
              user.profileID = profileID;

              apiResult = await apiClient.UpdateUserAsync(user);
              flag = ACM.getApiResultData(apiResult);

              if (flag) {
                // ----------------------------------------
                // 5. Get profile and attach address
                apiResult = await apiClient.GetProfileAsync(profileID);
                profile = ACM.getApiResultData(apiResult);
                apiResult = await ACEAddress.CreateAddressAsync();
                addressID = ACM.getApiResultData(apiResult);

                if (addressID > 0) {
                  profile.addressID = addressID;
                }
                apiResult = await apiClient.UpdateProfileAsync(profile);
                flag = ACM.getApiResultData(apiResult);
                if (flag) {
                  // ----------------------------------------
                  // 6. Auto-login new user
                  flag = await Login(username, password);
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
//  UpdateImageFile
// ========================================

export async function UpdateImageFile(imageFile) {
  var flag = false;
  var apiResult, id;

  try {
    var state = store.getState();
    var profile = state.auth.profile;

    if (!profile) {
      console.error("No profile in Redux state — cannot update image file.");
      return false;
    }

    // ----------------------------------------
    // 1. If profile has no imageID, create one
    if (!profile.imageID || profile.imageID === 0) {
      apiResult = await ACEImage.CreateImageFileAsync();
      id = ACM.getApiResultData(apiResult);

      if (id > 0) {
        // Update profile with new imageID
        profile = { ...profile, imageID: id };
        apiResult = await apiClient.UpdateProfileAsync(profile);
        flag = ACM.getApiResultData(apiResult);

        if (flag) {
          imageFile.id = id;
          store.dispatch(setProfile(profile));
        }
      } else {
        console.error("CreateImageFile failed");
        return false;
      }
    } else {
      // Profile already has an image
      imageFile.id = profile.imageID;
    }

    // ----------------------------------------
    // 2. Upload image file
    if (imageFile.id > 0) {
      apiResult = await ACEImage.UpdateImageFileAsync(imageFile);
      flag = ACM.getApiResultData(apiResult);

      if (flag) {
        store.dispatch(setImageFile(imageFile));
      }
    }
  } catch (error) {
    console.error("Error in UpdateImageFile:", error);
    flag = false;
  }

  return flag;
}

// ========================================
//  UpdateProfile
// ========================================

export async function UpdateProfile(tmpProfile) {
  var flag = false;
  var apiResult;
  var currentProfile, updatedProfile;

  try {
    var state = store.getState();
    currentProfile = state.auth.profile;

    if (!currentProfile) {
      console.error("No profile in Redux state — cannot update profile.");
      return false;
    }

    // Merge tmpProfile values into currentProfile
    updatedProfile = {
      ...currentProfile,
      firstName: tmpProfile.firstName,
      middleName: tmpProfile.middleName,
      lastName: tmpProfile.lastName,
      phoneNumber: tmpProfile.phoneNumber,
      email: tmpProfile.email,
    };

    // Call API
    apiResult = await apiClient.UpdateProfileAsync(updatedProfile);
    flag = ACM.getApiResultData(apiResult);

    // If successful, update Redux
    if (flag) {
      store.dispatch(setProfile(updatedProfile));
    }
  } catch (error) {
    console.error("Error in UpdateProfile:", error);
    flag = false;
  }

  return flag;
}

// ========================================
//  UpdateAddressCDO
// ========================================

export async function UpdateAddressCDO(tmpAddressCDO) {
  var flag = false;
  var apiResult;
  var addressCDO;
  var state, profile, id, updatedAddress;

  try {
    state = store.getState();
    addressCDO = state.auth.addressCDO;
    profile = state.auth.profile;

    if (!profile) {
      console.error("No profile in Redux state — cannot update address.");
      return false;
    }

    // ----------------------------------------
    // 1. If no address exists, create one
    if (!addressCDO || addressCDO.id === 0) {
      apiResult = await ACEAddress.CreateAddressAsync();
      id = ACM.getApiResultData(apiResult);

      if (id > 0) {
        apiResult = await ACEAddress.GetAddressCDOAsync(id);
        addressCDO = ACM.getApiResultData(apiResult);

        // Update profile with new addressID
        var updatedProfile = { ...profile, addressID: addressCDO.id };
        apiResult = await apiClient.UpdateProfileAsync(updatedProfile);
        flag = ACM.getApiResultData(apiResult);

        if (flag) {
          store.dispatch(setProfile(updatedProfile));
          store.dispatch(setAddress(addressCDO));
        }
      }
    }

    // ----------------------------------------
    // 2. Merge tmpAddressCDO into current address
    updatedAddress = {
      ...addressCDO,
      addressLine1: tmpAddressCDO.addressLine1,
      addressLine2: tmpAddressCDO.addressLine2,
      addressLine3: tmpAddressCDO.addressLine3,
      cityName: tmpAddressCDO.cityName,
      postalCode: tmpAddressCDO.postalCode,
      stateID: tmpAddressCDO.stateID,
      state: tmpAddressCDO.state,
      countryID: tmpAddressCDO.countryID,
      country: tmpAddressCDO.country,
    };

    // Call API
    apiResult = await ACEAddress.UpdateAddressCDOAsync(updatedAddress);
    flag = ACM.getApiResultData(apiResult);

    if (flag) {
      store.dispatch(setAddress(updatedAddress));
    }
  } catch (error) {
    console.error("Error in UpdateAddress:", error);
    flag = false;
  }

  return flag;
}

// ========================================
//  ReloadMember
// ========================================

export async function ReloadMember() {
  try {
    var state = store.getState();
    var user = state.auth.user;

    if (!user || !user.username) return false;

    // ----------------------------------------
    // 1. Fetch latest user
    const apiUser = await apiClient.GetUserByUsernameAsync(user.username);
    var newUser = ACM.getApiResultData(apiUser);
    if (!newUser) return false;
    store.dispatch(setUser(newUser));

    // ----------------------------------------
    // 2. Fetch latest profile
    var apiProfile = await apiClient.GetProfileAsync(newUser.profileID);
    var newProfile = ACM.getApiResultData(apiProfile);
    if (newProfile) {
      store.dispatch(setProfile(newProfile));
    }

    // ----------------------------------------
    // 3. Fetch latest roles
    var apiRoles = await apiClient.GetRolesByUserIDAsync(newUser.id);
    var roles = ACM.getApiResultData(apiRoles);
    if (roles) {
      var roleNames = roles.map((r) => r.name);
      store.dispatch(setRoles(roleNames));
    }

    // ----------------------------------------
    // 4. Fetch latest image
    if (newProfile?.imageID) {
      var apiImage = await ACEImage.GetImageFileAsync(newProfile.imageID);
      var newImage = ACM.getApiResultData(apiImage);
      if (newImage) {
        store.dispatch(setImageFile(newImage));
      }
    }

    return true;
  } catch (ex) {
    console.error("Error reloading member data:", ex);
    return false;
  }
}
