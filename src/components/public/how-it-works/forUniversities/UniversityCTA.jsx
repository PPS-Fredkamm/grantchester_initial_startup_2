import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UniversityCTA() {
  return (
    <section className="cta-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="cta-title">Ready to Accept Share Donations?</h3>
            <p className="cta-text">
              Start accepting pre-IPO company share donations from alumni
              founders and grow your endowment. Our platform is free for
              universities—we handle all the complexity so you can focus on
              impact.
            </p>
            <div className="cta-buttons">
              <Button className="btn-primary-gradient me-3">Get Started</Button>
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
