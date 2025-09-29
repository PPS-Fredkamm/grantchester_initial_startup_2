import { Container, Row, Col } from 'react-bootstrap';

import DonorInfoCard from '../../../components/member/donor/DonorInfo/DonorInfoCard';
import DonorCTA from '../../../components/member/donor/DonorCTA/DonorCTA';
import DonorStats from '../../../components/member/donor/DonorStats/DonorStats';
import DonorPendingDonations from '../../../components/member/donor/DonorPending/DonorPending';
import DonorDonations from '../../../components/member/donor/DonorDonations/DonorDonations';

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
