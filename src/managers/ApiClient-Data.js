import * as ACM from './ApiClientMethods';

// ========================================
// ----------------------------------------
//  ApiClient Data Controller endpoints
// ----------------------------------------
// ========================================

// ========================================
//  GenerateTextAsync
// ========================================

export async function GenerateTextAsync() {
  // ----------------------------------------
  const apiRoute = 'data/generate-text';
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
//  GetDataFileAsync
// ========================================

export async function GetDataFileAsync(id) {
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
//  GetDatetimeAsync
// ========================================

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

// ========================================
//  GetDatetimeBearerAsync
// ========================================

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
