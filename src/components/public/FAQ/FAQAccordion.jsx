import { Accordion, Container } from "react-bootstrap";

import "./FAQAccordion.css";

function FAQAccordion() {
  return (
    <Container className="faq-container my-5">
      <h2 className="faq-title mb-4 text-center">Commonly Asked Questions</h2>

      <Accordion defaultActiveKey="0" className="custom-accordion">
        {/* GENERAL QUESTIONS */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>General Questions</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>What is this platform and how does it work?</strong>
              <br />
              We connect private company founders with their universities
              through pre-IPO stock donations, helping institutions grow
              endowments and alumni engagement.
            </p>

            <p>
              <strong>Who is this platform for?</strong>
              <br />
              Universities, alumni development teams, and private company
              founders with a philanthropic interest in supporting their alma
              mater.
            </p>

            <p>
              <strong>What types of companies use this service?</strong>
              <br />
              Alumni-founded, venture-backed, or private companies preparing for
              IPOs, acquisitions, or other liquidity events.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* DONATION PROCESS */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Donation Process & Mechanics</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>How is a private stock donation made?</strong>
              <br />
              We guide donors and universities through onboarding,
              documentation, legal review, and custodial setup for shares.
            </p>

            <p>
              <strong>Do universities need to hold the private shares?</strong>
              <br />
              Shares can be held or liquidated depending on your institution's
              policy. We offer guidance on custodial options.
            </p>

            <p>
              <strong>What kind of stock can be donated?</strong>
              <br />
              Common or preferred equity, RSUs, and options may all be eligible
              depending on corporate structure.
            </p>

            <p>
              <strong>Are there valuation or compliance issues?</strong>
              <br />
              We assist with 409A valuations and ensure donations meet IRS
              guidelines for charitable giving.
            </p>

            <p>
              <strong>What fees are involved for the university?</strong>
              <br />
              Our platform is free for universities. Any fees are covered by
              donors or third parties.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* UNIVERSITY-SPECIFIC */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>University-Specific Questions</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>
                What if our university has never accepted private equity before?
              </strong>
              <br />
              We provide tools, documentation, and expert guidance to help your
              institution accept and manage these gifts securely.
            </p>

            <p>
              <strong>
                Can our foundation or endowment office participate?
              </strong>
              <br />
              Yes. We often work with both development and finance offices to
              ensure a smooth process.
            </p>

            <p>
              <strong>
                What support do you offer our legal or finance team?
              </strong>
              <br />
              Access to legal templates, valuation providers, and one-on-one
              support for compliance, review, and planning.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* SECURITY & COMPLIANCE */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Security & Compliance</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>
                Is this compliant with IRS charitable giving rules?
              </strong>
              <br />
              Yes. All donations follow current tax law, with appropriate
              valuation and documentation for donors and institutions.
            </p>

            <p>
              <strong>How is data kept secure?</strong>
              <br />
              We use encrypted storage, secure authentication, and SOC
              2-compliant partners for data handling.
            </p>

            <p>
              <strong>
                What happens if a company doesn't IPO or exits privately?
              </strong>
              <br />
              Shares may be held long-term, and we help structure agreements to
              manage expectations and options for liquidity.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* GETTING STARTED */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Getting Started</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>How do we get started as a university partner?</strong>
              <br />
              Contact us to schedule a demo or create a free account. We'll walk
              you through onboarding and legal readiness.
            </p>

            <p>
              <strong>Can we refer an alumnus or company?</strong>
              <br />
              Absolutely. We'll help you reach out, present the opportunity, and
              handle onboarding with sensitivity.
            </p>

            <p>
              <strong>Do we need to sign any agreements?</strong>
              <br />
              Yes. A standard agreement or MOU may be required to formalize
              participation and custodial details.
            </p>

            <p>
              <strong>How long does the process take?</strong>
              <br />
              Most donations are completed within a few weeks to a couple of
              months depending on complexity and legal review.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default FAQAccordion;
