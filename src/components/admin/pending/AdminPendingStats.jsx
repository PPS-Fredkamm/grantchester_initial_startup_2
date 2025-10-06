import { Card, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";

// import { FiMoreHorizontal } from "react-icons/fi";
import { FaCircleInfo } from "react-icons/fa6";

export default function AdminPendingStats() {
  const stats = {
    pendingCount: 12,
    universitiesInvolved: 4,
    totalPendingValue: "$2,450,000",
    averageDonation: "$204,000",
    oldestPendingDays: 37,
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          <div className="stat-block">
            <div className="stat-value">{stats.pendingCount}</div>
            <div className="stat-label">
              <span>Pending Donations</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    Total number of donations still awaiting approval
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.totalPendingValue}</div>
            <div className="stat-label">
              <span>Total Pending Value</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    Combined estimated dollar value of all pending donations
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.averageDonation}</div>
            <div className="stat-label">
              <span>Average Donation</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    Average value per pending donation
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.oldestPendingDays} Days</div>
            <div className="stat-label">
              <span>Oldest Pending</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-affected">
                    Age of the oldest pending donation in days
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>
          {/* <FiMoreHorizontal className="more-stats-icon" /> */}
        </div>
      </Card.Body>
    </Card>
  );
}
