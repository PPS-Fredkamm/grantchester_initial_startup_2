import * as ACM from './ApiClientMethods';

// ========================================
// ----------------------------------------
//  ApiClient CompanyUser Controller endpoints
// ----------------------------------------
// ========================================

// ========================================
//  GetCompanyUser
// ========================================

export async function GetCompanyUserAsync(companyID, userID) {
  const apiRoute = 'company-user';
  const apiMethod = 'GET';
  // ----------------------------------------
  var url, options, params;
  var response, result;
  // ----------------------------------------
  try {
    params = {};
    params['companyID'] = companyID;
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

