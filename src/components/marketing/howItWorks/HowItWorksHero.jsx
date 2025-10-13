import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HowItWorksHero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <Container className="hero-content">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="hero-title">How It Works</h1>
            <p className="hero-subtitle">
              Connecting universities with donors to create meaningful impact
              through transparent, streamlined giving processes.
            </p>
            <div className="hero-cta">
              <Button
                as={Link}
                to="/for-universities"
                className="btn-primary-gradient me-3"
              >
                For Universities
              </Button>
              <Button as={Link} to="/for-donors" variant="outline-light">
                For Donors
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Image
        className="hero-image"
        src="https://via.placeholder.com/1200x600/4b9be7/ffffff?text=How+It+Works"
        alt="How It Works Hero"
        fluid
      />
    </section>
  );
}
