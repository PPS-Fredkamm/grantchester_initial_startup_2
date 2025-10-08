import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

import { FaCircleInfo } from "react-icons/fa6";

export default function AdminDonationStats() {
  // Mock totals for now – will later come from backend/Redux
  const stats = {
    totalDonations: 248,
    universitiesInvolved: 12,
    totalValue: "$18,450,000",
    averageDonation: "$74,395",
    completedDonations: 189,
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          {/* Total Donations */}
          <div className="stat-block">
            <div className="stat-value">{stats.totalDonations}</div>
            <div className="stat-label">
              <span>Total Donations</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-donations">
                    Total number of all donations submitted through the platform
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Total Value */}
          <div className="stat-block">
            <div className="stat-value">{stats.totalValue}</div>
            <div className="stat-label">
              <span>Total Donation Value</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-value">
                    Combined estimated dollar value of all donations recorded
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Average Donation */}
          <div className="stat-block">
            <div className="stat-value">{stats.averageDonation}</div>
            <div className="stat-label">
              <span>Average Donation</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-average-donation">
                    Average dollar value per donation across the system
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Universities Involved */}
          <div className="stat-block">
            <div className="stat-value">{stats.universitiesInvolved}</div>
            <div className="stat-label">
              <span>Universities Involved</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-universities">
                    Number of universities currently receiving or managing
                    donations
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Completed Donations */}
          <div className="stat-block">
            <div className="stat-value">{stats.completedDonations}</div>
            <div className="stat-label">
              <span>Completed Donations</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-completed">
                    Number of donations that have completed the verification and
                    approval process
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
