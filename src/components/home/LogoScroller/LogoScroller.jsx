import "./LogoScroller.css";

function LogoScroller({ logos = [], speed }) {
  const duplicatedLogos = logos.concat(logos);
  const trackStyle = {
    animation: `scroll ${speed}s linear infinite`,
  };

  return (
    <div className="logo-scroller-wrapper">
      <div className="logo-scroller">
        <div className="logo-track" style={trackStyle}>
          {duplicatedLogos.map((logo, index) => (
            <div className="logo-slide" key={index}>
              <img
                src={logo}
                alt={`logo-${index}`}
                // style={{ height: `${height}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoScroller;
