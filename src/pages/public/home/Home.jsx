// import BannerCarousel from '../../components/home/Carousel/BannerCarousel';
import PublicBanner from '../../../components/public/banner/PublicBanner';
import WebBanner from '../../../components/public/home/WebBanner/WebBanner';
import SecondaryBanner from '../../../components/public/home/SecondaryBanner/SecondaryBanner';
import LogoScroller from '../../../components/public/home/LogoScroller/LogoScroller';
import Dartmouth from '../../../assets/images/LogoScrollerImages/dartmouth.jpg';
import Drexel from '../../../assets/images/LogoScrollerImages/drexel.jpg';
import Yale from '../../../assets/images/LogoScrollerImages/yale.png';
import USC from '../../../assets/images/LogoScrollerImages/USC.png';
import Dartmouth1 from '../../../assets/images/LogoScrollerImages/dartmouth.jpg';
import Drexel1 from '../../../assets/images/LogoScrollerImages/drexel.jpg';
import Yale1 from '../../../assets/images/LogoScrollerImages/yale.png';
import USC1 from '../../../assets/images/LogoScrollerImages/USC.png';

export default function Home() {
  const logoList = [Dartmouth, Yale, USC, Drexel, Dartmouth1, Yale1, USC1, Drexel1];
  
  return (
    <>
      <PublicBanner />
      <WebBanner />
      <LogoScroller logos={logoList} speed={25} />
      <SecondaryBanner />
      {/* <BannerCarousel /> */}
    </>
  );
}
