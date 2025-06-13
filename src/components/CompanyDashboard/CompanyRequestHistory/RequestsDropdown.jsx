import { Dropdown } from 'react-bootstrap';

export default function RequestsDropdown({ value = 'All', onChange }) {
  const options = ['All', 'Donation'];

  return (
    <Dropdown className="donations-dropdown">
      <Dropdown.Toggle variant="outline-secondary" size="sm">
        {value}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((options, idx) => (
          <Dropdown.Item key={idx} onClick={() => onChange?.(options)}>
            {options}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
