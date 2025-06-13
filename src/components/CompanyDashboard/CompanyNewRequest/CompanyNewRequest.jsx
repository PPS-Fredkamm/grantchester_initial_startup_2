import { Card, Table } from 'react-bootstrap';
import { GoDotFill } from 'react-icons/go';
import { FiMoreHorizontal } from 'react-icons/fi';

import './CompanyNewRequest.css';

export default function CompanyNewRequest() {
  const pendingOrders = [
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
  ];

  // function getStatusClass(status) {
  //   if (status.toLowerCase() === 'completed') return 'status-completed';
  //   if (status.toLowerCase().includes('waiting')) return 'status-waiting';
  //   if (status.toLowerCase().includes('verification'))
  //     return 'status-verifying';
  //   return '';
  // }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <Table responsive="xxl" className="pending-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>From</th>
              <th>Reason</th>
              <th>To</th>
              <th># of Shares</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((d, idx) => (
              <tr key={idx}>
                <td>
                  <span className="pending-cell">
                    <GoDotFill color="#4B9DE7" />#{d.requestId}
                  </span>
                </td>
                <td className="text-nowrap">
                  <span className="pending-cell">{d.sender}</span>
                </td>
                <td className="text-nowrap">
                  <span className="pending-cell reason-pill">{d.reason}</span>
                </td>
                <td className="text-nowrap">
                  <span className="pending-cell">{d.receiver}</span>
                </td>
                <td className="text-nowrap">
                  <span className="pending-cell">{d.shareTotal}</span>
                </td>
                <td>
                  <FiMoreHorizontal className="more-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
