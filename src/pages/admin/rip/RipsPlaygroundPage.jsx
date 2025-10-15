import { Container, Row } from "react-bootstrap";

import RipsComponent from "../../../components/admin/rip/RipsComponent";

export default function RipsPlaygroundPage() {
  return (
    <Container fluid className="admin-dashboard">
      <div className="admin-container">
        <Row className="admin-content">
          <RipsComponent />
        </Row>
      </div>
    </Container>
  );
}
