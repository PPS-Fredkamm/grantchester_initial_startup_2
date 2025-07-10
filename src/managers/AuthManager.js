import Globals from "../global/globals";
import * as apiClient from "./ApiClient";
import * as ACM from "./ApiClientMethods";

// ========================================
//  Login
// ========================================

export async function Login(username, password) {
  var flag = false;
  var apiResult;
  var token, user, profile;
  try {
    Globals.initUserInfo();
    Globals.initProfileInfo();
    Globals.initRoleInfo();
    // ----------------------------------------
    apiResult = await apiClient.AcquireTokenAsync(username, password);
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      Globals.userInfo.bearerToken = token;
      // ----------------------------------------
      apiResult = await apiClient.GetUserByUsernameAsync(username);
      user = ACM.getApiResultData(apiResult);
      Globals.userInfo.memberID = user.memberID;
      Globals.userInfo.userID = user.id;
      Globals.userInfo.username = user.username;
      // ----------------------------------------
      apiResult = await apiClient.GetProfileByUserIDAsync(user.id);
      profile = ACM.getApiResultData(apiResult);
      Globals.profileInfo.firstName = profile.firstName;
      Globals.profileInfo.middleName = profile.middleName;
      Globals.profileInfo.lastName = profile.lastName;
      Globals.profileInfo.email = profile.email;
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
    flag = true;
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  Register
// ========================================

export async function Regsiter() {
  var flag = false;
  return flag;
}
