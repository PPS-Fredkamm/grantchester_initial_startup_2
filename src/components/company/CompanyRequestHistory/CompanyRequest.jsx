import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';

import RequestsDropdown from './RequestsDropdown';

import './CompanyRequest.css';

export default function CompanyRequest() {
  const [filter, setFilter] = useState('All');

  const donations = [
    {
      requestId: '202509',
      sender: 'John Doe',
      reason: 'Donation',
      receiver: 'University of Pennsylvania',
      shareTotal: '7',
    },
    {
      requestId: '202510',
      sender: 'Jane Smith',
      reason: 'Donation',
      receiver: 'University of Pennsylvania',
      shareTotal: '5',
    },
    {
      requestId: '202510',
      sender: 'Jane Smith',
      reason: 'Donation',
      receiver: 'University of Pennsylvania',
      shareTotal: '5',
    },
  ];

  // function getStatusClass(status) {
  //   if (status.toLowerCase() === 'completed') return 'status-completed';
  //   if (status.toLowerCase().includes('waiting')) return 'status-waiting';
  //   if (status.toLowerCase().includes('verification'))
  //     return 'status-verifying';
  //   return '';
  // }

  const filteredDonations = donations.filter((d) => {
    if (filter === 'All') return true;
    if (filter === 'Donation') return d.reason.toLowerCase() === 'donation';
    // if (filter === 'Waiting Approval')
    //   return d.status.toLowerCase().includes('waiting');
    // if (filter === 'Verifying')
    //   return d.status.toLowerCase().includes('verification');
    return true;
  });

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="donations-header">
          <Card.Title>Requests</Card.Title>
          <RequestsDropdown value={filter} onChange={setFilter} />
        </div>

        <Table responsive="lg" striped className="donations-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>From</th>
              <th>Reason</th>
              <th>To</th>
              <th># of Units</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonations.map((d, idx) => (
              <tr className="text-nowrap" key={idx}>
                <td>
                  <span>#{d.requestId}</span>
                </td>
                <td>
                  <span>{d.sender}</span>
                </td>
                <td>
                  <span className="reason-pill">{d.reason}</span>
                </td>
                <td>
                  <span>{d.receiver}</span>
                </td>
                <td>
                  <span>{d.shareTotal}</span>
                </td>
              </tr>
            ))}
            {filteredDonations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No donations match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
