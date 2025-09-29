import { Container, Row, Col } from "react-bootstrap";
import {
  BsCheckCircle,
  BsLockFill,
  BsBank,
  BsShieldCheck,
} from "react-icons/bs";

export default function TrustBadges() {
  return (
    <Container className="text-center my-5">
      <h2 className="mb-4">Your Security Is Our Priority</h2>
      <Row className="justify-content-center g-4">
        <Col xs={6} md={3}>
          <BsCheckCircle size={80} className="text-primary mb-2" />
          <p className="fs-2">SEC Compliant</p>
        </Col>
        <Col xs={6} md={3}>
          <BsLockFill size={80} className="text-primary mb-2" />
          <p className="fs-2">Encrypted Transactions</p>
        </Col>
        {/* <Col xs={6} md={3}>
          <BsBank size={80} className="text-primary mb-2" />
          <p className="fs-2">Backed by XYZ Law Group</p>
        </Col> */}
        <Col xs={6} md={3}>
          <BsShieldCheck size={80} className="text-primary mb-2" />
          <p className="fs-2">IRS Guidelines Followed</p>
        </Col>
      </Row>
    </Container>
  );
}
