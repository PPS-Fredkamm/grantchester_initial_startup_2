import { Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";

import "./AdminDonations.css";

export default function AdminAllDonations() {
  // Temporary mock data
  const donations = [
    {
      donationId: "773211",
      date: "2025-09-30",
      donor: "John Doe",
      company: "Acme Corp",
      university: "Duke University",
      amount: "$3,200",
      status: "Submitted",
    },
    {
      donationId: "252407",
      date: "2025-09-29",
      donor: "Jane Smith",
      company: "E Corp",
      university: "Clemson University",
      amount: "$1,500",
      status: "Verification by university",
    },
    {
      donationId: "314590",
      date: "2025-09-22",
      donor: "Michael Lane",
      company: "Horizon Holdings",
      university: "Rowan University",
      amount: "$9,400",
      status: "Completed",
    },
    {
      donationId: "587420",
      date: "2025-09-10",
      donor: "Sara Lin",
      company: "Vertex Systems",
      university: "Penn State",
      amount: "$7,800",
      status: "Waiting approval",
    },
  ];

  // Placeholder action handlers
  const handleViewDetails = (id) => {
    console.log(`View Details clicked for donation ${id}`);
    alert(`Viewing details for donation ${id} (placeholder action)`);
  };

  const handleMarkCompleted = (id) => {
    console.log(`Mark Completed clicked for donation ${id}`);
    alert(`Donation ${id} marked completed (placeholder action)`);
  };

  const handleArchive = (id) => {
    console.log(`Archive clicked for donation ${id}`);
    alert(`Donation ${id} archived (placeholder action)`);
  };

  // Array of dropdown actions
  const dropdownActions = [
    { label: "View Details", onClick: handleViewDetails },
    { label: "Mark as Completed", onClick: handleMarkCompleted },
    { label: "Archive Donation", onClick: handleArchive },
  ];

  function getStatusClass(status) {
    const lower = status.toLowerCase();
    if (lower === "completed") return "admin-status-completed";
    if (lower.includes("waiting")) return "admin-status-waiting";
    if (lower.includes("verification")) return "admin-status-verifying";
    if (lower.includes("submitted")) return "admin-status-submitted";
    return "";
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <h3 className="mb-3">All Donations</h3>
        <div className="scrollable-table">
          <Table striped responsive="xxl" className="admin-pending-table">
            <thead>
              <tr>
                <th>Donation ID</th>
                <th>Date</th>
                <th>Donor</th>
                <th>Company</th>
                <th>University</th>
                <th>Amount</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.donationId}>
                  <td>
                    <span className="admin-pending-cell">
                      <GoDotFill color="#4B9DE7" />#{d.donationId}
                    </span>
                  </td>
                  <td>{d.date}</td>
                  <td>{d.donor}</td>
                  <td>{d.company}</td>
                  <td>{d.university}</td>
                  <td>{d.amount}</td>
                  <td>
                    <span
                      className={`admin-pending-cell status-pill ${getStatusClass(
                        d.status
                      )}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <DropdownButton
                      id={`dropdown-${d.donationId}`}
                      title="Actions"
                      size="sm"
                      variant="outline-secondary"
                    >
                      {dropdownActions.map((action) => (
                        <Dropdown.Item
                          key={action.label}
                          className={action.textStyle || ""}
                          onClick={() => action.onClick(d.donationId)}
                        >
                          {action.label}
                        </Dropdown.Item>
                      ))}
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
