import { Container, Row, Col } from 'react-bootstrap';

import UniversityPortfolioDashboard from '../../../components/university/UniversityPortfolioDashboard/UniversityPortfolioDashboard';
import UniversityPriceHistory from '../../../components/university/UniversityPriceHistory/UniversityPriceHistory';
import DonationTabs from '../../../components/university/DonationTabs/DonationTabs';
import UniversityStockPlot from '../../../components/university/UniversityStockPlot/UniversityStockPlot';

import './UniversityDashboard.css';

export default function UniversityDashboard() {
  return (
    <>
      <Container fluid className="university-dashboard">
        <div className="university-container">
          <Row className="university-content">
            {/* Left Column */}
            <Col xs={12} lg={12} xl={6}>
              <UniversityPortfolioDashboard />
              <DonationTabs />
            </Col>

            {/* Right Column */}
            <Col xs={12} lg={12} xl={6}>
              <UniversityStockPlot />
              <UniversityPriceHistory />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
