import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { infoList } from "../../../data";

function HeroTextContent() {
  const cardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (hoveredIndex !== null && cardRefs.current[hoveredIndex]) {
        const card = cardRefs.current[hoveredIndex];
        const bounds = card.getBoundingClientRect();
        const posX = event.clientX - bounds.x;
        const posY = event.clientY - bounds.y;
        const ratioX = posX / bounds.width;
        const ratioY = posY / bounds.height;
        card.style.setProperty("--ratio-x", ratioX);
        card.style.setProperty("--ratio-y", ratioY);
      }
    };

    document.body.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, [hoveredIndex]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="hero-content">
      <div className="hero-content__title">
        <h1>Путешествие</h1>
        <p>на красную планету</p>
      </div>
      <div className="hero-content__info">
        <ul className="content__info-list">
          {infoList.map((item, index) => (
            <li className="content__info-item" key={item.id}>
              <div
                className={`content__info-item-wrapper ${
                  hoveredIndex === index ? "hovered" : ""
                }`}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <p className="content__info-item-text">{item.text}</p>
                <p className="content__info-item-number">{item.number}</p>
                <p className="content__info-item-description">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HeroTextContent;
