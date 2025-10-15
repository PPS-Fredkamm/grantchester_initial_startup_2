import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

import AdminBanner from "../../components/admin/banner/AdminBanner";
import AdminNav from "../../components/admin/navBar/AdminNav";

import "./AdminLayout.css";

// Lazy-loaded pages
const AdminDashboard = lazy(() =>
  import("../../pages/admin/dashboard/AdminDashboard")
);
const PendingDonationPage = lazy(() =>
  import("../../pages/admin/donations/PendingDonationPage")
);
const ViewDonationsPage = lazy(() =>
  import("../../pages/admin/donations/ViewDonationsPage")
);
const ViewUsersPage = lazy(() =>
  import("../../pages/admin/users/ViewUsersPage")
);
const ViewCompanyPage = lazy(() =>
  import("../../pages/admin/company/ViewCompanyPage")
);
const PendingCompanyPage = lazy(() =>
  import("../../pages/admin/company/PendingCompanyPage")
);
const ViewUniversityPage = lazy(() =>
  import("../../pages/admin/university/ViewUniversityPage")
);
const PendingUniversityPage = lazy(() =>
  import("../../pages/admin/university/PendingUniversityPage")
);
const RipsPlaygroundPage = lazy(() =>
  import("../../pages/admin/rip/RipsPlaygroundPage")
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
      content = <ViewDonationsPage />;
      break;
    case "view-companies":
      content = <ViewCompanyPage />;
      break;
    case "company-registrations":
      content = <PendingCompanyPage />;
      break;
    case "view-universities":
      content = <ViewUniversityPage />;
      break;
    case "university-registrations":
      content = <PendingUniversityPage />;
      break;
    case "users":
      content = <ViewUsersPage />;
      break;
    case "rips-playground":
      content = <RipsPlaygroundPage />;
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
