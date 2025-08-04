import BannerCarousel from '../../components/home/Carousel/BannerCarousel';
import SubBanner from '../../components/home/SubBanner/SubBanner';
import WebBanner from '../../components/home/WebBanner/WebBanner';
import SecondaryBanner from '../../components/home/SecondaryBanner/SecondaryBanner';
import LogoScroller from '../../components/home/LogoScroller/LogoScroller';
import Dartmouth from '../../assets/images/LogoScrollerImages/dartmouth.jpg';
import Drexel from '../../assets/images/LogoScrollerImages/drexel.jpg';
import Yale from '../../assets/images/LogoScrollerImages/yale.png';
import USC from '../../assets/images/LogoScrollerImages/USC.png';

import './Home.css';

export default function Home() {
  const logoList = [Dartmouth, Yale, USC, Drexel];
  
  return (
    <>
      <SubBanner />
      <WebBanner />
      <LogoScroller logos={logoList} speed={25} height={50} />
      <SecondaryBanner />
      {/* <BannerCarousel /> */}
    </>
  );
}
