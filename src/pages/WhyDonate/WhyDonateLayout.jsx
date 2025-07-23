import WhyPrivate from "../../components/WhyDonate/WhyPrivate/WhyPrivate"
import WhatPlatformDoes from "../../components/WhyDonate/WhatPlatformDoes/WhatPlatformDoes"
import BenefitsofDonating from "../../components/WhyDonate/BenefitsofDonating/BenefitsofDonating"
import ImpactofDonation from "../../components/WhyDonate/ImpactofDonation/ImpactofDonation"
import ContactUs from "../../components/SideBySide/ContactUs/ContactUs";
export default function WhyDonateLayout() {
  return (
    <>
<WhatPlatformDoes />
<WhyPrivate />
<BenefitsofDonating />
<ImpactofDonation />
   <ContactUs /> </>
  );
}
