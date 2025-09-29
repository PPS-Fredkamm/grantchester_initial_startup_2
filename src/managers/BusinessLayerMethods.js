import { useSelector } from "react-redux";
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
//  UpdateImageFile
// ========================================

export async function UpdateImageFile(tmpImageFile) {
  var flag = false;
  var apiResult, id;
  var tmpProfileCDO;

  try {
    const profileCDO = useSelector((state) => state.auth.profileCDO);
    
    tmpProfileCDO = JSON.parse(JSON.stringify(profileCDO));

    // ----------------------------------------
    //  (1) If the profile has no imageID then create a new one
    // ----------------------------------------

    if (tmpProfileCDO.imageID === 0) {
      apiResult = await ACEImage.CreateImageFileAsync();
      id = ACM.getApiResultData(apiResult);
      if (id > 0) {
        tmpProfileCDO.imageID = id;
        apiResult = ACEImage.GetImageFileAsync(id);
        tmpProfileCDO.imageFile = ACM.getApiResultData(apiResult);
      } else {
        console.error("CreateImageFile failed");
        return false;
      }
    }

    // ----------------------------------------
    //  (2) Update the image file
    // ----------------------------------------

    tmpProfileCDO.imageFile.name = tmpImageFile.name;
    tmpProfileCDO.imageFile.contentType = tmpImageFile.contentType;
    tmpProfileCDO.imageFile.data = tmpImageFile.data;
    tmpProfileCDO.imageFile.length = tmpImageFile.length;

    // ----------------------------------------
    //  (3) Update the profileCDO
    // ----------------------------------------

    apiResult = await apiClient.UpdateProfileCDOAsync(tmpProfileCDO);
    flag = ACM.getApiResultData(apiResult);
    if (flag) {
      store.dispatch(setProfile(tmpProfileCDO));
      flag = true;
    }
  } catch (error) {
    console.error("Error in UpdateImageFile:", error);
    flag = false;
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

// ========================================
//  UpdateAddressCDO
// ========================================

export async function UpdateAddressCDO(tmpAddressCDO) {
  var flag = false;
  var apiResult;
  var id;
  var tmpProfileCDO;
  
  try {
    const profileCDO = useSelector((state) => state.auth.profileCDO);
    
    tmpProfileCDO = JSON.parse(JSON.stringify(profileCDO));

    // ----------------------------------------
    //  (1) If no address exists, create one
    // ----------------------------------------

    if (profileCDO.addressID === 0) {
      apiResult = await ACELocation.CreateAddressAsync();
      id = ACM.getApiResultData(apiResult);
      if (id > 0) {
        tmpProfileCDO.addressID = id;
      }
    }

    // ----------------------------------------
    // 2. Merge tmpAddressCDO into current address
    // ----------------------------------------

    tmpProfileCDO.addressCDO.id = id;
    tmpProfileCDO.addressCDO.addressLine1 = tmpAddressCDO.addressLine1;
    tmpProfileCDO.addressCDO.addressLine2 = tmpAddressCDO.addressLine2;
    tmpProfileCDO.addressCDO.addressLine3 = tmpAddressCDO.addressLine3;
    tmpProfileCDO.addressCDO.cityName = tmpAddressCDO.cityName;
    tmpProfileCDO.addressCDO.postalCode = tmpAddressCDO.postalCode;
    tmpProfileCDO.addressCDO.stateID = tmpAddressCDO.stateID;
    tmpProfileCDO.addressCDO.state = tmpAddressCDO.state;
    tmpProfileCDO.addressCDO.countryID = tmpAddressCDO.countryID;
    tmpProfileCDO.addressCDO.country = tmpAddressCDO.country;

    // ----------------------------------------
    //  (3) Update the profileCDO
    // ----------------------------------------

    apiResult = await apiClient.UpdateProfileCDOAsync(tmpProfileCDO);
    flag = ACM.getApiResultData(apiResult);
    if (flag) {
      store.dispatch(setProfile(tmpProfileCDO));
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
    var userDTO = state.auth.userDTO;

    if (!userDTO || !userDTO.username) return false;

    // ----------------------------------------
    // 1. Fetch latest user
    const apiUser = await apiClient.GetUserByUsernameAsync(userDTO.username);
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
