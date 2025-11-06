import VideoHero from "../../../components/public/how-it-works/howItWorks/VideoHero";
import HowItWorksOverview from "../../../components/public/how-it-works/howItWorks/HowItWorksOverview";
import HowItWorksBenefits from "../../../components/public/how-it-works/howItWorks/HowItWorksBenefits";
import HowItWorksCTA from "../../../components/public/how-it-works/howItWorks/HowItWorksCTA";

export default function HowItWorks() {
  return (
    <div className="how-it-works-page">
      <VideoHero />
      <HowItWorksOverview />
      <HowItWorksBenefits />
      <HowItWorksCTA />
    </div>
  );
}
