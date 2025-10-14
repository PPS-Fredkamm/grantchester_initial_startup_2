import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UniversityCTA() {
  return (
    <section className="cta-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="cta-title">Ready to Start Fundraising?</h3>
            <p className="cta-text">
              Join our platform and start connecting with donors who share your
              mission.
            </p>
            <div className="cta-buttons">
              <Button className="btn-primary-gradient me-3">
                Create University Profile
              </Button>
              <Button as={Link} to="/how-it-works" variant="outline-light">
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
