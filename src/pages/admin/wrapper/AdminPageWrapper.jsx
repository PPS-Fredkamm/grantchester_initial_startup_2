import { Container, Row } from "react-bootstrap";

export default function AdminPageWrapper({ StatsComponent, TableComponent }) {
  return (
    <Container fluid className="admin-dashboard">
      <Row className="admin-content">
        {StatsComponent && <StatsComponent />}
        {TableComponent && <TableComponent />}
      </Row>
    </Container>
  );
}
