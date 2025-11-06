import { Container, Row, Col, Image } from "react-bootstrap";

import TrustHandshakeImage from "../../../../assets/images/HowItWorks/trustHandshake.jpg";

export default function HowItWorksBenefits() {
  return (
    <section className="benefits-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <Image
              src={TrustHandshakeImage}
              alt="Professional handshake representing trust, partnership, and collaboration between universities and donors"
              fluid
              className="benefits-image"
            />
          </Col>
          <Col lg={6}>
            <div className="benefits-content">
              <h3 className="benefits-title">Why Choose Our Platform</h3>
              <p className="benefits-text">
                Our platform simplifies the entire process of private company
                share donations, making it accessible for universities and
                donors alike. We handle the complexity so you can focus on the
                impact.
              </p>
              <ul className="benefits-list">
                <li>
                  Complete end-to-end support from initial connection to final
                  transfer
                </li>
                <li>
                  Expert guidance on legal compliance, IRS requirements, and
                  409A valuations
                </li>
                <li>
                  Secure custodial management for share transfers and holdings
                </li>
                <li>
                  Transparent process that builds trust between donors and
                  universities
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
