import { Container, Row, Col, Image } from "react-bootstrap";

import DonorHandshakeImage from "../../../../assets/images/HowItWorks/donorHandshake.png";

export default function DonorProcess() {
  return (
    <section className="process-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="process-content">
              <h3 className="process-title">Simple Share Donation Process</h3>
              <p className="process-text">
                We guide you through every step of donating your company shares,
                from initial valuation to final transfer, ensuring IRS
                compliance and maximizing your tax benefits.
              </p>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Connect & Evaluate</h5>
                    <p>
                      Connect with your alma mater and provide information about
                      your company and shares. We'll help determine eligibility
                      and valuation requirements.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Legal & Compliance</h5>
                    <p>
                      We handle all documentation, 409A valuation coordination,
                      IRS compliance review, and legal agreements. Our experts
                      ensure everything meets charitable giving regulations.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Transfer & Complete</h5>
                    <p>
                      Complete the share transfer through our secure custodial
                      process. You'll receive proper documentation for tax
                      purposes and see your impact on the university.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <Image
              src={DonorHandshakeImage}
              alt="Professional handshake representing partnership and connection in the donation process"
              fluid
              className="process-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
