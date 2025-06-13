import './Home.css';
import BannerCarousel from '../Carousel/BannerCarousel';
import SubBanner from '../SubBanner/SubBanner';
import WebBanner from '../WebBanner/WebBanner';
import SecondaryBanner from '../SecondaryBanner/SecondaryBanner';
import LogoScroller from '../LogoScroller/LogoScroller';
import dartmouth from '../../assets/Images/LogoScrollerImages/dartmouth.jpg'
import drexel from '../../assets/Images/LogoScrollerImages/drexel.jpg'
import yale from '../../assets/Images/LogoScrollerImages/yale.png'
import USC from '../../assets/Images/LogoScrollerImages/USC.png'

const logoList = [dartmouth, yale, USC, drexel];


function Home() {
  return (
    <>
      <SubBanner />
      <WebBanner />
      <LogoScroller logos={logoList} speed={25} height={50} />           
      <SecondaryBanner />
      <div className="home-container">
        <h1>Welcome to Alumbiz</h1>
        <p>This is a protected home page.</p>
      </div>

      <BannerCarousel />
    </>
  );
}

export default Home;
