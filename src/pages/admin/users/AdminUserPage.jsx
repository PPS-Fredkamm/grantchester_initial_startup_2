import { Container, Row } from "react-bootstrap";

import AdminUserStats from "../../../components/admin/users/AdminUserStats";
import AdminUserTable from "../../../components/admin/users/AdminUserTable";

export default function AdminUserPage() {
  return (
    <>
      <Container fluid className="admin-dashboard">
        <div className="admin-container">
          <Row className="admin-content">
            <AdminUserStats />
            <AdminUserTable />
          </Row>
        </div>
      </Container>
    </>
  );
}
