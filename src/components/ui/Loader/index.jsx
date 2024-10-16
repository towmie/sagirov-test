import { useProgress } from "@react-three/drei";
import "./index.css";
import { useEffect, useState } from "react";

function Loader() {
  const [isNotActive, setIsNotActive] = useState(true);
  const { active } = useProgress();

  useEffect(() => {
    if (!active) {
      setTimeout(() => {
        setIsNotActive(false);
      }, 1500);
    }
  }, [active]);

  return (
    <div className={`loader ${isNotActive ? "" : "disabled"}`}>
      <div className="loader__content">
        <div className="loader__text">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
