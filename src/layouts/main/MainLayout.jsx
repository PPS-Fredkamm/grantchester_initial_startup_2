import { Outlet } from "react-router-dom";

import NavBar from "../../components/public/navbar/Navbar"
import Footer from "../../components/public/footer/Footer";
import EnvIndicator from "../../components/userInterface/EnvIndicator/EnvIndicator";

import "./MainLayout.css";

// ========================================
// ========================================

export default function MainLayout() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="outlet-container">
        <Outlet />
        <EnvIndicator />
      </main>
      <Footer />
    </div>
  );
}
