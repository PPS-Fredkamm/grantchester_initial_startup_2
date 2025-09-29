import * as ACM from './ApiClientMethods';

// ========================================
// ========================================
//  Member Controller Profile endpoints
// ========================================
// ========================================

// ========================================
//  CreateProfile
// ========================================

export async function CreateProfileAsync() {
  const apiRoute = 'member/profile';
  const apiMethod = 'POST';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  GetProfile
// ========================================

export async function GetProfileAsync(id) {
  const apiRoute = 'member/profile';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['id'] = id;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  GetProfileCDO
// ========================================

export async function GetProfileCDOAsync(id) {
  const apiRoute = 'member/profile/cdo';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['id'] = id;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  UpdateProfile
// ========================================

export async function UpdateProfileAsync(profile) {
  const apiRoute = 'member/profile';
  const apiMethod = 'PUT';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, profile);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  UpdateProfileCDO
// ========================================

export async function UpdateProfileCDOAsync(profileCDO) {
  const apiRoute = 'member/profile/cdo';
  const apiMethod = 'PUT';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, profileCDO);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
// ========================================
//  Member Controller Role endpoints
// ========================================
// ========================================

// ========================================
//  GetRolesByUserID
// ========================================

export async function GetRolesByUserIDAsync(userID) {
  const apiRoute = 'member/role/user';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['userID'] = userID;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
// ========================================
//  Member Controller User endpoints
// ========================================
// ========================================

// ========================================
//  AcquireToken
// ========================================

// export function AcquireToken(username, password) {
//   const apiRoute = "member/user/acquire-token";
//   const apiMethod = "GET";
//   // ----------------------------------------
//   var url, options, params;
//   var data;
//   // ----------------------------------------
//   params = {};
//   params["username"] = username;
//   params["password"] = password;
//   url = generateFetchUrl(apiRoute, params);
//   options = generateFetchOptions(apiMethod, null);
//   // ----------------------------------------
//   fetch(url, options)
//     .then((response) => {
//       if (!response.ok) {
//         return response.text().then((text) => {
//           throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
//         });
//       }
//       return response.json();
//     })
//     .then((promise) => {
//       data = ACM.getApiResultData(promise);
//       return data;
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error.message);
//     });
// }

// ========================================
//  AcquireTokenAsync
// ========================================

export async function AcquireTokenAsync(username, password) {
  // ----------------------------------------
  const apiRoute = 'member/user/acquire-token';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['username'] = username;
    params['password'] = password;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  AcquireRegistrationTokenAsync
// ========================================

export async function AcquireRegistrationTokenAsync() {
  // ----------------------------------------
  const apiRoute = 'member/user/acquire-registration-token';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  CheckPasswordAsync
// ========================================

export async function CheckPasswordAsync(id, password) {
  // ----------------------------------------
  const apiRoute = 'member/user/check-password';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['id'] = id;
    params['password'] = password;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  SetPasswordAsync
// ========================================

export async function SetPasswordAsync(id, password) {
  // ----------------------------------------
  const apiRoute = 'member/user/set-password';
  const apiMethod = 'PATCH';
  // ----------------------------------------
  var url, options, params, item;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['id'] = id;
    params['password'] = password;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, item);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  CreateUser
// ========================================

export async function CreateUserAsync() {
  const apiRoute = 'member/user';
  const apiMethod = 'POST';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  DeleteUser
// ========================================

export async function DeleteUserAsync(id) {
  const apiRoute = 'member/user';
  const apiMethod = 'DELETE';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['id'] = id;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  GetUser
// ========================================

export async function GetUserAsync(id) {
  const apiRoute = 'member/user';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['id'] = id;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  GetUserByUsername
// ========================================

export async function GetUserByUsernameAsync(username) {
  const apiRoute = 'member/user/username';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['username'] = username;
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, null);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
//  UpdateUser
// ========================================

export async function UpdateUserAsync(user) {
  const apiRoute = 'member/user';
  const apiMethod = 'PUT';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, user);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}
