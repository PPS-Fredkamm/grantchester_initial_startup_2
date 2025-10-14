import { Container, Row, Col, Button, Image } from "react-bootstrap";

export default function UniversityHero() {
  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById("university-benefits");
    if (benefitsSection) {
      benefitsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <Container className="hero-content">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="hero-title">For Universities</h1>
            <p className="hero-subtitle">
              Connect with donors who share your mission. Access funding for
              research, programs, and initiatives that drive positive change.
            </p>
            <div className="hero-cta">
              <Button className="btn-primary-gradient me-3">Get Started</Button>
              <Button variant="outline-light" onClick={scrollToBenefits}>
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Image
        className="hero-image"
        src="https://via.placeholder.com/1200x600/4b9be7/ffffff?text=University+Benefits"
        alt="University Benefits Hero"
        fluid
      />
    </section>
  );
}
