import Globals from "../global/globals";

// ========================================
//  generateFetchUrl
// ========================================

function generateFetchUrl(path, params) {
  var env = undefined;
  var baseUri = undefined;
  var fetchUri, fetchUrl;
  var searchParams;
  var key, value;

  // ----------------------------------------

  env = Globals.apiEnvironment;
  if (env === undefined || env === null) {
    throw new Error("Global apiEnvironment is not defined");
  }

  switch (env) {
    case "azure": {
      baseUri = "https://customdataservicesapi20240309210451.azurewebsites.net/api/";
      break;
    }
    case "dev": {
      baseUri = "https://localhost:7201/api/";
      break;
    }
    default: {
      alert("api environment is not defined");
    }
  }

  if (baseUri !== undefined) {
    if (!baseUri.endsWith("/")) baseUri += "/";
    if (path.startsWith("/")) path = path.slice(1);
    fetchUri = baseUri + path;
  }

  // ----------------------------------------

  if (params !== undefined && params !== null) {
    searchParams = new URLSearchParams();
    for (key in params) {
      value = params[key];
      searchParams.append(key, value);
    }

    fetchUri += "?";
    fetchUri += searchParams.toString();
  }

  // ----------------------------------------

  fetchUrl = new URL(fetchUri);
  return fetchUrl;
}

// ========================================
//  generateFetchOptions
// ========================================

function generateFetchOptions(httpMethod) {
  var options = null;
  var headers;
  // ----------------------------------------
  headers = new Headers();
  appendAuthenticationHeader(headers);
  // ----------------------------------------
  let method = httpMethod.toUpperCase();
  switch (method) {
    case "GET": {
      // ----------------------------------------
      headers.append("Accept", "application/json");
      headers.append("Accept", "text/plain");
      headers.append("Accept", "*/*");
      headers.append("Accept-Encoding", "gzip");
      headers.append("Accept-Encoding", "deflate");
      // ----------------------------------------
      options = {};
      options["method"] = method;
      // ----------------------------------------
      break;
    }
    case "POST": {
      // ----------------------------------------
      headers.append("Content-Type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
      // ----------------------------------------
      options = {};
      options["method"] = method;
      options["mode"] = "cors";
      options["credentials"] = "include";
      // ----------------------------------------
      break;
    }
    case "PUT": {
      break;
    }
    case "PATCH": {
      break;
    }
    case "DELETE": {
      break;
    }
    case "OPTIONS": {
      break;
    }
    case "HEAD": {
      break;
    }
    case "TRACE": {
      break;
    }
    default: {
      alert("httpMethod not supported");
    }
  }

  if (headers.entries.length !== 0) {
    options["headers"] = headers;
  }

  return options;
}

// ========================================
//  appendAuthenticationHeader
// ========================================

function appendAuthenticationHeader(headers) {
  var key, token, bearer;
  // ----------------------------------------
  if (headers === undefined || headers === null) return;
  // ----------------------------------------
  key = Globals.localStorage.accessTokenKey;
  token = localStorage.getItem(key);
  if (token === undefined || token === null) return;
  bearer = "Bearer " + token;
  // ----------------------------------------
  headers.append("Authorization", bearer);
}

// ========================================
//  getApiResponseData
// ========================================

function getApiResponseData(item) {
  let flag, tag, val;
  let data = null;
  // ----------------------------------------
  flag = true;
  // ----------------------------------------
  if (flag) {
    tag = "statusCode";
    if (item.hasOwnProperty(tag)) {
      val = item[tag];
      console.log("Response statusCode: ", val);
      if (val !== 200) {
        flag = false;
      }
    }
  }
  // ----------------------------------------
  if (flag) {
    tag = "data";
    if (item.hasOwnProperty(tag)) {
      data = item[tag];
    }
  }
  // ----------------------------------------
  console.log("Response data: ", data);
  return data;
}

// ========================================
//  GenerateGuid
// ========================================

export async function GenerateGuid() {
  const apiRoute = "security/generate-guid";
  const apiMethod = "GET";
  // ----------------------------------------
  var url, options, params;
  var response, promise, data;
  try {
    // ----------------------------------------
    url = generateFetchUrl(apiRoute, params);
    options = generateFetchOptions(apiMethod);
    // ----------------------------------------
    response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    promise = await response.json();
    data = getApiResponseData(promise);
  } catch (ex) {
    console.log(`Api ${apiRoute} error`, ex);
  } finally {
    return data;
  }
}

// ========================================
//  GetDatetime
// ========================================

export async function GetDatetime() {
  const apiRoute = "data/get-datetime";
  const apiMethod = "GET";
  // ----------------------------------------
  var url, options, params;
  var response, promise, data;
  try {
    // ----------------------------------------
    url = generateFetchUrl(apiRoute, params);
    options = generateFetchOptions(apiMethod);
    // ----------------------------------------
    response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    promise = await response.json();
    data = getApiResponseData(promise);
  } catch (ex) {
    console.log(`Api ${apiRoute} error`, ex);
  } finally {
    return data;
  }
}

// ========================================
//  GetDatetimeBearer
// ========================================

export async function GetDatetimeBearer() {
  const apiRoute = "data/get-datetime-bearer";
  const apiMethod = "GET";
  // ----------------------------------------
  var url, options, params;
  var response, promise, data;
  try {
    // ----------------------------------------
    url = generateFetchUrl(apiRoute, params);
    options = generateFetchOptions(apiMethod);
    // ----------------------------------------
    response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    promise = await response.json();
    data = getApiResponseData(promise);
  } catch (ex) {
    console.log(`Api ${apiRoute} error`, ex);
  } finally {
    return data;
  }
}

// ========================================
//  AcquireToken
// ========================================

export function AcquireToken(username, password) {
  const apiRoute = "user/acquire-token";
  const apiMethod = "GET";
  // ----------------------------------------
  var url, options, params;
  var data;
  // ----------------------------------------
  params = {};
  params["username"] = username;
  params["password"] = password;
  url = generateFetchUrl(apiRoute, params);
  options = generateFetchOptions(apiMethod);
  // ----------------------------------------
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
        });
      }
      return response.json();
    })
    .then((promise) => {
      data = getApiResponseData(promise);
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
    });
}

// ========================================
//  AcquireTokenAsync
// ========================================

export async function AcquireTokenAsync(username, password) {
  const apiRoute = "user/acquire-token";
  const apiMethod = "GET";
  // ----------------------------------------
  var url, options, params;
  var response, promise, data;
  try {
    data = null;
    params = {};
    params["username"] = username;
    params["password"] = password;
    url = generateFetchUrl(apiRoute, params);
    options = generateFetchOptions(apiMethod);
    // ----------------------------------------
    response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    promise = await response.json();
    data = getApiResponseData(promise);
    return data;
  } catch (ex) {
    console.log(`Api ${apiRoute} error`, ex);
    throw ex;
  }
}

// ========================================
// ========================================

// export function fetchDataSync(url) {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json(); // or response.text() for plain text response
//     })
//     .then((data) => {
//       // Process the response data
//       console.log(data);
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the request
//       console.error("Error:", error);
//     });
// }

// ========================================
// ========================================

// export async function fetchDataAsync(url) {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json(); // or response.text() for plain text response

//     // Process the response data
//     console.log(data);
//   } catch (error) {
//     // Handle any errors that occurred during the request
//     console.error("Error:", error);
//   }
// }

// ========================================
// const tmpCtx = useContext(UserContext);
// const [userCtx, setUserCtx] = useState("");

// useEffect(() => {
//   // const url = new URL("https://localhost:7201/api/user/get-user-profile");

//   // const opt = {
//   //   method: "GET",
//   //   mode: "cors",
//   //   credentials: "include",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     "Access-Control-Allow-Origin": "*",
//   //   },
//   // };

//   async function getUserCtx() {
//     try {
//       // const resp = await fetch(url, opt);
//       // const json = await resp.json();
//       tmpCtx.sequence += 1;
//       setUserCtx(tmpCtx);
//     } catch (ex) {
//       alert("getUserCtx error " + ex);
//     }
//   }

//   getUserCtx();
// }, [tmpCtx]);
// ========================================

// ========================================
// const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
// const data = await response.json();
// console.log(data);
// ========================================

// ========================================
// ========================================

// export function GetDefaultProfile() {
//   try {
//     const url = new URL(baseApiUserUrl + "get-default-profile");

//     const opt = {
//       method: "GET",
//       mode: "cors",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     };

//     const resp = fetch(url, opt);
//     const json = resp.json();
//     return json;
//   } catch (ex) {
//     console.log("GetDefaultProfile error", ex);
//   }

//   return null;
// }

// ========================================
// ========================================

// export async function GetUserProfile() {
//   try {
//     const url = new URL(baseApiUserUrl + "get-user-profile");

//     const options = {
//       method: "GET",
//       mode: "cors",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     };

//     const resp = await fetch(url, options);
//     const json = await resp.json();
//     return json;
//   } catch (ex) {
//     console.log("GetUserProfile error", ex);
//   }

//   return null;
// }
