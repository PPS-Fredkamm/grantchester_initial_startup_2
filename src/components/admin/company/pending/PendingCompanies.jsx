import { Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";

export default function PendingCompanies() {
  // Mock data for pending company registrations
  const companies = [
    {
      companyId: "PC-101",
      name: "NovaTech Labs",
      email: "info@novatechlabs.com",
      contactPerson: "Emma Johnson",
      submittedDate: "2025-09-29",
      status: "Under Review",
    },
    {
      companyId: "PC-102",
      name: "Summit Holdings",
      email: "contact@summitholdings.com",
      contactPerson: "Michael Green",
      submittedDate: "2025-10-02",
      status: "Pending Verification",
    },
    {
      companyId: "PC-103",
      name: "Orion Industries",
      email: "admin@orionind.com",
      contactPerson: "Lily Chen",
      submittedDate: "2025-10-04",
      status: "Awaiting Approval",
    },
  ];

  // Placeholder action handlers
  const handleApprove = (id) =>
    alert(`Company ${id} approved (placeholder action)`);
  const handleReject = (id) =>
    alert(`Company ${id} rejected (placeholder action)`);
  const handleRequestInfo = (id) =>
    alert(`Requesting additional info for ${id} (placeholder action)`);
  const handleViewDetails = (id) =>
    alert(`Viewing details for ${id} (placeholder action)`);

  // Dropdown action list
  const dropdownActions = [
    { label: "Approve", onClick: handleApprove },
    { label: "Reject", onClick: handleReject, textStyle: "text-danger" },
    { label: "Request Info", onClick: handleRequestInfo },
  ];

  // Status color classes
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
        <h3 className="mb-3">Pending Company Registrations</h3>
        <div className="scrollable-table">
          <Table striped responsive="xxl" className="admin-pending-table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Contact Person</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.companyId}>
                  <td>
                    <span className="admin-pending-cell">
                      <GoDotFill color="#4B9DE7" />
                      {c.companyId}
                    </span>
                  </td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.contactPerson}</td>
                  <td>{c.submittedDate}</td>
                  <td>
                    <span
                      className={`admin-pending-cell status-pill ${getStatusClass(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <DropdownButton
                      id={`dropdown-${c.companyId}`}
                      title="Actions"
                      size="sm"
                      variant="outline-secondary"
                    >
                      {dropdownActions.map((action) => (
                        <Dropdown.Item
                          key={action.label}
                          className={action.textStyle || ""}
                          onClick={() => action.onClick(c.companyId)}
                        >
                          {action.label}
                        </Dropdown.Item>
                      ))}

                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => handleViewDetails(c.companyId)}
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
