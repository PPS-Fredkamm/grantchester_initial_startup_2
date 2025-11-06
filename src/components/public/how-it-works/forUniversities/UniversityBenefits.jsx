import { Container, Row, Col, Card } from "react-bootstrap";
import { FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function UniversityBenefits() {
  return (
    <section id="university-benefits" className="benefits-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h2 className="section-title">
              Grow Your Endowment with Share Donations
            </h2>
            <p className="section-subtitle">
              Accept private company share donations from alumni founders and
              unlock a new source of funding. Pre-IPO share donations can
              significantly grow your endowment while strengthening alumni
              relationships.
            </p>
          </Col>
        </Row>
        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiDollarSign size={48} />
                </div>
                <Card.Title>Accept Pre-IPO Share Gifts</Card.Title>
                <Card.Text>
                  Receive private company share donations from alumni founders
                  before liquidity events. These gifts can be held or liquidated
                  based on your institution's policies, providing flexible
                  funding options.
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
                <Card.Title>Compliance & Legal Support</Card.Title>
                <Card.Text>
                  We handle all legal documentation, IRS compliance, 409A
                  valuations, and custodial setup. Our experts ensure your
                  institution meets all requirements for accepting private
                  company share donations, even if you've never done it before.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="benefit-card h-100 text-center">
              <Card.Body>
                <div className="benefit-icon">
                  <FiUsers size={48} />
                </div>
                <Card.Title>Strengthen Alumni Engagement</Card.Title>
                <Card.Text>
                  Connect with successful alumni founders and offer them a
                  meaningful way to give back. Share donations create lasting
                  relationships and demonstrate your institution's innovation in
                  fundraising.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
