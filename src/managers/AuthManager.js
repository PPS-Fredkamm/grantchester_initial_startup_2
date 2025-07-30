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
    id = Globals.member.user.id;
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
    Globals.initMember();
    // ----------------------------------------
    apiResult = await apiClient.AcquireTokenAsync(username, password);
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      Globals.apiInfo.bearerToken = token;
      // ----------------------------------------
      apiResult = await apiClient.GetUserByUsernameAsync(username);
      user = ACM.getApiResultData(apiResult);
      Globals.member.user = user;
      // ----------------------------------------
      apiResult = await apiClient.GetProfileAsync(user.profileID);
      profile = ACM.getApiResultData(apiResult);
      Globals.member.profile = profile;
      // ----------------------------------------
      apiResult = await apiClient.GetRolesByUserIDAsync(user.id);
      roles = ACM.getApiResultData(apiResult);
      for (let i = 0; i < roles.length; i++) {
        Globals.member.roles.push(roles[i].name);
      }
      // ----------------------------------------
      apiResult = await apiClient.GetImageFileAsync(profile.imageID);
      imageFile = ACM.getApiResultData(apiResult);
      if (imageFile !== undefined && imageFile !== null) {
        Globals.member.imageFile = imageFile;
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
    Globals.initMember();
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
    Globals.initMember();
    // ----------------------------------------
    apiResult = await apiClient.AcquireRegistrationTokenAsync();
    token = ACM.getApiResultData(apiResult);
    if (token !== undefined && token !== null) {
      Globals.apiInfo.bearerToken = token;
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
              user.profileID = profileID;
              apiResult = await apiClient.UpdateUserAsync(user);
              flag = ACM.getApiResultData(apiResult);
              if (flag) {
                apiResult = await apiClient.GetProfileAsync(profileID);
                profile = ACM.getApiResultData(apiResult);
                apiResult = await apiClient.UpdateProfileAsync(profile);
                flag = ACM.getApiResultData(apiResult);
                if (flag) {
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

  if (Globals.member.profile.imageID === 0) {
    apiResult = await apiClient.CreateImageFileAsync();
    id = ACM.getApiResultData(apiResult);
    if (id > 0) {
      Globals.member.profile.imageID = id;
      apiResult = await apiClient.UpdateProfileAsync(Globals.member.profile);
      flag = ACM.getApiResultData(apiResult);
      if (flag) {
        imageFile.id = id;
      }
    } else {
      console.error("CreateImageFile failed");
    }
  } else {
    imageFile.id = Globals.member.profile.imageID;
  }

  if (imageFile.id > 0) {
    apiResult = await apiClient.UpdateImageFileAsync(imageFile);
    flag = ACM.getApiResultData(apiResult);
    if (flag) {
      Globals.member.imageFile = imageFile;
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

  profile = Globals.member.profile;
  profile.firstName = tmpProfile.firstName;
  profile.middleName = tmpProfile.middleName;
  profile.lastName = tmpProfile.lastName;
  profile.phoneNumber = tmpProfile.phoneNumber;
  profile.email = tmpProfile.email;
  apiResult = await apiClient.UpdateProfileAsync(profile);
  flag = ACM.getApiResultData(apiResult);
  if (flag) {
  }
  Globals.saveToSessionStorage();

  return flag;
}

// ========================================
//  ReloadMember
// ========================================
export async function ReloadMember() {
  try {
    const user = Globals.member.user;
    if (!user || !user.username) return false;

    // Fetch latest user info
    const apiUser = await apiClient.GetUserByUsernameAsync(user.username);
    Globals.member.user = ACM.getApiResultData(apiUser);

    // Fetch latest profile
    const apiProfile = await apiClient.GetProfileAsync(
      Globals.member.user.profileID
    );
    Globals.member.profile = ACM.getApiResultData(apiProfile);

    // Fetch latest roles
    Globals.member.roles = [];
    const apiRoles = await apiClient.GetRolesByUserIDAsync(
      Globals.member.user.id
    );
    const roles = ACM.getApiResultData(apiRoles);
    if (roles) {
      for (let r of roles) {
        Globals.member.roles.push(r.name);
      }
    }

    // Fetch latest image
    const apiImage = await apiClient.GetImageFileAsync(
      Globals.member.profile.imageID
    );
    Globals.member.imageFile = ACM.getApiResultData(apiImage);

    // Save new state
    Globals.saveToSessionStorage();
    return true;
  } catch (ex) {
    console.error("Error reloading member data:", ex);
    return false;
  }
}
