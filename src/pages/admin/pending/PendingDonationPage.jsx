import { Container, Row } from "react-bootstrap";

import AdminPending from "../../../components/admin/pending/AdminPending";
import AdminPendingStats from "../../../components/admin/pending/AdminPendingStats";

export default function PendingDonationPage() {
  return (
    <>
      <Container fluid className="admin-dashboard">
        <div className="admin-container">
          <Row className="admin-content">
            <AdminPendingStats />
            <AdminPending />
          </Row>
        </div>
      </Container>
    </>
  );
}
