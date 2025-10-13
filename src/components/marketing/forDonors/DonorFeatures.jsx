import { Container, Row, Col, Card } from "react-bootstrap";

export default function DonorFeatures() {
  return (
    <section className="features-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">
              Everything you need to make informed donations and track your
              impact.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Project Discovery</Card.Title>
                <Card.Text>
                  Browse and filter university projects by category, location,
                  funding goal, and impact area to find the perfect match.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Impact Tracking</Card.Title>
                <Card.Text>
                  Monitor the progress of projects you've supported with
                  regular updates and detailed impact reports.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Secure Payments</Card.Title>
                <Card.Text>
                  All donations are processed through secure, encrypted
                  payment systems with fraud protection and data security.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Donation History</Card.Title>
                <Card.Text>
                  Keep track of all your donations with detailed records, tax
                  receipts, and impact summaries in one place.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
