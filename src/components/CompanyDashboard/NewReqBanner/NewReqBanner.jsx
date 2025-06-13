import { Card, Button } from 'react-bootstrap';
import { FaHandHoldingHeart } from 'react-icons/fa';

import './NewReqBanner.css';

export default function NewReqBanner() {
  return (
    <Card className="new-request-banner shadow-sm mb-4">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaHandHoldingHeart className="request-icon me-3" />
          <p className="mb-0 text-muted">
            New verification request! Review donation from <strong>John doe</strong>
          </p>
        </div>
        <Button className='req-review-button' size="sm">
          Review Request
        </Button>
      </Card.Body>
    </Card>
  );
}
