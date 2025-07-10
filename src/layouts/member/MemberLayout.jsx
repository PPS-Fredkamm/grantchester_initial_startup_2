import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import UnderConstruction from '../../pages/placeholder/UnderConstruction';
import MemberBanner from '../../components/member/memberBanner';
import MemberNav from '../../components/member/MemberNav';
import NotFound from '../notFound/NotFound';

// Imports for the University Sub pages //
import UniversityCertificates from '../../pages/member/university/UniversityCertificates/UniversityCertificates';
import UniversitySettings from '../../pages/member/university/UniversitySettings/UniversitySettings';
import UniversityDonations from '../../pages/member/university/UniversityDonations/UniversityDonations';

// Lazy-loaded dashboards
const DonorDashboard = lazy(() =>
  import('../../pages/member/donor/DonorDashboard')
);
const CompanyDashboard = lazy(() =>
  import('../../pages/member/company/CompanyDashboard')
);
const UniversityDashboard = lazy(() =>
  import('../../pages/member/university/UniversityDashboard')
);

import './MemberLayout.css';


export default function MemberLayout() {
  const { type, option = '' } = useParams();

  const resolvedType = type?.toLowerCase() || 'donor';
  const resolvedOption = option?.toLowerCase() || '';

  let content;

  switch (resolvedType) {
    case 'donor':
      switch (resolvedOption) {
        case '':
          content = <DonorDashboard />;
          break;
        case 'donations':
          content = <UnderConstruction title="Donations" />;
          break;
        case 'documents':
          content = <UnderConstruction title="Documents" />;
          break;
        case 'mailing':
          content = <UnderConstruction title="Mailing" />;
          break;
        case 'settings':
          content = <UnderConstruction title="Settings" />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case 'company':
      switch (resolvedOption) {
        case '':
          content = <CompanyDashboard />;
          break;
        case 'requests':
          content = <UnderConstruction title="Company Requests" />;
          break;
        case 'users':
          content = <UnderConstruction title="Company Users" />;
          break;
        case 'settings':
          content = <UnderConstruction title="Company Settings" />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case 'university':
      switch (resolvedOption) {
        case '':
          content = <UniversityDashboard />;
          break;
        case 'certificates':
          content = <UniversityCertificates title="University Certificates" />;
          break;
        case 'donations':
          content = <UniversityDonations title="University Donations" />;
          break;
        case 'documents':
          content = <UnderConstruction title="University Documents" />;
          break;
        case 'Mailing':
          content = <UnderConstruction title="University Mailing" />;
          break;
        case 'settings':
          content = <UniversitySettings title="University Settings" />;
          break;
        default:
          content = <NotFound />;
          break;
      }
      break;

    case 'profile':
      switch (resolvedOption) {
        case '':
          content = <UnderConstruction title="Profile Page" />;
          break;
      }
      break;

    default:
      content = <NotFound />;
      break;
  }

  return (
    <>
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
