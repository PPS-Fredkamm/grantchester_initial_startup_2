import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";

export default function AdminUniversityStats() {
  const stats = {
    totalUniversities: 36,
    activeUniversities: 29,
    pendingVerification: 4,
    suspendedUniversities: 3,
    totalDonationsReceived: "$18,920,000",
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          {/* Total Universities */}
          <div className="stat-block">
            <div className="stat-value">{stats.totalUniversities}</div>
            <div className="stat-label">
              <span>Total Universities</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-universities">
                    Total universities registered on the platform
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Active Universities */}
          <div className="stat-block">
            <div className="stat-value">{stats.activeUniversities}</div>
            <div className="stat-label">
              <span>Active Universities</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-active-universities">
                    Universities actively receiving or managing donations
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Pending Verification */}
          <div className="stat-block">
            <div className="stat-value">{stats.pendingVerification}</div>
            <div className="stat-label">
              <span>Pending Verification</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-pending-verification">
                    Universities awaiting admin verification or setup completion
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Suspended */}
          <div className="stat-block">
            <div className="stat-value">{stats.suspendedUniversities}</div>
            <div className="stat-label">
              <span>Suspended</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-suspended-universities">
                    Universities temporarily restricted due to compliance or
                    inactivity
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Donations */}
          <div className="stat-block">
            <div className="stat-value">{stats.totalDonationsReceived}</div>
            <div className="stat-label">
              <span>Total Donations</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-donations">
                    Combined donation value received by all universities
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
