import * as ACM from './ApiClientMethods';

// ========================================
// ========================================
//  Data Controller endpoints
// ========================================
// ========================================

// ----------------------------------------
//  GetDatetimeAsync
// ----------------------------------------

export async function GetDatetimeAsync() {
  // ----------------------------------------
  const apiRoute = 'data/get-datetime';
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

// ----------------------------------------
//  GetDatetimeBearerAsync
// ----------------------------------------

export async function GetDatetimeBearerAsync() {
  // ----------------------------------------
  const apiRoute = 'data/get-datetime-bearer';
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
// ========================================
//  Info Controller endpoints
// ========================================
// ========================================

// ========================================
//  DivideByZeroAsync
// ========================================

export async function DivideByZeroAsync() {
  // ----------------------------------------
  const apiRoute = 'info/divide-by-zero';
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
//  NoSuchRouteAsync
// ========================================

export async function NoSuchRouteAsync() {
  // ----------------------------------------
  const apiRoute = 'info/no-such-route';
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
// ========================================
//  Security Controller endpoints
// ========================================
// ========================================

// ========================================
//  GenerateGuidAsync
// ========================================

export async function GenerateGuidAsync() {
  // ----------------------------------------
  const apiRoute = 'security/generate-guid';
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
// ========================================
//  Member Controller Address endpoints
// ========================================
// ========================================

// ========================================
//  CreateAddress
// ========================================

export async function CreateAddressAsync() {
  const apiRoute = 'member/address';
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
//  GetAddress
// ========================================

export async function GetAddressAsync(id) {
  const apiRoute = 'member/address';
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
//  UpdateAddress
// ========================================

export async function UpdateAddressAsync(address) {
  const apiRoute = 'member/address';
  const apiMethod = 'PUT';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, address);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

// ========================================
// ========================================
//  Member Controller ImageFile endpoints
// ========================================
// ========================================

// ========================================
//  CreateImageFile
// ========================================

export async function CreateImageFileAsync() {
  const apiRoute = 'member/imagefile';
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
//  GetImageFile
// ========================================

export async function GetImageFileAsync(id) {
  const apiRoute = 'member/imagefile';
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
//  UpdateImageFile
// ========================================

export async function UpdateImageFileAsync(imageFile) {
  const apiRoute = 'member/imagefile';
  const apiMethod = 'PUT';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    url = ACM.generateFetchUrl(apiRoute, params);
    options = ACM.generateFetchOptions(apiMethod, imageFile);
    response = await fetch(url, options);
    result = await ACM.processFetchResponse(response);
  } catch (error) {
    result = await ACM.processFetchError(apiRoute, error);
  }
  return result;
}

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
//  Member Controller State endpoints
// ========================================
// ========================================

// ========================================
//  GetStates
// ========================================

export async function GetStatesAsync() {
  const apiRoute = 'member/state/list';
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

// ========================================
// ========================================
// ========================================
// ========================================

export async function GetDataFile(id) {
  const apiRoute = 'data/get=data=file';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, promise, data;
  // ----------------------------------------
  try {
    // let url = new URL("https://localhost:7201/api/Data/get-data-file");
    // url.search = new URLSearchParams("id=1");
    // let options = {
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/octet-stream",
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // };
    params = {};
    params['id'] = id;
    url = generateFetchUrl(apiRoute, params);
    options = generateFetchOptions(apiMethod, null);
    // ----------------------------------------
    response = await fetch(url, options);
    if (!response.ok) {
      let msg = 'Response error' + resp.status;
      throw new Error(msg);
    }
    // ----------------------------------------
    let arrBuf = await resp.arrayBuffer();
    let arrDbl = new Float64Array(arrBuf);

    let cnt = arrDbl.length / 2;
    let ofs = cnt;

    let xData = arrDbl.slice(0, cnt);
    let yData = arrDbl.slice(ofs);

    console.log('arrBuf length ' + arrBuf.byteLength);
    console.log('xData length ' + xData.byteLength);
    console.log('yData length ' + yData.byteLength);
  } catch (err) {
    console.log('Error ' + err);
  }
}

// ========================================
// ========================================

export async function GetWeatherForecast() {
  try {
    let url = new URL('https://localhost:7201/api/WeatherForecast');
    // url.search = new URLSearchParams("id=1");

    let options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
      },
    };

    let resp = await fetch(url, options);

    // if (!resp.ok) {
    //   let msg = "Response error " + resp.status;
    //   throw new Error(msg);
    // }

    let json = await resp.json();

    console.log(JSON.stringify(json));
  } catch (err) {
    console.log('Error ' + err);
  }
}
