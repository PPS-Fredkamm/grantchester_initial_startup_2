import { Card } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FiMoreHorizontal } from 'react-icons/fi';
import { FaCircleInfo } from 'react-icons/fa6';

import './DonorStats.css';

export default function DonorStats() {
  const stats = {
    studentsImpacted: 5,
    unitsDonated: 0,
    totalValue: '$25,000',
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="donor-stats">
          <div className="stat-block">
            <div className="stat-value">{stats.studentsImpacted}</div>
            <div className="stat-label">
              <span>Affected Over</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    This is the number of students impacted.
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.unitsDonated}</div>
            <div className="stat-label">
              <span>Units Donated</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    This is the number of units the donor has contributed.
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.totalValue}</div>
            <div className="stat-label">
              <span>Total Amount</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    This reflects the total dollar value of the units donated.
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>
          <FiMoreHorizontal className="more-stats-icon" />
        </div>
      </Card.Body>
    </Card>
  );
}
