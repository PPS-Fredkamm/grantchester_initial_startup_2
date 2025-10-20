import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import RequireAuthentication from "./components/auth/RequireAuthentication.jsx";
import AdminAuthentication from "./components/auth/AdminAuthentication.jsx";

import NotFound from "./pages/public/notFound/NotFound.jsx";
import ErrorHandler from "./pages/ErrorHandler/ErrorHandler.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MemberLayout from "./layouts/MemberLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import MarketingLayout from "./layouts/MarketingLayout.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

// Lazy-loaded route components
const Home = lazy(() => import("./pages/public/home/Home.jsx"));
const MarketingHome = lazy(() =>
  import("./pages/marketing/home/MarketingHome.jsx")
);
const Login = lazy(() => import("./pages/public/login/Login.jsx"));
const Signup = lazy(() => import("./pages/public/signup/Signup.jsx"));
const HowItWorks = lazy(() =>
  import("./pages/public/howItWorks/HowItWorks.jsx")
);
const MarketingHowItWorks = lazy(() =>
  import("./pages/marketing/how-it-works/HowItWorks.jsx")
);
const ForUniversities = lazy(() =>
  import("./pages/marketing/how-it-works/forUniversities/ForUniversities.jsx")
);
const ForDonors = lazy(() =>
  import("./pages/marketing/how-it-works/forDonors/ForDonors.jsx")
);
const UnderConstruction = lazy(() =>
  import("./components/userInterface/placeholder/UnderConstruction.jsx")
);
const FAQPage = lazy(() => import("./pages/public/FAQ/FAQPage.jsx"));

export default function App() {
  const app = useSelector((state) => state.app);

  useEffect(() => {
    document.title = app.documentTitle;
  }, [app.documentTitle]);

  if (app.viewMode === "marketing") {
    // Only show marketing layout, no login/dashboard routes
    return (
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<MarketingLayout />}
            errorElement={<ErrorHandler />}
          >
            <Route index element={<MarketingHome />} />
            <Route path="how-it-works" element={<MarketingHowItWorks />} />
            <Route path="for-universities" element={<ForUniversities />} />
            <Route path="for-donors" element={<ForDonors />} />
            <Route path="page1" element={<UnderConstruction title="page1" />} />
            <Route path="page2" element={<UnderConstruction title="page2" />} />
            <Route path="page3" element={<UnderConstruction title="page3" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-container">
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
              path="admin/:option?"
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
