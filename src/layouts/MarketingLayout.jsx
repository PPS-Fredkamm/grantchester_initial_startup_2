import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Footer from "../components/public/footer/Footer";
import EnvIndicator from "../components/userInterface/EnvIndicator/EnvIndicator";
import MarketingNav from "../components/marketing/navBar/MarketingNav";

export default function MarketingLayout() {
  return (
    <>
      <MarketingNav />
      <main className="outlet-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <EnvIndicator />
      </main>
      <Footer />
    </>
  );
}
