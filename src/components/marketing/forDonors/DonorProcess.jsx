import { Container, Row, Col, Image } from "react-bootstrap";

export default function DonorProcess() {
  return (
    <section className="process-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="process-content">
              <h3 className="process-title">Transparent Donations</h3>
              <p className="process-text">
                Our platform ensures you know exactly where your money goes
                and the impact it creates, every step of the way.
              </p>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Browse Projects</h5>
                    <p>
                      Explore university initiatives and find causes that
                      match your interests.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Make Donation</h5>
                    <p>
                      Contribute securely with full transparency about how
                      funds will be used.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Track Impact</h5>
                    <p>
                      Receive updates and reports on the real impact of your
                      contributions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <Image
              src="https://via.placeholder.com/600x400/4b9be7/ffffff?text=Transparent+Donations"
              alt="Transparent Donations"
              fluid
              className="process-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
