import { Container, Row, Col } from 'react-bootstrap';
import { CheckCircle, LockFill, Bank, ShieldCheck } from 'react-bootstrap-icons';

export default function TrustBadges() {
  return (
    <Container className="text-center my-5">
        <h2 className="mb-4">Your Security Is Our Priority</h2>
      <Row className="justify-content-center g-4">
        <Col xs={6} md={3}>
          <CheckCircle size={80} className="text-primary mb-2" />
          <p className="fs-2">SEC Compliant</p>
        </Col>
        <Col xs={6} md={3}>
          <LockFill size={80} className="text-primary mb-2" />
          <p className="fs-2">Encrypted Transactions</p>
        </Col>
        {/* <Col xs={6} md={3}>
          <Bank size={80} className="text-primary mb-2" />
          <p className="fs-2">Backed by XYZ Law Group</p>
        </Col> */}
        <Col xs={6} md={3}>
          <ShieldCheck size={80} className="text-primary mb-2" />
          <p className="fs-2">IRS Guidelines Followed</p>
        </Col>
      </Row>
    </Container>
  );
}
