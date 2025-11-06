import { Container, Row, Col, Image } from "react-bootstrap";

import CapTossImage from "../../../../assets/images/HowItWorks/capToss.png";

export default function UniversityProcess() {
  return (
    <section className="process-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <Image
              src={CapTossImage}
              alt="University graduates celebrating - representing the impact of share donations"
              fluid
              className="process-image"
            />
          </Col>
          <Col lg={6}>
            <div className="process-content">
              <h3 className="process-title">How Donations Work</h3>
              <p className="process-text">
                From initial contact with alumni donors to final share transfer,
                we guide your institution through every step of accepting
                private company equity donations, ensuring compliance and
                maximizing value.
              </p>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Onboarding & Setup</h5>
                    <p>
                      We help your development and finance teams get ready to
                      accept share donations. This includes legal review, policy
                      development, and custodial arrangements.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Donor Connection & Valuation</h5>
                    <p>
                      Connect with alumni donors interested in giving company
                      shares. We coordinate 409A valuations, legal
                      documentation, and IRS compliance to ensure the donation
                      meets all requirements.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Share Transfer & Management</h5>
                    <p>
                      Complete the secure transfer of shares through our
                      custodial process. Your institution can hold the shares or
                      liquidate them based on your policies and needs.
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
