import { Container, Row } from "react-bootstrap";

import RecentDonations from "../../../components/admin/donations/RecentDonations";
import AdminPending from "../../../components/admin/pending/AdminPending";
import UnderConstruction from "../../../components/userInterface/placeholder/UnderConstruction";


export default function AdminDashboard() {
  return (
    <>
      <Container fluid className="admin-dashboard">
        <div className="admin-container">
          <Row className="admin-content">
            <AdminPending />
            <UnderConstruction title="More features to be added soon" />
            <RecentDonations />
          </Row>
        </div>
      </Container>
    </>
  );
}
