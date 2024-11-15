import React from "react";
import styles from "../page.module.css";

export default function AreaSlider({ area, setArea }) {
  return (
    <div className={styles.sliderContainer}>
      <label>Specify Area (m²): {area}</label>
      <input
        type="range"
        min="1"
        max="1000"
        value={area}
        onChange={(e) => setArea(Number(e.target.value))}
        className={styles.slider}
      />
      <input
        type="number"
        value={area}
        onChange={(e) => setArea(Number(e.target.value))}
        className={styles.input}
      />
    </div>
  );
}
