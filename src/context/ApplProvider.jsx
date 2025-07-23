import { createContext, useContext, useState } from "react";

import Globals from "../global/globals";
import ctxConfig from "./ApplContext.json";

// ========================================
// Create a context object
// ========================================

const ApplContext = createContext();

// ========================================
// Create a custom hook to consume the context object in wrapped components.
// ========================================

export const useApplContext = () => useContext(ApplContext);

// ========================================
// Create a component that uses Context<any>.Provider to provide the value to its children.
// ========================================

export default function ApplProvider({ children }) {
  const [ctx, setCtx] = useState(() => ctxInitializer());

  function getDefaultContext() {
    let c = ctxConfig;
    return c;
  }

  function ctxInitializer() {
    let c = getDefaultContext();
    c.sequence += 1;
    setGlobals(c);
    return c;
  }

  function setGlobals(c) {
    Globals.initApiInfo();
    Globals.apiInfo.apiEnvironment = c.apiEnvironment;
  }

  // ========================================

  const init = () => {
    let c = getDefaultContext();
    c.sequence += 1;
    setCtx(c);
    setGlobals(c);
    return true;
  };

  // ========================================

  return <ApplContext.Provider value={{ ctx, init }}>{children}</ApplContext.Provider>;
}

// ========================================
// React Context provides a way to share values like state, functions, or any data,
// between components without explicitly passing them through props at every level.
// It is useful for data that can be considered "global" for a tree of React components,
// such as the current user, theme, or locale.
// ========================================
