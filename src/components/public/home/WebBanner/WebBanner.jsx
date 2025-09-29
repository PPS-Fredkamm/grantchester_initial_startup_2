import { useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";

import { useSelector } from "react-redux";

import HomeBanner from "../../../../assets/images/HomeBanner2.png";
import "./WebBanner.css";

export default function WebBanner() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileCDO = useSelector((state) => state.auth.profileCDO);

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", query);
  };

  return (
    <div className="web-banner-wrapper">
      <img src={HomeBanner} alt="Web Banner" className="web-banner-image" />
      <div className="web-banner-content text-center">
        <Container>
          {isAuthenticated ? (
            <>
              <h2 className="web-banner-title">
                Welcome back, {profileCDO?.firstName || "Alum"}!
              </h2>
              <p className="web-banner-subtitle">
                Manage your private stock donations, track valuations, and view
                your contribution history.
              </p>

              <div className="web-banner-cta">
                <Button className="dashboard-btn" href="/donor">
                  Go to Dashboard
                </Button>
                <Button className="profile-btn" href="/profile">
                  View Profile
                </Button>
              </div>

              {/* Search bar only for signed-in users */}
              <Form onSubmit={handleSearch} className="web-banner-search">
                <InputGroup>
                  <FormControl
                    type="search"
                    placeholder="Search stock grants or participating universities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search"
                  />
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </>
          ) : (
            <>
              <h2 className="web-banner-title">Welcome to AlumBiz</h2>
              <Button className="get-started-btn" href="/how-it-works">
                Get Started
              </Button>
              <p className="web-banner-subtitle">
                Sign in to connect with your university and manage your private
                stock donations.
              </p>
              <div className="web-banner-cta">
                <Button className="sign-in-btn me-3" href="/login">
                  Sign In
                </Button>
                <Button className="create-account-btn" href="/signup">
                  Create Account
                </Button>
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}
