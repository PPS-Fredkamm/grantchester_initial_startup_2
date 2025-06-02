import React, { useState } from 'react';
import { Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import './WebBanner.css';

function WebBanner() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', query); // You can replace this with actual search logic
  };

  return (
    <div className="web-banner-overlay">
      <Container className="text-center">
        <h2 className="web-banner-title">Welcome to Alumbiz</h2>
        <p className="web-banner-subtitle">Connect, collaborate, and grow your alumni network.</p>

        <Form onSubmit={handleSearch} className="web-banner-search">
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search alumni, events, or resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </div>
  );
}

export default WebBanner;
