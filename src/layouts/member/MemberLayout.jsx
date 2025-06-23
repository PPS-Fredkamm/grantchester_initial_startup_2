import { useParams } from 'react-router-dom';

import UnderConstruction from '../../pages/placeholder/UnderConstruction';
import MemberBanner from '../../components/member/memberBanner';
import MemberNav from '../../components/member/MemberNav';

import DonorDashboard from '../../pages/member/donor/DonorDashboard';
import CompanyDashboard from '../../pages/member/company/CompanyDashboard';
import UniversityDashboard from '../../pages/member/university/UniversityDashboard';

import NotFound from '../notFound/NotFound';

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
        case 'donations':
          content = <UnderConstruction title="University Donations" />;
          break;
        case 'documents':
          content = <UnderConstruction title="University Documents" />;
          break;
        case 'Mailing':
          content = <UnderConstruction title="University Mailing" />;
          break;
        case 'settings':
          content = <UnderConstruction title="University Settings" />;
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
      <MemberBanner />
      <div className="member-layout">
        <MemberNav />
        {content}
      </div>
    </>
  );
}
