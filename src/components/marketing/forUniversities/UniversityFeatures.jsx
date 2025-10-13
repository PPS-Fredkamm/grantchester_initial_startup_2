import { Container, Row, Col, Card } from "react-bootstrap";

export default function UniversityFeatures() {
  return (
    <section className="features-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">
              Everything you need to manage donations and build donor
              relationships.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Project Management</Card.Title>
                <Card.Text>
                  Create and manage multiple funding requests with detailed
                  project descriptions, budgets, and timelines.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Donor Communication</Card.Title>
                <Card.Text>
                  Direct messaging and updates to keep donors informed about
                  project progress and impact.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Impact Reporting</Card.Title>
                <Card.Text>
                  Generate detailed reports showing how donations are being used
                  and the impact they're creating.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Analytics Dashboard</Card.Title>
                <Card.Text>
                  Track donation trends, donor engagement, and project success
                  metrics with comprehensive analytics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
