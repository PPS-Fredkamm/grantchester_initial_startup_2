import { Card, Button } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';

import './DonorCTA.css';

export default function DonorCTA() {
  return (
    <Card className="donor-cta shadow mb-4">
      <Card.Body className="p-3">
        <Card.Title>
          Shaping Tomorrow's Leaders: Inspiring Change through University
          Philanthropy
        </Card.Title>
        <Card.Text>
          Donating stocks to universities offers a powerful opportunity to
          maximize the impact of your philanthropic effort. By donating
          appreciated ...
        </Card.Text>
        <Button >
          <span>Continue reading</span>
          <FiArrowRight />
        </Button>
      </Card.Body>
    </Card>
  );
}
