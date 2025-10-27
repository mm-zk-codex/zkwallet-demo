"use client";

import styles from "./HeroHeader.module.css";

type HeroHeaderProps = {
  address: string;
  onReset: () => void;
};

export function HeroHeader({ address, onReset }: HeroHeaderProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.meta}>
        <span className={styles.kicker}>Multichain wallet</span>
        <h1 className={styles.title}>Cross-Chain Wallet</h1>
        <p className={styles.subtitle}>
          Drag and drop your coins between chains to bridge & swap.
        </p>
      </div>
      <div className={styles.wallet}>
        <span className={styles.label}>Adventurer wallet</span>
        <span className={styles.address}>{address}</span>
        <button className={styles.reset} onClick={onReset} type="button">
          Recreate profile
        </button>
      </div>
    </header>
  );
}
