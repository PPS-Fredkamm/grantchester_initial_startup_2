import Globals from "../global/globals";
import * as apiClient from "./ApiClient";

// ========================================
//  Login
// ========================================

export async function Login(username, password) {
  var flag = false;
  var key, token;
  try {
    key = Globals.localStorage.accessTokenKey;
    localStorage.removeItem(key);
    token = await apiClient.AcquireTokenAsync(username, password);
    if (token !== undefined && token !== null) {
      localStorage.setItem(key, token);
      flag = true;
    }
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
//  Logout
// ========================================

export function Logout() {
  var flag = false;
  var key, token;
  try {
    key = Globals.localStorage.accessTokenKey;
    localStorage.removeItem(key);
    flag = true;
  } catch (ex) {
    console.error("Error: ", ex);
  }
  return flag;
}

// ========================================
// ========================================

export function GetCurrentID1() {
  let val1;
  let val2;
  let obj = {};
  obj["username"] = "bob";
  obj["password"] = "secret";

  val1 = JSON.stringify(obj);
  val2 = JSON.parse(val1);

  return true;
}

export function GetCurrentID2() {
  return json({ currentID: 888 });
}
