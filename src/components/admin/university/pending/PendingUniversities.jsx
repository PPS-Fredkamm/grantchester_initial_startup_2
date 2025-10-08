import { Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";

export default function PendingUniversities() {
  // Mock data for pending universities
  const universities = [
    {
      universityId: "PU-201",
      name: "Riverside University",
      email: "admin@riverside.edu",
      contactPerson: "Dr. Alan Moore",
      submittedDate: "2025-10-03",
      status: "Under Review",
    },
    {
      universityId: "PU-202",
      name: "Starlight College",
      email: "info@starlightcollege.org",
      contactPerson: "Susan Turner",
      submittedDate: "2025-10-01",
      status: "Pending Verification",
    },
    {
      universityId: "PU-203",
      name: "Summit State University",
      email: "office@summitstate.edu",
      contactPerson: "Daniel Lee",
      submittedDate: "2025-09-28",
      status: "Awaiting Approval",
    },
  ];

  // Action handlers
  const handleApprove = (id) => alert(`University ${id} approved`);
  const handleReject = (id) => alert(`University ${id} rejected`);
  const handleRequestInfo = (id) =>
    alert(`Requesting additional info for ${id}`);
  const handleViewDetails = (id) => alert(`Viewing details for ${id}`);

  const dropdownActions = [
    { label: "Approve", onClick: handleApprove },
    { label: "Reject", onClick: handleReject, textStyle: "text-danger" },
    { label: "Request Info", onClick: handleRequestInfo },
  ];

  function getStatusClass(status) {
    const lower = status.toLowerCase();
    if (lower.includes("review")) return "admin-status-waiting";
    if (lower.includes("verification")) return "admin-status-verifying";
    if (lower.includes("approval")) return "admin-status-submitted";
    return "";
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <h3 className="mb-3">Pending University Registrations</h3>
        <div className="scrollable-table">
          <Table striped responsive="xxl" className="admin-pending-table">
            <thead>
              <tr>
                <th>University ID</th>
                <th>University Name</th>
                <th>Email</th>
                <th>Contact Person</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {universities.map((u) => (
                <tr key={u.universityId}>
                  <td>
                    <span className="admin-pending-cell">
                      <GoDotFill color="#4B9DE7" />
                      {u.universityId}
                    </span>
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.contactPerson}</td>
                  <td>{u.submittedDate}</td>
                  <td>
                    <span
                      className={`admin-pending-cell status-pill ${getStatusClass(
                        u.status
                      )}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <DropdownButton
                      id={`dropdown-${u.universityId}`}
                      title="Actions"
                      size="sm"
                      variant="outline-secondary"
                    >
                      {dropdownActions.map((action) => (
                        <Dropdown.Item
                          key={action.label}
                          className={action.textStyle || ""}
                          onClick={() => action.onClick(u.universityId)}
                        >
                          {action.label}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => handleViewDetails(u.universityId)}
                      >
                        View Details
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
