import { Container, Row, Col } from 'react-bootstrap';

import NewReqBanner from '../../../components/company/NewReqBanner/NewReqBanner';
import CompanyInfoCard from '../../../components/company/CompanyInfo/CompanyInfoCard';
import ProfileCTA from '../../../components/donor/DonorCTA/DonorCTA';
import CompanyNewRequest from '../../../components/company/CompanyNewRequest/CompanyNewRequest';
import CompanyRequest from '../../../components/company/CompanyRequestHistory/CompanyRequest';

import './Company.css';

export default function CompanyDashboard() {
  return (
    <>
      <Container fluid className="company-dashboard">
        <div className="company-container">
          <NewReqBanner />
          <Row className="company-content">
            {/* Left Column */}
            <Col xs={12} lg={12} xl={3}>
              <CompanyInfoCard />
              <ProfileCTA />
            </Col>
            {/* Right Column */}
            <Col xs={12} lg={12} xl={9}>
              <CompanyNewRequest />
              <CompanyRequest />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
