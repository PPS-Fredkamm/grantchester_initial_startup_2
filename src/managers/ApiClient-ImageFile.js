import * as ACM from './ApiClientMethods';

// ========================================
// ----------------------------------------
//  ApiClient ImageFile Controller endpoints
// ----------------------------------------
// ========================================

// ========================================
//  CreateImageFile
// ========================================

export async function CreateImageFileAsync() {
  const apiRoute = 'imagefile';
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
  const apiRoute = 'imagefile';
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
  const apiRoute = 'imagefile';
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
