import * as ACM from './ApiClientMethods';

// ========================================
// ----------------------------------------
//  ApiClient Info Controller endpoints
// ----------------------------------------
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
//  EchoAsync
// ========================================

export async function EchoAsync(buf) {
  // ----------------------------------------
  const apiRoute = 'info/echo';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['buf'] = buf;
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
//  GetVersionAsync
// ========================================

export async function GetVersionAsync() {
  // ----------------------------------------
  const apiRoute = 'info/get-version';
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
//  PingAsync
// ========================================

export async function PingAsync() {
  // ----------------------------------------
  const apiRoute = 'info/ping';
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
