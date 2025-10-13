import { Container, Row, Col, Card } from "react-bootstrap";
import { FiTarget, FiTrendingUp, FiShield } from "react-icons/fi";

export default function DonorBenefits() {
  return (
    <section id="donor-benefits" className="benefits-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">Donor Benefits</h2>
            <p className="section-subtitle">
              Support causes you care about with complete transparency and
              real-time impact tracking.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiTarget size={48} />
                </div>
                <Card.Title>Targeted Giving</Card.Title>
                <Card.Text>
                  Find and support specific university programs, research
                  projects, and initiatives that align with your interests.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiTrendingUp size={48} />
                </div>
                <Card.Title>Track Impact</Card.Title>
                <Card.Text>
                  See exactly how your donations are being used with detailed
                  reports and progress updates from universities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiShield size={48} />
                </div>
                <Card.Title>Secure & Transparent</Card.Title>
                <Card.Text>
                  All donations are processed securely with complete
                  transparency about where your money goes and how it's used.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
