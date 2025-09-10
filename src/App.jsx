import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import RequireAuthentication from "./components/auth/RequireAuthentication.jsx";

import NotFound from "./layouts/notFound/NotFound.jsx";
import ErrorHandler from "./pages/ErrorHandler/ErrorHandler.jsx";
import MainLayout from "./layouts/main/MainLayout.jsx";
import MemberLayout from "./layouts/member/MemberLayout.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Lazy-loaded route components
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Login = lazy(() => import("./pages/login/Login.jsx"));
const Signup = lazy(() => import("./pages/signup/Signup.jsx"));
const UnderConstruction = lazy(() =>
  import("./pages/placeholder/UnderConstruction.jsx")
);
const WhyDonate = lazy(() => import("./pages/whyDonate/WhyDonate.jsx"));
const ForDonors = lazy(() => import("./pages/forDonors/ForDonors.jsx"));
const ForUniversities = lazy(() =>
  import("./pages/forUniversities/ForUniversities.jsx")
);
const FAQPage = lazy(() => import("./pages/FAQ/FaqPage.jsx"));

export default function App() {
  const documentTitle = useSelector((state) => state.app.documentTitle);

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <div>Loading...</div>
            </div>
          </div>
        }
      >
        <Routes>
          {/* --------- PUBLIC ROUTES --------- */}
          <Route
            path="/"
            element={<MainLayout />}
            errorElement={<ErrorHandler />}
          >
            <Route index element={<Home />} />
            <Route path="why-donate" element={<WhyDonate />} />
            <Route path="for-donors" element={<ForDonors />} />
            <Route path="for-universities" element={<ForUniversities />} />
            <Route
              path="partners"
              element={<UnderConstruction title="Partners Page" />}
            />
            <Route path="FAQ" element={<FAQPage title="FAQ Page" />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* --------- PROTECTED MEMBER ROUTES --------- */}
            <Route
              path=":type/:option?"
              element={
                <RequireAuthentication>
                  <MemberLayout />
                </RequireAuthentication>
              }
            />

            {/* --------- 404 / NOT FOUND --------- */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
