import DonorHero from "../../../../components/marketing/forDonors/DonorHero";
import DonorBenefits from "../../../../components/marketing/forDonors/DonorBenefits";
import DonorProcess from "../../../../components/marketing/forDonors/DonorProcess";
import DonorFeatures from "../../../../components/marketing/forDonors/DonorFeatures";
import DonorCTA from "../../../../components/marketing/forDonors/DonorCTA";

import "./ForDonors.css";

export default function ForDonors() {
  return (
    <div className="for-donors-page">
      <DonorHero />
      <DonorBenefits />
      <DonorProcess />
      <DonorFeatures />
      <DonorCTA />
    </div>
  );
}
