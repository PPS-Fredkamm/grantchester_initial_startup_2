import { Row, Col, Button, Card } from "react-bootstrap";
import "./UniversityPortfolioDashboard.css";

// Example data
const portfolio = [
  { company: "Apple", shares: 50, price: 180 },
  { company: "Tesla", shares: 10, price: 250 },
  { company: "Amazon", shares: 25, price: 130 },
  { company: "Google", shares: 15, price: 145 },
];

function UniversityPortfolioDashboard() {
  return (
    <>
      <Card className="dashboard-wrapper p-3 bg-light shadow rounded">
        <Card.Body>
          <Row className="dashboard-header align-items-center justify-content-between mb-4">
            <Col xs="auto">
              <h4 className="dashboard-title">My Portfolio</h4>
            </Col>
            <Col xs="auto">
              <Button variant="outline-primary">Filters</Button>
            </Col>
          </Row>

          {portfolio.map((item, index) => (
            <Card
              className="dashboard-row mb-3 shadow bg-white rounded"
              key={index}
            >
              <Card.Body>
                <Row className="text-center">
                  <Col>{item.company}</Col>
                  <Col>{item.shares}</Col>
                  <Col>${item.price.toFixed(2)}</Col>
                  <Col>${(item.shares * item.price).toFixed(2)}</Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}

export default UniversityPortfolioDashboard;
