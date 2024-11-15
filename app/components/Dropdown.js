import React from "react";
import styles from "../page.module.css";

export default function Dropdown({ label, options, selected, onChange }) {
  return (
    <div className={styles.dropdownContainer}>
      <label>{label}</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)} className={styles.dropdown}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
