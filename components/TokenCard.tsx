"use client";

import { TokenConfig } from "@/config/chains";
import styles from "./TokenCard.module.css";

export type TokenCardProps = {
  chainId: string;
  token: TokenConfig;
  balance: number;
  onDragStart: (token: TokenConfig) => void;
  onDragEnd: () => void;
  onDropToken: () => void;
};

export function TokenCard({
  chainId,
  token,
  balance,
  onDragStart,
  onDragEnd,
  onDropToken
}: TokenCardProps) {
  const formattedBalance = balance.toLocaleString(undefined, {
    maximumFractionDigits: 2
  });

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "token", chainId, tokenId: token.id })
    );
    onDragStart(token);
  };

  return (
    <div
      className={styles.card}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDropToken();
      }}
    >
      <div className={styles.avatar}>{token.icon}</div>
      <div className={styles.meta}>
        <span className={styles.symbol}>{token.symbol}</span>
        <span className={styles.name}>{token.name}</span>
      </div>
      <div className={styles.balance}>{formattedBalance}</div>
    </div>
  );
}
