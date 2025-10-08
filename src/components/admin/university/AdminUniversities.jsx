import { Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";

export default function AdminUniversities() {
  const universities = [
    {
      universityId: "U-501",
      name: "Riverside University",
      email: "admin@riverside.edu",
      contactPerson: "Dr. Alan Moore",
      totalDonations: "$1,850,000",
      registrationDate: "2024-09-18",
      status: "Active",
    },
    {
      universityId: "U-502",
      name: "Summit State University",
      email: "office@summitstate.edu",
      contactPerson: "Daniel Lee",
      totalDonations: "$910,000",
      registrationDate: "2025-02-04",
      status: "Suspended",
    },
    {
      universityId: "U-503",
      name: "Brighton College",
      email: "info@brightoncollege.org",
      contactPerson: "Sarah Park",
      totalDonations: "$2,420,000",
      registrationDate: "2023-12-12",
      status: "Active",
    },
  ];

  const handleEdit = (id) => alert(`Editing ${id}`);
  const handleSuspend = (id) => alert(`Suspending ${id}`);
  const handleArchive = (id) => alert(`Archiving ${id}`);
  const handleViewDetails = (id) => alert(`Viewing details for ${id}`);

  const dropdownActions = [
    { label: "Edit University", onClick: handleEdit },
    { label: "Suspend University", onClick: handleSuspend },
    { label: "Archive University", onClick: handleArchive },
  ];

  function getStatusClass(status) {
    const lower = status.toLowerCase();
    if (lower === "active") return "admin-status-completed";
    if (lower === "suspended") return "admin-status-submitted";
    return "";
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <h3 className="mb-3">All Universities</h3>
        <div className="scrollable-table">
          <Table striped responsive="xxl" className="admin-pending-table">
            <thead>
              <tr>
                <th>University ID</th>
                <th>University Name</th>
                <th>Email</th>
                <th>Contact Person</th>
                <th>Total Donations</th>
                <th>Registration Date</th>
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
                  <td>{u.totalDonations}</td>
                  <td>{u.registrationDate}</td>
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
