import Globals from "../global/globals";
import * as apiClient from "./ApiClient";
import * as ACM from "./ApiClientMethods";

// ========================================
//  ChangePassword
// ========================================

export async function ChangePassword(currentPassword, newPassword) {
  var flag = false;
  var apiResult, id;
  try {
    id = Globals.userInfo.id;
    apiResult = await apiClient.CheckPasswordAsync(id, currentPassword);
    flag = ACM.getApiResultData(apiResult);
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
  var flag = false;
  var apiResult;
  var token, user, profile, roles, imageFile;
  try {
    Globals.initUserInfo();
    Globals.initProfileInfo();
    Globals.initRoleInfo();
    Globals.initImageFileInfo();
    // ----------------------------------------
    apiResult = await apiClient.AcquireTokenAsync(username, password);
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      Globals.apiInfo.bearerToken = token;
      // ----------------------------------------
      apiResult = await apiClient.GetUserByUsernameAsync(username);
      user = ACM.getApiResultData(apiResult);
      Globals.userInfo.id = user.id;
      Globals.userInfo.memberID = user.memberID;
      Globals.userInfo.username = user.username;
      // ----------------------------------------
      apiResult = await apiClient.GetProfileByUserIDAsync(user.id);
      profile = ACM.getApiResultData(apiResult);
      Globals.profileInfo.id = profile.id;
      Globals.profileInfo.firstName = profile.firstName;
      Globals.profileInfo.middleName = profile.middleName;
      Globals.profileInfo.lastName = profile.lastName;
      Globals.profileInfo.phoneNumber = profile.phoneNumber;
      Globals.profileInfo.email = profile.email;
      // ----------------------------------------
      apiResult = await apiClient.GetRolesByUserIDAsync(user.id);
      roles = ACM.getApiResultData(apiResult);
      for (let i = 0; i < roles.length; i++) {
        Globals.roleInfo.roles.push(roles[i].name);
      }
      // ----------------------------------------
      apiResult = await apiClient.GetImageFileByUserIDAsync(user.id);
      imageFile = ACM.getApiResultData(apiResult);
      if (imageFile !== undefined && imageFile !== null) {
        Globals.imageFileInfo.id = imageFile.id;
        Globals.imageFileInfo.name = imageFile.name;
        Globals.imageFileInfo.contentType = imageFile.contentType;
        Globals.imageFileInfo.data = imageFile.data;
        Globals.imageFileInfo.length = imageFile.length;
      }
      // ----------------------------------------
      Globals.saveToSessionStorage();
      // ----------------------------------------
      flag = true;
    }
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  Logout
// ========================================

export async function Logout() {
  var flag = false;
  try {
    Globals.initUserInfo();
    Globals.initProfileInfo();
    Globals.initRoleInfo();
    Globals.initImageFileInfo();
    Globals.clearFromSessionStorage();
    flag = true;
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  Register
// ========================================

export async function Register(username, password) {
  var flag = false;
  var apiResult, token;
  var userID, user, profileID, profile;
  try {
    Globals.initUserInfo();
    Globals.initProfileInfo();
    Globals.initRoleInfo();
    // ----------------------------------------
    apiResult = await apiClient.AcquireRegistrationTokenAsync();
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      Globals.apiInfo.bearerToken = token;
    }
    // ----------------------------------------
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
        apiResult = await apiClient.SetPasswordAsync(userID, password);
        flag = ACM.getApiResultData(apiResult);
        if (flag) {
          apiResult = await apiClient.CreateProfileAsync();
          profileID = ACM.getApiResultData(apiResult);
          if (profileID > 0) {
            apiResult = await apiClient.GetProfileAsync(profileID);
            profile = ACM.getApiResultData(apiResult);
            profile.isEnabled = true;
            profile.userID = user.id;
            apiResult = await apiClient.UpdateProfileAsync(profile);
            flag = ACM.getApiResultData(apiResult);
            if (flag) {
              flag = await Login(username, password);
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

  if (Globals.imageFileInfo.id === 0) {
    apiResult = await apiClient.CreateImageFileAsync();
    id = ACM.getApiResultData(apiResult);
    if (id > 0) {
      Globals.imageFileInfo.id = id;
    } else {
      console.error("CreateImageFile failed");
    }
  }

  if (Globals.imageFileInfo.id > 0) {
    imageFile.id = Globals.imageFileInfo.id;
    apiResult = await apiClient.UpdateImageFileAsync(imageFile);
    flag = ACM.getApiResultData(apiResult);
    if (flag) {
      Globals.initImageFileInfo();
      Globals.imageFileInfo.id = imageFile.id;
      Globals.imageFileInfo.name = imageFile.name;
      Globals.imageFileInfo.contentType = imageFile.contentType;
      Globals.imageFileInfo.data = imageFile.data;
      Globals.imageFileInfo.length = imageFile.length;
    }
  }

  return flag;
}

// ========================================
//  UpdateProfile
// ========================================

export async function UpdateProfile(tmpProfile) {
  var flag = false;
  var apiResult;
  var profile;

  apiResult = await apiClient.GetProfileAsync(Globals.profileInfo.id);
  profile = ACM.getApiResultData(apiResult);
  if (profile !== undefined && profile !== null) {
    profile.firstName = tmpProfile.firstName;
    profile.middleName = tmpProfile.middleName;
    profile.lastName = tmpProfile.lastName;
    profile.email = tmpProfile.email;
    apiResult = await apiClient.UpdateProfileAsync(profile);
    flag = ACM.getApiResultData(apiResult);
    if (flag) {
      // Update Globals.profileInfo
      Globals.profileInfo.id = profile.id;
      Globals.profileInfo.firstName = profile.firstName;
      Globals.profileInfo.middleName = profile.middleName;
      Globals.profileInfo.lastName = profile.lastName;
      Globals.profileInfo.phoneNumber = profile.phoneNumber; // include this if you want phone too
      Globals.profileInfo.email = profile.email;

      // Save updated profile to session storage
      Globals.saveToSessionStorage();
    }
  }

  return flag;
}
