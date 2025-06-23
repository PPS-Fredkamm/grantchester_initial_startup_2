import { Container, Row, Col } from 'react-bootstrap';

import DonorInfoCard from '../../../components/donor/DonorInfo/DonorInfoCard';
import DonorCTA from '../../../components/donor/DonorCTA/DonorCTA';
import DonorStats from '../../../components/donor/DonorStats/DonorStats';
import DonorPendingDonations from '../../../components/donor/DonorPending/DonorPending';
import DonorDonations from '../../../components/donor/DonorDonations/DonorDonations';

import './DonorDashboard.css';

export default function DonorDashboard() {
  return (
    <>
      <Container fluid className="donor-dashboard">
        <div className="donor-container">
          <Row className="donor-content">
            {/* Left Column */}
            <Col xs={12} lg={12} xl={3}>
              <DonorInfoCard />
              <DonorCTA />
            </Col>
            {/* Right Column */}
            <Col xs={12} lg={12} xl={9}>
              <DonorStats />
              <DonorPendingDonations />
              <DonorDonations />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
