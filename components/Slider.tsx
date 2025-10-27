"use client";

import styles from "./Slider.module.css";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
};

const PRESETS = [10, 25, 50, 75, 100];

export function Slider({ value, onChange, label }: SliderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}%</span>
      </div>
      <input
        className={styles.slider}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className={styles.presets}>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            className={value === preset ? styles.presetActive : styles.preset}
            onClick={() => onChange(preset)}
            type="button"
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
}
