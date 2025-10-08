import { Container, Row } from "react-bootstrap";

export default function AdminPageWrapper({ StatsComponent, TableComponent }) {
  return (
    <Container fluid className="admin-dashboard">
      <div className="admin-container">
        <Row className="admin-content">
          {StatsComponent && <StatsComponent />}
          {TableComponent && <TableComponent />}
        </Row>
      </div>
    </Container>
  );
}
