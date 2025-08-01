import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ApplProvider from "./context/ApplProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApplProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApplProvider>
    </BrowserRouter>
  </StrictMode>
);