import { Container, Row, Col } from "react-bootstrap";
import { BsCurrencyDollar, BsFileEarmarkText } from "react-icons/bs";

export default function BenefitsOfDonating() {
  return (
    <Container className="my-5 text-center">
      <h2>Benefits of Donating</h2>
      <Row className="mt-4 g-4">
        <Col md={6}>
          <BsCurrencyDollar size={40} className="text-primary mb-2" />
          <h5>Tax Deductions</h5>
          <p>
            Claim deductions for the full value of your donated stock, reducing
            your taxable income.
          </p>
        </Col>
        <Col md={6}>
          <BsFileEarmarkText size={40} className="text-primary mb-2" />
          <h5>Tax Benefit Guide</h5>
          <p>
            Understand the specific tax benefits and how to optimize your
            charitable contribution.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
