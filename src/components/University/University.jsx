import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import UniversityBanner from './UniversityBanner/UniversityBanner';
import UniversityNav from './UniversityNav/UniversityNav';
import UniversityPortfolioDashboard from './UniversityPortfolioDashboard/UniversityPortfolioDashboard';
import UniversityPriceHistory from './UniversityPriceHistory/UniversityPriceHistory';
// import { Container, Row, Col } from 'react-bootstrap';
import DonationTabs from './DonationTabs/DonationTabs';
import UniversityStockPlot from './UniversityStockPlot/UniversityStockPlot';


export default function University() {
 return (
    <>
      <UniversityBanner />
      <UniversityNav />
      <Container fluid className="dashboard-container px-4 py-4">
        <Row className="justify-content-start dashboard-top-row">
          {/* Left Side: Portfolio + Donations */}
          <Col xs={12} md={8} lg={7} xl={6}>
            <UniversityPortfolioDashboard />
            <DonationTabs />
          </Col>

          {/* Right Side: Stock Plot + Price History */}
          <Col xs={12} md={4} lg={5} xl={6}>
            <UniversityStockPlot />
            <UniversityPriceHistory />
          </Col>
        </Row>
      </Container>
    </>
  );
}