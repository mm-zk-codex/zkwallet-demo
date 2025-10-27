"use client";

import Image from "next/image";
import { TokenConfig } from "@/config/chains";
import styles from "./TokenCard.module.css";

type DeltaIndicator = {
  amount: number;
  direction: "in" | "out";
};

export type TokenCardProps = {
  chainId: string;
  token: TokenConfig;
  balance: number;
  delta?: DeltaIndicator;
  onDragStart: (token: TokenConfig) => void;
  onDragEnd: () => void;
  onDropToken: () => void;
};

export function TokenCard({
  chainId,
  token,
  balance,
  delta,
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
      <div className={styles.avatar}>
        <Image src={token.icon} alt={`${token.symbol} icon`} width={44} height={44} className={styles.avatarImage} />
      </div>
      <div className={styles.meta}>
        <span className={styles.symbol}>{token.symbol}</span>
        <span className={styles.name}>{token.name}</span>
      </div>
      <div className={styles.balance}>{formattedBalance}</div>
      {delta ? (
        <div
          className={`${styles.delta} ${
            delta.direction === "in" ? styles.deltaIn : styles.deltaOut
          }`}
        >
          {delta.direction === "in" ? "+" : "-"}
          {Math.abs(delta.amount).toLocaleString(undefined, {
            maximumFractionDigits: delta.amount < 1 ? 4 : 2
          })}
        </div>
      ) : null}
    </div>
  );
}
