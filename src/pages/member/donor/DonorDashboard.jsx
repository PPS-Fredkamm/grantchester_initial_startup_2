import { Container, Row, Col } from "react-bootstrap";

import DonorInfoCard from "../../../components/member/donor/dashboard/DonorInfoCard";
import DonorCTA from "../../../components/member/donor/dashboard/DonorCTA";
import DonorStats from "../../../components/member/donor/dashboard/DonorStats";
import DonorPendingDonations from "../../../components/member/donor/dashboard/DonorPending";
import DonorDonations from "../../../components/member/donor/dashboard/DonorDonations";

// CSS now imported via styles/index.css. Located in the base-layout.css file.

export default function DonorDashboard() {
  return (
    <>
      <Container fluid className="donor-dashboard">
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
      </Container>
    </>
  );
}
