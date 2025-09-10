import { store } from "../redux/store";
import * as ACO from "./ApiClientObjects";

// ========================================
//  appendAuthenticationHeader
// ========================================

export async function appendAuthenticationHeader(headers) {
  var token, bearer;
  // ----------------------------------------
  if (headers === undefined || headers === null) return;
  // ----------------------------------------
  token = store.getState().auth?.apiInfo?.bearerToken;
  if (token === undefined || token === null) return;
  bearer = "Bearer " + token;
  // ----------------------------------------
  headers.append("Authorization", bearer);
}

// ========================================
//  generateFetchOptions
// ========================================

export function generateFetchOptions(httpMethod, item) {
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
      options = {};
      options["method"] = method;
      // ----------------------------------------
      break;
    }
    case "PUT": {
      // ----------------------------------------
      headers.append("Accept", "*/*");
      headers.append("Accept-Encoding", "gzip");
      headers.append("Accept-Encoding", "deflate");
      headers.append("Content-Type", "application/json");
      // ----------------------------------------
      options = {};
      options["method"] = method;
      options["body"] = JSON.stringify(item);
      break;
    }
    case "PATCH": {
      headers.append("Accept", "*/*");
      headers.append("Accept-Encoding", "gzip");
      headers.append("Accept-Encoding", "deflate");
      headers.append("Content-Type", "application/json");
      // ----------------------------------------
      options = {};
      options["method"] = method;
      1;
      // ----------------------------------------
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
  const state = store.getState();
  var env = undefined;
  var baseUri = undefined;
  var fetchUri, fetchUrl;
  var searchParams;
  var key, value;

  // ----------------------------------------

  env = env = state.app.apiEnvironment;
  if (!env) {
    throw new Error("Redux app.apiEnvironment is not defined");
  }

  switch (env) {
    case "azure": {
      baseUri =
        "https://customdataservicesapi20240309210451.azurewebsites.net/api/";
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
  } catch {
    isJson = false;
  }
  // ----------------------------------------
  if (isJson) {
    tag = "data";
    if (Object.prototype.hasOwnProperty.call(item, tag)) {
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
  apiResult.statusCode = 500;
  apiResult.statusText = "Error";
  msg = "Route : " + route;
  apiResult.messages.push(msg);
  msg = error.name + " : " + error.message;
  apiResult.messages.push(msg);
  return apiResult;
}

// ========================================
//  processFetchResponse
// ========================================

export async function processFetchResponse(response) {
  // ----------------------------------------
  // http status 400 Bad Request
  // http status 401 Unauthorized
  // http status 404 Not found ( endpoint or api entity )
  // http status 500 Internal server error ( all api C# exceptions )
  //
  // headers.get(name) is case-insensitive
  // ----------------------------------------
  var contentLength, contentType;
  var apiResult, result;
  var image, blob;
  // ----------------------------------------

  contentLength = response.headers.get("content-length");
  if (contentLength === undefined || contentLength === null) {
    contentLength = 0;
  }

  // ----------------------------------------

  contentType = response.headers.get("content-type");
  if (contentType === undefined || contentType === null) {
    apiResult = new ACO.ApiResult();
    apiResult.statusCode = response.status;
    apiResult.statusText = "Error";
    apiResult.messages.push("Response header content-type undefined");
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("text/plain")) {
    result = await response.text();
    apiResult = new ACO.ApiResult();
    apiResult.data = result;
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("application/json")) {
    result = await response.json();
    return result;
  }

  // ----------------------------------------

  if (contentType.includes("application/problem+json")) {
    result = await response.json();
    apiResult = new ACO.ApiResult();
    apiResult.statusCode = response.status;
    apiResult.statusText = "Error";
    apiResult.messages.push(result.type);
    apiResult.messages.push(result.title);
    apiResult.messages.push(result.status);
    apiResult.messages.push(result.detail);
    apiResult.messages.push(result.instance);
    return apiResult;
  }

  // ----------------------------------------

  // File signatures from: https://en.wikipedia.org/wiki/List_of_file_signatures

  const jpgSignature = [0xff, 0xd8, 0xff, 0xe0];
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const gif89aSignature = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];

  if (contentType.includes("image")) {
    image = await response.bytes();
    if (
      image
        .slice(0, jpgSignature.length)
        .every((byte, index) => byte === jpgSignature[index])
    ) {
      console.log(`JPG signature: FF D8 FF E0`);
    } else if (
      image
        .slice(0, pngSignature.length)
        .every((byte, index) => byte === pngSignature[index])
    ) {
      console.log(`PNG signature: 89 50 4E 47 0D 0A 1A 0A`);
    } else if (
      image
        .slice(0, gif89aSignature.length)
        .every((byte, index) => byte === gif89aSignature[index])
    ) {
      console.log(`GIF (GIF89a) signature: 47 49 46 38 39 61`);
    } else {
      console.log("Unknown format");
    }

    apiResult = new ACO.ApiResult();
    apiResult.data = image;
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("blob")) {
    blob = await response.blob();

    // const objectURL = URL.createObjectURL(blob);
    // myImage.src = objectURL;

    apiResult = new ACO.ApiResult();
    apiResult.data = blob;
    return apiResult;
  }

  // ----------------------------------------

  if (contentType.includes("array")) {
    result = await response.arrayBuffer();
    apiResult = new ACO.ApiResult();
    apiResult.data = result;
    return apiResult;
  }
}

// ========================================
//  arrayBufferToBase64
//
// Example:
//
// let textEncoder = new TextEncoder();
// let myBuffer = textEncoder.encode("Hello, ArrayBuffer!");
// let base64Encoded = arrayBufferToBase64(myBuffer.buffer);
// console.log(base64Encoded); // Output will be "SGVsbG8sIEFycmF5QnVmZmVyIQ=="
// ========================================

export function arrayBufferToBase64(arrayBuf) {
  let uint8Array = new Uint8Array(arrayBuf);
  let binaryString = "";
  for (let i = 0; i < uint8Array.byteLength; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  let base64String = btoa(binaryString);
  return base64String;
}

// ----------------------------------------
// createImageFileURL
// ----------------------------------------

export function createImageFileURL(imageFile) {
  let dataUrl = "";
  if (imageFile.data.length > 0) {
    dataUrl += "data:";
    dataUrl += imageFile.contentType;
    dataUrl += ";";
    dataUrl += "base64,";
    dataUrl += imageFile.data;
  }
  return dataUrl;
}
