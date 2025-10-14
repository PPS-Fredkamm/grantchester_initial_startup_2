import { Container, Row, Col, Button, Image } from "react-bootstrap";

export default function DonorHero() {
  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById("donor-benefits");
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
            <h1 className="hero-title">For Donors</h1>
            <p className="hero-subtitle">
              Make a meaningful impact by supporting university initiatives that
              align with your values. Track your donations and see the
              difference you're making.
            </p>
            <div className="hero-cta">
              <Button className="btn-primary-gradient me-3">
                Start Donating
              </Button>
              <Button variant="outline-light" onClick={scrollToBenefits}>
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Image
        className="hero-image"
        src="https://via.placeholder.com/1200x600/4bc8e7/ffffff?text=Donor+Benefits"
        alt="Donor Benefits Hero"
        fluid
      />
    </section>
  );
}
