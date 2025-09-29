import * as ACM from './ApiClientMethods';

// ========================================
// ----------------------------------------
//  ApiClient Company Controller endpoints
// ----------------------------------------
// ========================================

// ========================================
//  GetCompany
// ========================================

export async function GetCompanyAsync(id) {
  const apiRoute = 'company';
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
