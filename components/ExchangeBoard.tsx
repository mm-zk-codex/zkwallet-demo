"use client";

import { ExchangeConfig } from "@/config/chains";
import styles from "./ExchangeBoard.module.css";

type ExchangeBoardProps = {
  exchanges: ExchangeConfig[];
  onDropExchange: (exchangeId: string) => void;
};

export function ExchangeBoard({ exchanges, onDropExchange }: ExchangeBoardProps) {
  return (
    <section className={styles.board}>
      <header className={styles.header}>
        <h2 className={styles.title}>Centralized Exchanges</h2>
        <p className={styles.subtitle}>Drop assets to simulate custodial transfers</p>
      </header>
      <div className={styles.rows}>
        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className={styles.exchange}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const payload = event.dataTransfer.getData("application/json");
              if (!payload) {
                return;
              }
              const data = JSON.parse(payload);
              if (data.type === "token") {
                onDropExchange(exchange.id);
              }
            }}
          >
            <div className={styles.icon}>{exchange.icon}</div>
            <div className={styles.meta}>
              <span className={styles.name}>{exchange.name}</span>
              <span className={styles.description}>{exchange.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
