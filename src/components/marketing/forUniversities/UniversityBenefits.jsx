import { Container, Row, Col, Card } from "react-bootstrap";
import { FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function UniversityBenefits() {
  return (
    <section id="university-benefits" className="benefits-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">University Benefits</h2>
            <p className="section-subtitle">
              Unlock new funding opportunities and build lasting relationships
              with donors who are passionate about your institution's mission.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiDollarSign size={48} />
                </div>
                <Card.Title>Access Funding</Card.Title>
                <Card.Text>
                  Connect with donors who are specifically interested in
                  supporting university initiatives and research projects.
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
                  Monitor and report on how donations are being used with
                  detailed analytics and impact measurement tools.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiUsers size={48} />
                </div>
                <Card.Title>Build Relationships</Card.Title>
                <Card.Text>
                  Foster long-term partnerships with donors who share your
                  values and want to support your institution's growth.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
