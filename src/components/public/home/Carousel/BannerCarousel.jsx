// imports images from image section under assets. 
import Carousel from 'react-bootstrap/Carousel';
import Hiring from '../../../assets/images/hiring.jpg';
import Startup from '../../../assets/images/startup.jpg';
import Contract from '../../../assets/images/contract.jpg';

import './BannerCarousel.css';

function BannerCarousel() {
  return (
    <div className="carousel-container">
        {/* speed interval for how long picture changes. 1000= 1 sec */}
      <Carousel fade interval={5000}>
        <Carousel.Item>
          <img className="d-block w-100" src={Hiring} alt="Slide 1" />
          <Carousel.Caption>
            <h3>Welcome</h3>
            <p>Discover your future network.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Startup} alt="Slide 2" />
          <Carousel.Caption>
            <h3>Engage</h3>
            <p>Stay connected with alumni and peers.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Contract} alt="Slide 3" />
          <Carousel.Caption>
            <h3>Grow</h3>
            <p>Access exclusive opportunities and content.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default BannerCarousel;