import { Container, Row, Col, Card } from "react-bootstrap";

export default function HowItWorksOverview() {
  return (
    <section className="overview-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">How Our Platform Works</h2>
            <p className="section-subtitle">
              We simplify the complex process of donating private company
              shares, connecting alumni founders with their universities through
              a streamlined, compliant platform that handles all the details.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="process-icon">1</div>
                <Card.Title>Connect & Onboard</Card.Title>
                <Card.Text>
                  Universities and alumni donors connect through our platform.
                  We help both parties understand the process, eligibility
                  requirements, and what's needed to accept or donate private
                  company shares. Our team guides you through initial setup and
                  policy development.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="process-icon">2</div>
                <Card.Title>Documentation & Compliance</Card.Title>
                <Card.Text>
                  We coordinate 409A valuations, handle all legal documentation,
                  ensure IRS compliance, and manage custodial arrangements. Our
                  experts work with financial and legal professionals to ensure
                  everything meets charitable giving regulations and
                  requirements.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="process-icon">3</div>
                <Card.Title>Transfer & Impact</Card.Title>
                <Card.Text>
                  Complete the secure share transfer through our custodial
                  process. Universities receive documentation and can hold or
                  liquidate shares based on their policies. Donors receive
                  proper tax documentation and see their meaningful impact on
                  their alma mater.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
