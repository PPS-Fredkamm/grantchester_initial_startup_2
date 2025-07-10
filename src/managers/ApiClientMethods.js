import Globals from "../global/globals";

import * as ACO from "./ApiClientObjects";

// ========================================
//  appendAuthenticationHeader
// ========================================

export async function appendAuthenticationHeader(headers) {
  var token, bearer;
  // ----------------------------------------
  if (headers === undefined || headers === null) return;
  // ----------------------------------------
  token = Globals.userInfo.bearerToken;
  if (token === undefined || token === null) return;
  bearer = "Bearer " + token;
  // ----------------------------------------
  headers.append("Authorization", bearer);
}

// ========================================
//  generateFetchOptions
// ========================================

export function generateFetchOptions(httpMethod) {
  var options = null;
  const headers = new Headers();
  // ----------------------------------------
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
      headers.append("Accept", "application/json");
      headers.append("Accept", "text/plain");
      headers.append("Accept", "*/*");
      headers.append("Accept-Encoding", "gzip");
      headers.append("Accept-Encoding", "deflate");
      // ----------------------------------------
      //   headers.append("Content-Type", "application/json");
      //   headers.append("Access-Control-Allow-Origin", "*");
      // ----------------------------------------
      options = {};
      options["method"] = method;
      //   options["mode"] = "cors";
      //   options["credentials"] = "include";
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

  let array = Array.from(headers);
  if (array.length !== 0) {
    options["headers"] = headers;
  }

  return options;
}

// ========================================
//  generateFetchUrl
// ========================================

export function generateFetchUrl(path, params) {
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
//  getApiResultData
// ========================================

export function getApiResultData(item) {
  let data = null;
  let isJson, buf, tag;
  // ----------------------------------------
  isJson = true;
  try {
    buf = JSON.stringify(item);
    JSON.parse(buf);
  } catch (error) {
    isJson = false;
  }
  // ----------------------------------------
  if (isJson) {
    tag = "data";
    if (item.hasOwnProperty(tag)) {
      data = item[tag];
    }
  }
  // ----------------------------------------
  return data;
}

// ========================================
//  processFetchError
// ========================================

export async function processFetchError(route, error) {
  var msg;
  var apiResult = new ACO.ApiResult();
  apiResult.StatusCode = 500;
  apiResult.StatusText = "Error";
  msg = "Route : " + route;
  apiResult.Messages.push(msg);
  msg = error.name + " : " + error.message;
  apiResult.Messages.push(msg);
  return apiResult;
}

// ========================================
//  processFetchResponse
// ========================================

export async function processFetchResponse(response) {
  // response.status = 404 Not found ( endpoint or api entity )
  // response.status = 500 Internal server error ( all api C# exceptions )
  //
  //
  //
  //
  //
  // ----------------------------------------
  var contentLength, contentType;
  var apiResult, result;
  var image, blob;
  // ----------------------------------------

  contentLength = response.headers.get("content-length");
  if (contentLength === 0) {
    apiResult = new ACO.ApiResult();
    apiResult.StatusCode = response.status;
    apiResult.StatusText = "Error";
    apiResult.Messages.push("Response header content-length zero");
    return apiResult;
  }

  // ----------------------------------------
  //   if (contentType !== undefined && contentType !== null)
  // ----------------------------------------

  contentType = response.headers.get("content-type");
  if (contentType === undefined || contentType === null) {
    apiResult = new ACO.ApiResult();
    apiResult.StatusCode = response.status;
    apiResult.StatusText = "Error";
    apiResult.Messages.push("Response header content-type undefined");
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("text/plain")) {
    result = await response.text();
    apiResult = new ACO.ApiResult();
    apiResult.Data = result;
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("application/json")) {
    result = await response.json();
    return result;
  }

  // ----------------------------------------

  // File signatures from: https://en.wikipedia.org/wiki/List_of_file_signatures

  const jpgSignature = [0xff, 0xd8, 0xff, 0xe0];
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const gif89aSignature = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];

  if (contentType.includes("image")) {
    image = await response.bytes();
    if (image.slice(0, jpgSignature.length).every((byte, index) => byte === jpgSignature[index])) {
      log(`JPG signature: FF D8 FF E0`);
    } else if (image.slice(0, pngSignature.length).every((byte, index) => byte === pngSignature[index])) {
      log(`PNG signature: 89 50 4E 47 0D 0A 1A 0A`);
    } else if (image.slice(0, gif89aSignature.length).every((byte, index) => byte === gif89aSignature[index])) {
      log(`GIF (GIF89a) signature: 47 49 46 38 39 61`);
    } else {
      log("Unknown format");
    }

    apiResult = new ACO.ApiResult();
    apiResult.Data = image;
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("blob")) {
    blob = await response.blob();

    // const objectURL = URL.createObjectURL(blob);
    // myImage.src = objectURL;

    apiResult = new ACO.ApiResult();
    apiResult.Data = blob;
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("array")) {
    result = await response.arrayBuffer();
    apiResult = new ACO.ApiResult();
    apiResult.Data = result;
    return apiResult;
  }
}
