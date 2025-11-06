import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DonorCTA() {
  return (
    <section className="cta-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="cta-title">Ready to Donate Your Company Shares?</h3>
            <p className="cta-text">
              Connect with your alma mater and maximize your tax benefits while
              supporting the institution that helped shape your success. Our
              experts handle all the complexity.
            </p>
            <div className="cta-buttons">
              <Button className="btn-primary-gradient me-3">
                Start Your Donation
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
