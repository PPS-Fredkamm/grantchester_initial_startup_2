import * as ACM from './ApiClientMethods';

// ========================================
// ----------------------------------------
//  ApiClient Security Controller endpoints
// ----------------------------------------
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

