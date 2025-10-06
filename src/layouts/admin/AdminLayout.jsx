import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

import AdminBanner from "../../components/admin/banner/AdminBanner";
import AdminNav from "../../components/admin/navBar/AdminNav";
import UnderConstruction from "../../components/userInterface/placeholder/UnderConstruction";

import "./AdminLayout.css";

// Lazy-loaded pages
const AdminDashboard = lazy(() =>
  import("../../pages/admin/dashboard/AdminDashboard")
);

const PendingDonationPage = lazy(() =>
  import("../../pages/admin/pending/PendingDonationPage")
);

const AdminUserPage = lazy(() =>
  import("../../pages/admin/users/AdminUserPage")
);

export default function AdminLayout() {
  const { option } = useParams();

  const resolvedOption = option?.toLowerCase() || "";

  let content;

  switch (resolvedOption) {
    case "dashboard":
      content = <AdminDashboard />;
      break;
    case "pending-donations":
      content = <PendingDonationPage />;
      break;
    case "view-donations":
      content = (
        <UnderConstruction title="Feature to view and manage all donations that have been processed and submitted" />
      );
      break;
    case "view-companies":
      content = (
        <UnderConstruction title="Feature to view and manage all companies registered to the site" />
      );
      break;
    case "company-registrations":
      content = (
        <UnderConstruction title="Feature to view and manage all university registrations waiting to be verified" />
      );
      break;
    case "view-universities":
      content = (
        <UnderConstruction title="Feature to view and manage all university registered to the site" />
      );
      break;
    case "university-registrations":
      content = (
        <UnderConstruction title="Feature to view and manage all university registrations waiting to be verified" />
      );
      break;
    case "users":
      content = <AdminUserPage />;
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
