import { Container, Row, Col, Card } from "react-bootstrap";
import { FiTarget, FiTrendingUp, FiShield } from "react-icons/fi";

export default function DonorBenefits() {
  return (
    <section id="donor-benefits" className="benefits-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">Why Donate Company Shares?</h2>
            <p className="section-subtitle">
              Donating your private company shares before an IPO or acquisition
              offers significant tax advantages and allows you to support your
              alma mater at a meaningful scale.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiTarget size={48} />
                </div>
                <Card.Title>Maximize Tax Benefits</Card.Title>
                <Card.Text>
                  Donate appreciated company shares and avoid capital gains tax
                  while claiming the full fair market value as a charitable
                  deduction. This can result in significant tax savings compared
                  to cash donations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiTrendingUp size={48} />
                </div>
                <Card.Title>Support Your Alma Mater</Card.Title>
                <Card.Text>
                  Make a transformative impact on your university's endowment,
                  research programs, and student initiatives. Your donation can
                  fund scholarships, research, facilities, and more.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiShield size={48} />
                </div>
                <Card.Title>Expert Guidance</Card.Title>
                <Card.Text>
                  Our platform handles all the complexity, from 409A valuations
                  and IRS compliance to legal documentation and custodial setup.
                  We work with financial and legal experts to ensure everything
                  is done correctly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
