import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DonorCTA() {
  return (
    <section className="cta-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="cta-title">Ready to Make an Impact?</h3>
            <p className="cta-text">
              Start supporting university initiatives that align with your
              values today.
            </p>
            <div className="cta-buttons">
              <Button className="btn-primary-gradient me-3">
                Browse Projects
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
