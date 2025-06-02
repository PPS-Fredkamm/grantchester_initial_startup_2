import './Home.css';
import BannerCarousel from '../Carousel/BannerCarousel';
import Footer from '../Footer/Footer';
import SubBanner from '../SubBanner/SubBanner';
import WebBanner from '../WebBanner/WebBanner';
import SecondaryBanner from '../SecondaryBanner/SecondaryBanner';

function Home() {
  return (
    <>       
      <SubBanner />
      <WebBanner />           
      <SecondaryBanner />
      <div className="home-container">
        <h1>Welcome to Alumbiz</h1>
        <p>This is a protected home page.</p>
      </div>

      <BannerCarousel />
      <Footer />
    </>
  );
}

export default Home;
