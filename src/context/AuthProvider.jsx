import { createContext, useContext, useState } from "react";
import * as AM from "../managers/AuthManager";
import Globals from "../global/globals";

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
    return { ...ctxConfig };
  }

  function ctxInitializer() {
    const hasStoredGlobals = Globals.loadFromSessionStorage();

    const stored = sessionStorage.getItem("authContext");
    if (stored) {
      return JSON.parse(stored);
    }

    let c = getDefaultContext();
    c.sequence += 1;

    if (hasStoredGlobals && Globals.userInfo.id > 0) {
      c.isAuthenticated = true;
    }

    return c;
  }

  // ========================================
  //  init
  // ========================================

  function init() {
    let c = getDefaultContext();
    c.sequence += 1;
    setCtx(ctx);
    return true;
  }

  // ========================================
  //  changePassword
  // ========================================

  async function changePassword(currentPassword, newPassword, confirmPassword) {
    let flag = false;
    try {
      flag = await AM.ChangePassword(currentPassword, newPassword, confirmPassword);
    } catch (ex) {
      console.error("Change password error:", ex);
    }
    return flag;
  }

  // ========================================
  //  login
  // ========================================

  async function login(username, password) {
    let flag = false;
    try {
      const updatedCtx = {
        ...ctx,
        isAuthenticated: false,
        sequence: ctx.sequence + 1,
      };
      flag = await AM.Login(username, password);
      if (flag) {
        updatedCtx.isAuthenticated = true;
        updatedCtx.sequence + 1;
      }
      setCtx(updatedCtx);
    } catch (ex) {
      console.error("Login error:", ex);
    }
    return flag;
  }

  // ========================================
  //  logout
  // ========================================

  async function logout() {
    let flag = false;
    try {
      const updatedCtx = {
        ...ctx,
        isAuthenticated: false,
        sequence: ctx.sequence + 1,
      };
      flag = await AM.Logout();
      setCtx(updatedCtx);
    } catch (ex) {
      console.error("Logout error:", ex);
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

  async function register(username, password) {
    let flag = false;
    try {
      const updatedCtx = {
        ...ctx,
        isAuthenticated: false,
        sequence: ctx.sequence + 1,
      };
      flag = await AM.Register(username, password);
      if (flag) {
        updatedCtx.isAuthenticated = true;
        updatedCtx.sequence + 1;
      }
      setCtx(updatedCtx);
    } catch (ex) {
      console.error("Login error:", ex);
    }
    return flag;
  }

  // ========================================
  //  resetPassword
  // ========================================

  async function resetPassword() {
    let flag = false;
    try {
      flag = await AM.ResetPassword();
      if (flag) {
      }
    } catch (ex) {
      console.error("Login error:", ex);
    }
    return flag;
  }

  // ========================================
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        ctx,
        init,
        changePassword,
        login,
        logout,
        refreshToken,
        register,
        resetPassword,
      }}
    >
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
