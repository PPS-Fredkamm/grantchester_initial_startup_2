import { Container, Row, Col, Card } from "react-bootstrap";

export default function DonorFeatures() {
  return (
    <section className="features-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">What We Handle For You</h2>
            <p className="section-subtitle">
              Our platform manages the entire share donation process, from
              valuation to transfer, ensuring compliance and maximizing your
              benefits.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>409A Valuation Support</Card.Title>
                <Card.Text>
                  We connect you with qualified valuation providers to ensure
                  your share donation meets IRS requirements for charitable
                  giving. Proper valuation is essential for tax deductions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Legal Documentation</Card.Title>
                <Card.Text>
                  We provide and review all necessary legal documents, including
                  share transfer agreements, gift agreements, and compliance
                  documentation. Our legal experts ensure everything is properly
                  structured.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Custodial Setup</Card.Title>
                <Card.Text>
                  We coordinate with custodians to facilitate the secure
                  transfer of shares. Whether your university holds the shares
                  or liquidates them, we handle the custodial arrangements.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="feature-card h-100">
              <Card.Body>
                <Card.Title>Tax Documentation</Card.Title>
                <Card.Text>
                  Receive complete documentation for your tax filings, including
                  valuation reports, gift acknowledgments, and all necessary IRS
                  forms. We ensure you have everything needed for your tax
                  advisor.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
