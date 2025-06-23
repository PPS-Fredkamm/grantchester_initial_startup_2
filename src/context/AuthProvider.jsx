import { createContext, useContext, useState } from "react";
import * as AM from "../managers/AuthManager";

import ctxConfig from "./AuthContext.json";

// ========================================
// Create a context object
// ========================================

const AuthContext = createContext();

// ========================================
// Create a custom hook to consume the context object in wrapped components.
// ========================================

export const useAuthContext = () => useContext(AuthContext);

// ========================================
// Create a component that uses Context<any>.Provider to provide the value to its children.
// ========================================

export default function AuthProvider({ children }) {
  const [ctx, setCtx] = useState(() => ctxInitializer());

  function getDefaultContext() {
    let c = ctxConfig;
    return c;
  }

  function ctxInitializer() {
    let c = getDefaultContext();
    c.sequence += 1;
    return c;
  }

  // ========================================
  // ========================================

  function init() {
    let c = getDefaultContext();
    c.sequence += 1;
    setCtx(ctx);
    return true;
  }

  // ========================================
  //  login
  // ========================================

  async function login(username, password) {
    var flag = false;
    try {
      ctx.sequence += 1;
      ctx.isAuthenticated = false;
      flag = await AM.Login(username, password);
      if (flag) {
        ctx.isAuthenticated = true;
        ctx.identityName = username;
      }
    } catch (ex) {
      console.error("Error: ", ex);
    } finally {
      setCtx({ ...ctx });
    }
    return flag;
  }

  // ========================================
  //  logout
  // ========================================

  function logout() {
    var flag = false;
    try {
      ctx.sequence += 1;
      flag = AM.Logout();
      ctx.isAuthenticated = false;
      flag = true;
    } catch (ex) {
      console.error("Error: ", ex);
    } finally {
      setCtx({ ...ctx });
    }
    return flag;   
  }

  // ========================================
  //  refreshToken
  // ========================================

  function refreshToken() {
    return false;
  }

  // ========================================
  //  register
  // ========================================

  function register(username, password) {
    return false;
  }

  // ========================================
  //  resetPassword
  // ========================================

  function resetPassword(oldPassword, newPassword, newPassword2) {
    return false;
  }

  // ========================================
  // ========================================

  return (
    <AuthContext.Provider value={{ ctx, init, register, login, logout, resetPassword, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// ========================================
// React Context provides a way to share values like state, functions, or any data,
// between components without explicitly passing them through props at every level.
// It is useful for data that can be considered "global" for a tree of React components,
// such as the current user, theme, or locale.
// ========================================
