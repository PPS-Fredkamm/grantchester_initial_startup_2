import HowItWorksHero from "../../../components/marketing/howItWorks/HowItWorksHero";
import HowItWorksOverview from "../../../components/marketing/howItWorks/HowItWorksOverview";
import HowItWorksBenefits from "../../../components/marketing/howItWorks/HowItWorksBenefits";
import HowItWorksCTA from "../../../components/marketing/howItWorks/HowItWorksCTA";

import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <div className="how-it-works-page">
      <HowItWorksHero />
      <HowItWorksOverview />
      <HowItWorksBenefits />
      <HowItWorksCTA />
    </div>
  );
}
