import { useState } from 'react';
import { Card, Table, Form } from 'react-bootstrap';
import './universityDonationsLink.css';

export default function AllDonationsTable() {
  const [sortConfig, setSortConfig] = useState({ key: 'donationId', direction: 'asc' });
  const [globalFilter, setGlobalFilter] = useState('');

  const donations = [
    {
      donationId: '1001',
      donor: 'John Smith',
      amount: 2000,
      date: '2025-07-01',
      type: 'Stock',
      shares: 10,
      price: 200,
      status: 'Completed',
    },
    {
      donationId: '1002',
      donor: 'Emily Johnson',
      amount: 1500,
      date: '2025-07-03',
      type: 'Cash',
      shares: 0,
      price: 0,
      status: 'Waiting approval',
    },
    {
      donationId: '1003',
      donor: 'Michael Brown',
      amount: 3000,
      date: '2025-07-04',
      type: 'Stock',
      shares: 15,
      price: 180,
      status: 'New',
    },
  ];

  function getStatusClass(status) {
    if (status.toLowerCase() === 'completed') return 'status-completed';
    if (status.toLowerCase().includes('waiting')) return 'status-waiting';
    if (status.toLowerCase().includes('New')) return 'status-verifying';
    return '';
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = donations.filter((donation) => {
    const search = globalFilter.toLowerCase();
    return Object.values(donation).some((value) =>
      String(value).toLowerCase().includes(search)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    } else {
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    }
  });

  const headers = [
    { label: 'Donation ID', key: 'donationId' },
    { label: 'Donor', key: 'donor' },
    { label: 'Amount', key: 'amount' },
    { label: 'Date', key: 'date' },
    { label: 'Donation Type', key: 'type' },
    { label: 'Share Total', key: 'shares' },
    { label: 'Price', key: 'price' },
    { label: 'Market Value', key: 'marketValue' },
    { label: 'Status', key: 'status' },
  ];

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="donations-header align-items-end">
          <Card.Title className="mb-0">All Donations</Card.Title>
          <Form.Control
            size="sm"
            placeholder="Search across all fields..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="search-bar"
          />
        </div>

        <Table responsive striped className="donations-table align-middle mt-3">
          <thead>
            <tr className="text-nowrap">
              {headers.map(({ label, key }) => (
                <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                  {label}{' '}
                  {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((d, idx) => (
              <tr key={idx} className="text-nowrap">
                <td>#{d.donationId}</td>
                <td>{d.donor}</td>
                <td>${d.amount.toLocaleString()}</td>
                <td>{d.date}</td>
                <td>{d.type}</td>
                <td>{d.shares}</td>
                <td>${d.price.toFixed(2)}</td>
                <td>${(d.shares * d.price).toFixed(2)}</td>
                <td>
                  <span className={`status-pill ${getStatusClass(d.status)}`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="text-center">
                  No donations match your search.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
