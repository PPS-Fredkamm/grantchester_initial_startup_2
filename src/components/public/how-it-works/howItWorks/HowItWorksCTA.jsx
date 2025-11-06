import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HowItWorksCTA() {
  return (
    <section className="cta-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="cta-title">Ready to Get Started?</h3>
            <p className="cta-text">
              Join our platform and start making a difference today.
            </p>
            <div className="cta-buttons">
              <Button
                as={Link}
                to="/for-universities"
                className="btn-primary-gradient me-3"
              >
                University Benefits
              </Button>
              <Button as={Link} to="/for-donors" variant="outline-light">
                Donor Benefits
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
