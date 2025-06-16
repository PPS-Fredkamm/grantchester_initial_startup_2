import { Container, Row, Col } from 'react-bootstrap';

import CompanyBanner from './CompanyBanner/CompanyBanner';
import CompanyNav from './CompanyNav/CompanyNav';
import NewReqBanner from './NewReqBanner/NewReqBanner';
import CompanyInfoCard from './CompanyInfo/CompanyInfoCard';
import ProfileCTA from '../Profile/ProfileCTA/ProfileCTA';
import CompanyNewRequest from './CompanyNewRequest/CompanyNewRequest';
import CompanyRequest from './CompanyRequestHistory/CompanyRequest';

import './Company.css';

export default function Company() {
  return (
    <>
      <CompanyBanner />
      <Container fluid className="company-dashboard">
        <div className="company-container">
          <div className="company-nav">
            <CompanyNav />
          </div>
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
