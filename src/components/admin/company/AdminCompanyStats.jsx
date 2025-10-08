import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";

export default function AdminCompanyStats() {
  const stats = {
    totalCompanies: 87,
    activeCompanies: 72,
    pendingApproval: 10,
    suspendedCompanies: 5,
    totalDonationsContributed: "$24,680,000",
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          {/* Total Companies */}
          <div className="stat-block">
            <div className="stat-value">{stats.totalCompanies}</div>
            <div className="stat-label">
              <span>Total Companies</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-companies">
                    Total number of companies registered on the platform
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Active Companies */}
          <div className="stat-block">
            <div className="stat-value">{stats.activeCompanies}</div>
            <div className="stat-label">
              <span>Active Companies</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-active-companies">
                    Companies currently active and able to make donations
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Pending Approval */}
          <div className="stat-block">
            <div className="stat-value">{stats.pendingApproval}</div>
            <div className="stat-label">
              <span>Pending Approval</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-pending-approval">
                    Companies still awaiting admin approval or verification
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
            <div className="stat-value">{stats.suspendedCompanies}</div>
            <div className="stat-label">
              <span>Suspended</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-suspended-companies">
                    Companies currently restricted due to compliance or account
                    issues
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
            <div className="stat-value">{stats.totalDonationsContributed}</div>
            <div className="stat-label">
              <span>Total Donations</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-donations">
                    Combined total of all donations made by registered companies
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
