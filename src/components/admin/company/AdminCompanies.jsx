import { Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";

export default function AdminCompanies() {
  // Mock data for companies
  const companies = [
    {
      companyId: "C-001",
      name: "Acme Innovations",
      email: "contact@acmeinnovations.com",
      contactPerson: "John Doe",
      totalDonations: "$1,200,000",
      registrationDate: "2024-11-15",
      status: "Active",
    },
    {
      companyId: "C-002",
      name: "Vertex Systems",
      email: "info@vertexsys.com",
      contactPerson: "Jane Smith",
      totalDonations: "$750,000",
      registrationDate: "2025-01-20",
      status: "Pending",
    },
    {
      companyId: "C-003",
      name: "Horizon Analytics",
      email: "support@horizonanalytics.com",
      contactPerson: "Sara Lin",
      totalDonations: "$940,000",
      registrationDate: "2023-09-05",
      status: "Suspended",
    },
  ];

  // Action handlers
  const handleViewDetails = (id) => alert(`Viewing details for ${id}`);
  const handleSuspend = (id) => alert(`Company ${id} suspended`);
  const handleArchive = (id) => alert(`Company ${id} archived`);
  const handleEdit = (id) => alert(`Editing company ${id}`);

  // Dropdown actions (mapped)
  const dropdownActions = [
    { label: "Edit Company", onClick: handleEdit },
    { label: "Suspend Company", onClick: handleSuspend },
    { label: "Archive Company", onClick: handleArchive },
  ];

  // Status color logic
  function getStatusClass(status) {
    const lower = status.toLowerCase();
    if (lower === "active") return "admin-status-completed";
    if (lower === "pending") return "admin-status-waiting";
    if (lower === "suspended") return "admin-status-submitted";
    return "";
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <h3 className="mb-3">All Companies</h3>
        <div className="scrollable-table">
          <Table striped responsive="xxl" className="admin-pending-table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Contact Person</th>
                <th>Total Donations</th>
                <th>Registration Date</th>
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
                  <td>{c.totalDonations}</td>
                  <td>{c.registrationDate}</td>
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
