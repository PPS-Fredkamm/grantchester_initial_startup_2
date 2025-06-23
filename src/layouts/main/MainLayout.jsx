import { Outlet } from "react-router-dom";

import NavBar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer";

import "./MainLayout.css";

// ========================================
// ========================================

export default function MainLayout() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="outlet-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
