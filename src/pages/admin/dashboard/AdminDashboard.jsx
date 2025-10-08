import { Container, Row } from "react-bootstrap";

import AdminAllDonations from "../../../components/admin/donations/AdminAllDonations";
import AdminPending from "../../../components/admin/donations/pending/AdminPending";
import PendingCompanies from "../../../components/admin/company/pending/PendingCompanies";
import PendingUniversities from "../../../components/admin/university/pending/PendingUniversities";


export default function AdminDashboard() {
  return (
    <>
      <Container fluid className="admin-dashboard">
        <div className="admin-container">
          <Row className="admin-content">
            <AdminPending />
            <PendingCompanies />
            <PendingUniversities />
          </Row>
        </div>
      </Container>
    </>
  );
}
