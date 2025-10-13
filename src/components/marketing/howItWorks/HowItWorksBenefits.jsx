import { Container, Row, Col, Image } from "react-bootstrap";

export default function HowItWorksBenefits() {
  return (
    <section className="benefits-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <Image
              src="https://via.placeholder.com/600x400/4bc8e7/ffffff?text=Transparent+Donations"
              alt="Transparent Donations"
              fluid
              className="benefits-image"
            />
          </Col>
          <Col lg={6}>
            <div className="benefits-content">
              <h3 className="benefits-title">Transparent Donations</h3>
              <p className="benefits-text">
                Every donation is tracked from start to finish, providing
                complete transparency about how funds are used and the impact
                they create.
              </p>
              <ul className="benefits-list">
                <li>Real-time donation tracking</li>
                <li>Detailed impact reports</li>
                <li>Direct communication channels</li>
                <li>Secure payment processing</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
