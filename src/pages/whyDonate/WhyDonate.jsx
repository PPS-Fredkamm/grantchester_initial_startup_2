import WhyPrivate from "../../components/WhyDonate/WhyPrivate/WhyPrivate";
import WhatPlatformDoes from "../../components/WhyDonate/WhatPlatformDoes/WhatPlatformDoes";
import BenefitsOfDonating from "../../components/whyDonate/BenefitsOfDonating/BenefitsOfDonating";
import ImpactOfDonation from "../../components/whyDonate/ImpactOfDonation/ImpactOfDonation";
import ContactUs from "../../components/SideBySide/ContactUs/ContactUs";

export default function WhyDonate() {
  return (
    <>
      <WhatPlatformDoes />
      <WhyPrivate />
      <BenefitsOfDonating />
      <ImpactOfDonation />
      <ContactUs />{" "}
    </>
  );
}
