import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useApplContext } from './context/ApplProvider.jsx';

import RequireAuthentication from './components/auth/RequireAuthentication.jsx';

import NotFound from './layouts/notFound/NotFound.jsx';
import ErrorHandler from './pages/ErrorHandler/ErrorHandler.jsx';
import MainLayout from './layouts/main/MainLayout.jsx';
import MemberLayout from './layouts/member/MemberLayout.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Home from './pages/home/Home.jsx';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const applCtx = useApplContext();

  useEffect(() => {
    document.title = applCtx.ctx.documentTitle;
  }, [applCtx]);

  return (
    <div className="app">
      <Routes>
        {/* --------- PUBLIC ROUTES --------- */}
        <Route
          path="/"
          element={<MainLayout />}
          errorElement={<ErrorHandler />}
        >
          <Route index element={<Home />} />
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
    </div>
  );
}
