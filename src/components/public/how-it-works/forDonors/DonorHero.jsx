import { Container, Row, Col, Button, Image } from "react-bootstrap";

import DonorBanner from "../../../../assets/images/HowItWorks/donorsBanner.jpg";

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
              Donate your company shares to your alma mater and maximize your
              tax benefits while supporting the institution that shaped your
              success. We simplify the complex process of donating private
              company equity.
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
        src={DonorBanner}
        alt="Donor Benefits Hero"
        fluid
      />
    </section>
  );
}
