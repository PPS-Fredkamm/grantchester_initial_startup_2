import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Badge } from 'react-bootstrap';

const initialUsers = [
  { id: 1, name: 'Drew Senour', email: 'drew@example.com', role: 'Admin' },
  { id: 2, name: 'Alex Jordan', email: 'alex@example.com', role: 'Editor' },
];

const roles = ['Admin', 'Editor', 'Viewer'];

export default function UniversityUserTeamSection() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    setUsers([
      ...users,
      {
        ...newUser,
        id: Date.now(), // mock ID
      },
    ]);

    // Reset form
    setNewUser({ name: '', email: '', role: 'Viewer' });
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  const handleRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-3">
      <h5 className="mb-4">Users & Teams</h5>

      <Form onSubmit={handleAddUser} className="mb-4">
        <Row className="align-items-end g-2">
          <Col md={4}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Full name"
            />
          </Col>
          <Col md={4}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email address"
            />
          </Col>
          <Col md={2}>
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button type="submit" className="w-100">Invite</Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, role }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={role}
                  onChange={(e) => handleRoleChange(id, e.target.value)}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </Form.Select>
              </td>
              <td className="text-end">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemove(id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
