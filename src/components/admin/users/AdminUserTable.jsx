import { Card, Table, Dropdown, DropdownButton } from "react-bootstrap";

// import "./Pending.css";

export default function AdminUsers() {
  //  Placeholder user list
  const users = [
    {
      userId: "101",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Donor",
      status: "Active",
    },
    {
      userId: "102",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "University",
      status: "Pending",
    },
    {
      userId: "103",
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
    },
  ];

  // 🔹 Placeholder action handlers
  const handleViewProfile = (id) => {
    console.log(`Viewing profile for user ${id}`);
    alert(`Viewing profile for user ${id} (placeholder action)`);
  };

  const handleEditRole = (id) => {
    console.log(`Editing role for user ${id}`);
    alert(`Editing role for user ${id} (placeholder action)`);
  };

  const handleSuspend = (id) => {
    console.log(`Suspending user ${id}`);
    alert(`User ${id} suspended (placeholder action)`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting user ${id}`);
    alert(`User ${id} deleted (placeholder action)`);
  };

  // Dropdown actions to map
  const dropdownActions = [
    { label: "View Profile", onClick: handleViewProfile },
    { label: "Edit Role", onClick: handleEditRole },
    { label: "Suspend User", onClick: handleSuspend },
  ];

  return (
    <Card className="shadow">
      <Card.Body>
        <h4 className="mb-3">All Users</h4>
        <div className="scrollable-table">
          <Table striped responsive="xxl" className="admin-pending-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td>#{u.userId}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td>
                    <DropdownButton
                      id={`dropdown-${u.userId}`}
                      title="Actions"
                      size="sm"
                      variant="outline-secondary"
                    >
                      {/* Dynamically mapped actions */}
                      {dropdownActions.map((action) => (
                        <Dropdown.Item
                          key={action.label}
                          onClick={() => action.onClick(u.userId)}
                        >
                          {action.label}
                        </Dropdown.Item>
                      ))}

                      {/* Hardcoded divider + final destructive action */}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handleDelete(u.userId)}
                      >
                        Delete User
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
