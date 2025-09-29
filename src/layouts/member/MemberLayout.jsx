import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

import UnderConstruction from "../../components/userInterface/placeholder/UnderConstruction.jsx";
import MemberBanner from "../../components/member/banner/MemberBanner.jsx";
import MemberNav from "../../components/member/navBar/MemberNav.jsx";
import NotFound from "../../pages/public/notFound/NotFound.jsx";
import NavBar from "../../components/public/navbar/Navbar";
import DonorDonations from "../../components/member/donor/DonorDonations/DonorDonations.jsx";
import CompanySettings from "../../components/member/company/CompanySettings/CompanySettings.jsx";

// Imports for the University Sub pages //
// import UniversityCertificates from "../../pages/member/university/UniversityCertificates/UniversityCertificates";
import UniversitySettings from "../../pages/member/university/UniversitySettings/UniversitySettings";
import UniversityDonations from "../../pages/member/university/UniversityDonations/UniversityDonations";

// Lazy-loaded dashboards
const DonorDashboard = lazy(() =>
  import("../../pages/member/donor/DonorDashboard")
);
const CompanyDashboard = lazy(() =>
  import("../../pages/member/company/CompanyDashboard")
);
const UniversityDashboard = lazy(() =>
  import("../../pages/member/university/UniversityDashboard")
);
const ProfilePage = lazy(() => import("../../pages/member/profile/Profile"));
const PublicProfile = lazy(() =>
  import("../../pages/member/profile/PublicProfile")
);
const DonatePage = lazy(() => import("../../pages/member/donation/Donate"));
const UniversityRegistration = lazy(() =>
  import("../../pages/member/university/UniversityRegistration.jsx")
);
const CompanyRegistration = lazy(() =>
  import("../../pages/member/company/CompanyRegistration.jsx")
);

import "./MemberLayout.css";

export default function MemberLayout() {
  const { type, option = "" } = useParams();

  const resolvedType = type?.toLowerCase() || "donor";
  const resolvedOption = option?.toLowerCase() || "";

  let content;

  switch (resolvedType) {
    case "donor":
      switch (resolvedOption) {
        case "":
          content = <DonorDashboard />;
          break;
        case "donations":
          content = <DonorDonations />;
          break;
        case "documents":
          content = <UnderConstruction title="Documents" />;
          break;
        case "mailing":
          content = <UnderConstruction title="Mailing" />;
          break;
        // case "settings":
        //   content = <ProfilePage />;
        //   break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case "company":
      switch (resolvedOption) {
        case "":
          content = <CompanyDashboard />;
          break;
        case "requests":
          content = <UnderConstruction title="Company Requests" />;
          break;
        case "users":
          content = <UnderConstruction title="Company Users" />;
          break;
        case "settings":
          content = <CompanySettings />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case "university":
      switch (resolvedOption) {
        case "":
          content = <UniversityDashboard />;
          break;
        case "certificates":
          content = <UnderConstruction title="University Certificates" />;
          break;
        case "donations":
          content = <UniversityDonations />;
          break;
        case "documents":
          content = <UnderConstruction title="University Documents" />;
          break;
        case "Mailing":
          content = <UnderConstruction title="University Mailing" />;
          break;
        case "settings":
          content = <UniversitySettings />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case "profile":
      switch (resolvedOption) {
        case "":
          content = <ProfilePage />;
          break;
        default:
          content = <PublicProfile username={resolvedOption} />;
          break;
      }
      break;

    case "donate":
      switch (resolvedOption) {
        case "":
          content = <DonatePage />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case "register":
      switch (resolvedOption) {
        case "university":
          content = <UniversityRegistration />;
          break;
        case "company":
          content = <CompanyRegistration />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    default:
      content = <NotFound />;
      break;
  }

  return (
    <>
      <NavBar />
      <MemberBanner />
      <div className="member-layout">
        <MemberNav />
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
