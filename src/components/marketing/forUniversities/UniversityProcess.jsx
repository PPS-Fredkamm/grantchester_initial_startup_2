import { Container, Row, Col, Image } from "react-bootstrap";

export default function UniversityProcess() {
  return (
    <section className="process-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <Image
              src="https://via.placeholder.com/600x400/4bc8e7/ffffff?text=Streamlined+Process"
              alt="Streamlined Process"
              fluid
              className="process-image"
            />
          </Col>
          <Col lg={6}>
            <div className="process-content">
              <h3 className="process-title">Streamlined Process</h3>
              <p className="process-text">
                Our platform makes it easy to create compelling funding requests
                and connect with the right donors for your projects.
              </p>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Create Profile</h5>
                    <p>
                      Set up your university profile with key information and
                      priorities.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>List Projects</h5>
                    <p>
                      Post funding requests for specific programs, research, or
                      initiatives.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Receive Funding</h5>
                    <p>
                      Get matched with donors and receive secure, tracked
                      donations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
