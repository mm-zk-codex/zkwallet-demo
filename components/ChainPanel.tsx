"use client";

import Image from "next/image";
import { ChainConfig, TokenConfig } from "@/config/chains";
import { TokenCard } from "./TokenCard";
import styles from "./ChainPanel.module.css";

type DeltaIndicator = {
  amount: number;
  direction: "in" | "out";
};

export type ChainPanelProps = {
  chain: ChainConfig;
  balances: Record<string, number>;
  onTokenDragStart: (chainId: string, token: TokenConfig) => void;
  onTokenDragEnd: () => void;
  onTokenDrop: (target: { chainId: string; token: TokenConfig }) => void;
  onChainDrop: (chainId: string) => void;
  deltas: Record<string, DeltaIndicator | undefined>;
};

export function ChainPanel({
  chain,
  balances,
  onTokenDragEnd,
  onTokenDragStart,
  onTokenDrop,
  onChainDrop,
  deltas
}: ChainPanelProps) {
  return (
    <section
      className={styles.panel}
      style={{ borderColor: chain.themeColor }}
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
          onChainDrop(chain.id);
        }
      }}
    >
      <header className={styles.header}>
        <div className={styles.icon} style={{ backgroundColor: `${chain.themeColor}33` }}>
          <Image
            src={chain.icon}
            alt={`${chain.name} icon`}
            width={36}
            height={36}
            className={styles.iconImage}
          />
        </div>
        <div className={styles.meta}>
          <span className={styles.name}>{chain.name}</span>
          <span className={styles.subtitle}>Layer unlocked</span>
        </div>
      </header>
      <div className={styles.inventory}>
        {chain.tokens.map((token) => (
          <TokenCard
            key={token.id}
            chainId={chain.id}
            token={token}
            balance={balances[token.id] ?? 0}
            delta={deltas[`${chain.id}:${token.id}`]}
            onDragEnd={onTokenDragEnd}
            onDragStart={(tokenConfig) => onTokenDragStart(chain.id, tokenConfig)}
            onDropToken={() => onTokenDrop({ chainId: chain.id, token })}
          />
        ))}
      </div>
    </section>
  );
}
