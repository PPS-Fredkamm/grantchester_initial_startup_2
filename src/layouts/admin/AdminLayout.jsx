import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

import AdminBanner from "../../components/admin/banner/AdminBanner";
import AdminNav from "../../components/admin/navBar/AdminNav";
import UnderConstruction from "../../components/userInterface/placeholder/UnderConstruction";

import "./AdminLayout.css";

// Lazy-loaded dashboards
const DonorDashboard = lazy(() =>
  import("../../pages/member/donor/DonorDashboard")
);

export default function AdminLayout() {
  const { type, option = "" } = useParams();

  const resolvedType = type?.toLowerCase() || "admin";
  const resolvedOption = option?.toLowerCase() || "";

  let content;

  switch (resolvedType) {
    case "admin":
      switch (resolvedOption) {
        case "":
          content = <UnderConstruction title="Dashboard" />;
          break;
        case "donations":
          content = <UnderConstruction title="Donations" />;
          break;
        case "documents":
          content = <UnderConstruction title="Documents" />;
          break;
        case "mailing":
          content = <UnderConstruction title="Mailing" />;
          break;
      }
      break;

    default:
      content = <NotFound />;
      break;
  }
  return (
    <>
      <AdminBanner />
      <div className="admin-layout">
        <AdminNav />
        <Suspense
          fallback={
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="text-center">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                />
                <div>Loading...</div>
              </div>
            </div>
          }
        >
          {content}
        </Suspense>
      </div>
    </>
  );
}
