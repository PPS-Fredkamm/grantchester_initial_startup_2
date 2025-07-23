import { Outlet } from "react-router-dom";

import NavBar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer";
import EnvIndicator from "../../components/userInterface/EnvIndicator";

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
