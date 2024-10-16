import HeroTextContent from "../../ui/HeroTextContent";
import "./index.css";
function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <HeroTextContent />
        <div className="hero__rocket">
          <img src="/rocket.png" alt="rocket" />
        </div>
        <div className="hero__rocket-connector">
          <div className="hero__rocket-connector-box">
            <div className="hero__rocket-connector-box--line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
