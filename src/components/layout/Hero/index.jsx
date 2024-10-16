import HeroCanvas from "../../ui/HeroCanvas";
import HeroTextContent from "../../ui/HeroTextContent";

function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <HeroCanvas />
        <HeroTextContent />
      </div>
    </div>
  );
}

export default Hero;
