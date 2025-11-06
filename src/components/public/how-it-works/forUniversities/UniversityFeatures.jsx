import { Container, Row, Col, Card } from "react-bootstrap";

export default function UniversityFeatures() {
  return (
    <section className="features-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">Comprehensive Support Services</h2>
            <p className="section-subtitle">
              We provide all the tools, expertise, and support your institution
              needs to successfully accept and manage private company share
              donations.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Legal & Compliance Tools</Card.Title>
                <Card.Text>
                  Access legal templates, compliance checklists, and expert
                  guidance to ensure your institution meets all IRS requirements
                  for accepting private company equity donations. We help even
                  if you've never accepted shares before.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Valuation Coordination</Card.Title>
                <Card.Text>
                  We connect you with qualified 409A valuation providers and
                  ensure all share donations are properly valued according to
                  IRS guidelines. This is essential for both donors and your
                  institution.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Custodial Management</Card.Title>
                <Card.Text>
                  We handle custodial arrangements for share transfers, whether
                  you choose to hold shares long-term or liquidate them. Our
                  platform coordinates with custodians to ensure secure
                  transfers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Expert Support Team</Card.Title>
                <Card.Text>
                  Get one-on-one support from our team of financial, legal, and
                  education professionals. We understand the complexity of share
                  donations and are here to guide your institution every step of
                  the way.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
