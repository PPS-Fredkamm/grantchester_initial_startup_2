import { Accordion, Container } from "react-bootstrap";

import "./FAQAccordion.css";

function FAQAccordion() {
  const faqData = [
    {
      eventKey: "0",
      header: "General Questions",
      questions: [
        {
          question: "What is this platform and how does it work?",
          answer:
            "We connect private company founders with their universities through pre-IPO stock donations, helping institutions grow endowments and alumni engagement.",
        },
        {
          question: "Who is this platform for?",
          answer:
            "Universities, alumni development teams, and private company founders with a philanthropic interest in supporting their alma mater.",
        },
        {
          question: "What types of companies use this service?",
          answer:
            "Alumni-founded, venture-backed, or private companies preparing for IPOs, acquisitions, or other liquidity events.",
        },
      ],
    },
    {
      eventKey: "1",
      header: "Donation Process & Mechanics",
      questions: [
        {
          question: "How is a private stock donation made?",
          answer:
            "We guide donors and universities through onboarding, documentation, legal review, and custodial setup for shares.",
        },
        {
          question: "Do universities need to hold the private shares?",
          answer:
            "Shares can be held or liquidated depending on your institution's policy. We offer guidance on custodial options.",
        },
        {
          question: "What kind of stock can be donated?",
          answer:
            "Common or preferred equity, RSUs, and options may all be eligible depending on corporate structure.",
        },
        {
          question: "Are there valuation or compliance issues?",
          answer:
            "We assist with 409A valuations and ensure donations meet IRS guidelines for charitable giving.",
        },
        {
          question: "What fees are involved for the university?",
          answer:
            "Our platform is free for universities. Any fees are covered by donors or third parties.",
        },
      ],
    },
    {
      eventKey: "2",
      header: "University-Specific Questions",
      questions: [
        {
          question:
            "What if our university has never accepted private equity before?",
          answer:
            "We provide tools, documentation, and expert guidance to help your institution accept and manage these gifts securely.",
        },
        {
          question: "Can our foundation or endowment office participate?",
          answer:
            "Yes. We often work with both development and finance offices to ensure a smooth process.",
        },
        {
          question: "What support do you offer our legal or finance team?",
          answer:
            "Access to legal templates, valuation providers, and one-on-one support for compliance, review, and planning.",
        },
      ],
    },
    {
      eventKey: "3",
      header: "Security & Compliance",
      questions: [
        {
          question: "Is this compliant with IRS charitable giving rules?",
          answer:
            "Yes. All donations follow current tax law, with appropriate valuation and documentation for donors and institutions.",
        },
        {
          question: "How is data kept secure?",
          answer:
            "We use encrypted storage, secure authentication, and SOC 2-compliant partners for data handling.",
        },
        {
          question:
            "What happens if a company doesn't IPO or exits privately?",
          answer:
            "Shares may be held long-term, and we help structure agreements to manage expectations and options for liquidity.",
        },
      ],
    },
    {
      eventKey: "4",
      header: "Getting Started",
      questions: [
        {
          question: "How do we get started as a university partner?",
          answer:
            "Contact us to schedule a demo or create a free account. We'll walk you through onboarding and legal readiness.",
        },
        {
          question: "Can we refer an alumnus or company?",
          answer:
            "Absolutely. We'll help you reach out, present the opportunity, and handle onboarding with sensitivity.",
        },
        {
          question: "Do we need to sign any agreements?",
          answer:
            "Yes. A standard agreement or MOU may be required to formalize participation and custodial details.",
        },
        {
          question: "How long does the process take?",
          answer:
            "Most donations are completed within a few weeks to a couple of months depending on complexity and legal review.",
        },
      ],
    },
  ];

  return (
    <Container className="faq-container my-5">
      <h2 className="faq-title mb-4 text-center">Commonly Asked Questions</h2>

      <Accordion defaultActiveKey="0" className="custom-accordion">
        {faqData.map((section) => (
          <Accordion.Item key={section.eventKey} eventKey={section.eventKey}>
            <Accordion.Header>{section.header}</Accordion.Header>
            <Accordion.Body>
              {section.questions.map((qa, index) => (
                <p key={index}>
                  <strong>{qa.question}</strong>
                  <br />
                  {qa.answer}
                </p>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default FAQAccordion;
