import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import RequireAuthentication from "./components/auth/RequireAuthentication.jsx";
import AdminAuthentication from "./components/auth/AdminAuthentication.jsx";

import NotFound from "./pages/public/notFound/NotFound.jsx";
import ErrorHandler from "./pages/ErrorHandler/ErrorHandler.jsx";
import MainLayout from "./layouts/main/MainLayout.jsx";
import MemberLayout from "./layouts/member/MemberLayout.jsx";
import AdminLayout from "./layouts/admin/AdminLayout.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import HowItWorks from "./components/forUniversities/ForUniversityHowItWorks/HowItWorks.jsx";

// Lazy-loaded route components
const Home = lazy(() => import("./pages/public/home/Home.jsx"));
const Login = lazy(() => import("./pages/public/login/Login.jsx"));
const Signup = lazy(() => import("./pages/public/signup/Signup.jsx"));
const HowItWorks = lazy(() => import("./pages/public/howItWorks/HowItWorks.jsx"));
const UnderConstruction = lazy(() =>
  import("./components/userInterface/placeholder/UnderConstruction.jsx")
);
const WhyDonate = lazy(() => import("./pages/public/howItWorks/whyDonate/WhyDonate.jsx"));
const ForDonors = lazy(() => import("./pages/public/howItWorks/forDonors/ForDonors.jsx"));
const ForUniversities = lazy(() =>
  import("./pages/public/howItWorks/forUniversities/ForUniversities.jsx")
);
const FAQPage = lazy(() => import("./pages/public/FAQ/FAQPage.jsx"));

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
            <Route path="how-it-works" element={<HowItWorks />} />
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

            {/* --------- PROTECTED ADMIN ROUTES --------- */}
            <Route
              path="admin"
              element={
                <AdminAuthentication>
                  <AdminLayout />
                </AdminAuthentication>
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
