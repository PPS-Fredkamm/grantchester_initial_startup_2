import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { FiMoreHorizontal } from "react-icons/fi";
import { FaCircleInfo } from "react-icons/fa6";

export default function AdminUserStats() {
  const stats = {
    totalUsers: 158,
    activeUsers: 142,
    suspendedUsers: 6,
    universities: 12,
    admins: 5,
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          <div className="stat-block">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">
              <span>Total Users</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-totalUsers">
                    Total number of registered users in the system
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.activeUsers}</div>
            <div className="stat-label">
              <span>Active Users</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-activeUsers">
                    Users who currently have active accounts
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.universities}</div>
            <div className="stat-label">
              <span>Universities</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-universities">
                    Distinct universities represented by registered users
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-block">
            <div className="stat-value">{stats.admins}</div>
            <div className="stat-label">
              <span>Admins</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-admins">
                    Number of users with admin privileges
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
