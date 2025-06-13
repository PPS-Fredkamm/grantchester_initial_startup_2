import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ErrorPage from './components/ErrorPage';
import ProtectedRoute from './Data/ProtectedRoutes';
import Profile from './components/Profile/Profile';
import Company from './components/CompanyDashboard/Company';

import University from './components/University/University';
import { UserProvider } from './Data/UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {path: 'university',
        element: <University />
      },
    
      
      {
        path: 'company',
        element: <Company />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
        
          // Add more protected routes here
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
