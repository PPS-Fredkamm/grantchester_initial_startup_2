import { Outlet } from "react-router-dom";

import Footer from "../../components/public/footer/Footer";
import EnvIndicator from "../../components/userInterface/EnvIndicator/EnvIndicator";
import MarketingNav from "../../components/marketing/navBar/MarketingNav";
import "./MarketingLayout.css";

export default function MarketingLayout() {
  return (
    <div className="app-container">
      <MarketingNav />
      <main className="outlet-container">
        <Outlet />
        <EnvIndicator />
      </main>
      <Footer />
    </div>
  );
}
