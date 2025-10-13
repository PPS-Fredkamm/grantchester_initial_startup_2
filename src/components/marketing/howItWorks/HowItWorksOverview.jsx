import { Container, Row, Col, Card } from "react-bootstrap";

export default function HowItWorksOverview() {
  return (
    <section className="overview-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">Streamlined Process</h2>
            <p className="section-subtitle">
              Our platform simplifies the connection between universities and
              donors, ensuring transparency and impact at every step.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="process-card h-100 text-center">
              <Card.Body>
                <div className="process-icon">1</div>
                <Card.Title>Connect</Card.Title>
                <Card.Text>
                  Universities create profiles and list funding needs. Donors
                  browse opportunities that align with their values.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="process-card h-100 text-center">
              <Card.Body>
                <div className="process-icon">2</div>
                <Card.Title>Donate</Card.Title>
                <Card.Text>
                  Secure, transparent donation process with real-time tracking
                  and impact reporting for every contribution.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="process-card h-100 text-center">
              <Card.Body>
                <div className="process-icon">3</div>
                <Card.Title>Impact</Card.Title>
                <Card.Text>
                  Track the direct impact of donations with detailed reports and
                  updates on how funds are being used.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
