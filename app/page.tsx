"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { ChainPanel } from "@/components/ChainPanel";
import { ExchangeBoard } from "@/components/ExchangeBoard";
import { HeroHeader } from "@/components/HeroHeader";
import { Modal } from "@/components/Modal";
import { Slider } from "@/components/Slider";
import {
  CHAINS,
  EXCHANGES,
  ChainConfig,
  ExchangeConfig,
  TokenConfig,
  SwapRoute
} from "@/config/chains";
import { loadProfile, persistProfile, ProfileState } from "@/lib/cookie";

type DragContext = {
  chain: ChainConfig;
  token: TokenConfig;
};

type PendingAction =
  | {
      type: "transfer";
      source: DragContext;
      targetChain: ChainConfig;
    }
  | {
      type: "deposit";
      source: DragContext;
      exchange: ExchangeConfig;
    }
  | {
      type: "swap";
      source: DragContext;
      target: {
        chain: ChainConfig;
        token: TokenConfig;
      };
      routes: SwapRoute[];
    };

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const randomAddress = () => {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    return `0x${window.crypto
      .getRandomValues(new Uint8Array(20))
      .reduce((acc, value) => acc + value.toString(16).padStart(2, "0"), "")}`;
  }
  const fallback = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  return `0x${fallback}`;
};

const createRandomProfile = (): ProfileState => {
  const balances: ProfileState["balances"] = {};
  CHAINS.forEach((chain) => {
    balances[chain.id] = {};
    chain.tokens.forEach((token) => {
      const amount = Number(randomBetween(15, 400).toFixed(2));
      balances[chain.id][token.id] = amount;
    });
  });
  return {
    address: randomAddress(),
    balances,
    lastUpdated: Date.now()
  };
};

const getTokenConfig = (chainId: string, tokenId: string) => {
  const chain = CHAINS.find((item) => item.id === chainId);
  return chain?.tokens.find((token) => token.id === tokenId);
};

export default function Home() {
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [dragContext, setDragContext] = useState<DragContext | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [percentage, setPercentage] = useState(50);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("Forge your multi-chain strategy.");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = loadProfile();
    if (stored) {
      setProfile(stored);
    } else {
      const generated = createRandomProfile();
      setProfile(generated);
      persistProfile(generated);
    }
  }, []);

  const balances = profile?.balances ?? {};

  const handleUpdateProfile = (updater: (current: ProfileState) => ProfileState) => {
    setProfile((current) => {
      const base = current ?? createRandomProfile();
      const next = updater(base);
      persistProfile(next);
      return next;
    });
  };

  const handleTokenDragStart = (chainId: string, token: TokenConfig) => {
    const chain = CHAINS.find((item) => item.id === chainId);
    if (!chain) {
      return;
    }
    setDragContext({ chain, token });
    setFeedback(`Holding ${token.symbol} on ${chain.name}`);
  };

  const resetDragContext = () => {
    setDragContext(null);
    setFeedback("Forge your multi-chain strategy.");
  };

  const handleChainDrop = (targetChainId: string) => {
    if (!dragContext) {
      return;
    }
    if (targetChainId === dragContext.chain.id) {
      setFeedback("This asset already lives on that chain.");
      return;
    }
    if (!dragContext.token.transferableTo.includes(targetChainId)) {
      setFeedback(`${dragContext.token.symbol} cannot travel to ${targetChainId.toUpperCase()} yet.`);
      return;
    }
    const targetChain = CHAINS.find((item) => item.id === targetChainId);
    if (!targetChain) {
      return;
    }
    setPendingAction({ type: "transfer", source: dragContext, targetChain });
    setPercentage(50);
    setSelectedRouteId(null);
  };

  const handleTokenDrop = (target: { chainId: string; token: TokenConfig }) => {
    if (!dragContext) {
      return;
    }
    if (dragContext.chain.id === target.chainId && dragContext.token.id === target.token.id) {
      setFeedback("Swapping with itself? Even magic has limits.");
      return;
    }
    const targetChain = CHAINS.find((item) => item.id === target.chainId);
    if (!targetChain) {
      return;
    }
    const potentialRoutes = dragContext.token.swapRoutes.filter((route) => {
      const last = route.path[route.path.length - 1];
      return last.toLowerCase() === target.token.symbol.toLowerCase();
    });
    setPendingAction({
      type: "swap",
      source: dragContext,
      target: { chain: targetChain, token: target.token },
      routes: potentialRoutes
    });
    setPercentage(50);
    setSelectedRouteId(potentialRoutes[0]?.id ?? (potentialRoutes.length === 0 ? "custom" : null));
  };

  const handleExchangeDrop = (exchangeId: string) => {
    if (!dragContext) {
      return;
    }
    const exchange = EXCHANGES.find((item) => item.id === exchangeId);
    if (!exchange) {
      return;
    }
    setPendingAction({ type: "deposit", source: dragContext, exchange });
    setPercentage(50);
    setSelectedRouteId(null);
  };

  const currentAmount = useMemo(() => {
    if (!profile || !pendingAction) {
      return 0;
    }
    const sourceBalance = profile.balances[pendingAction.source.chain.id]?.[
      pendingAction.source.token.id
    ];
    if (!sourceBalance) {
      return 0;
    }
    return Number(((sourceBalance * percentage) / 100).toFixed(2));
  }, [profile, pendingAction, percentage]);

  const executeAction = () => {
    if (!profile || !pendingAction) {
      return;
    }
    if (currentAmount <= 0) {
      setFeedback("Select an amount greater than zero.");
      return;
    }

    const applyMutation = (mutator: (draft: ProfileState) => void) => {
      handleUpdateProfile((draft) => {
        const clone: ProfileState = {
          address: draft.address,
          balances: JSON.parse(JSON.stringify(draft.balances)),
          lastUpdated: Date.now()
        };
        mutator(clone);
        return clone;
      });
    };

    if (pendingAction.type === "transfer") {
      const { source, targetChain } = pendingAction;
      if (!source.token.transferableTo.includes(targetChain.id)) {
        setFeedback(`${source.token.symbol} cannot travel to ${targetChain.name} right now.`);
        return;
      }
      const targetTokenConfig = getTokenConfig(targetChain.id, source.token.id);
      if (!targetTokenConfig) {
        setFeedback(`${targetChain.name} has no vault slot for ${source.token.symbol}.`);
        return;
      }
      applyMutation((state) => {
        const sourceBalance = state.balances[source.chain.id][source.token.id];
        const amount = Math.min(currentAmount, sourceBalance);
        state.balances[source.chain.id][source.token.id] = Number(
          (sourceBalance - amount).toFixed(2)
        );
        const existing = state.balances[targetChain.id][source.token.id] ?? 0;
        state.balances[targetChain.id][source.token.id] = Number((existing + amount).toFixed(2));
      });
      setFeedback(`Moved ${currentAmount} ${source.token.symbol} to ${targetChain.name}.`);
    }

    if (pendingAction.type === "deposit") {
      const { source, exchange } = pendingAction;
      applyMutation((state) => {
        const sourceBalance = state.balances[source.chain.id][source.token.id];
        const amount = Math.min(currentAmount, sourceBalance);
        state.balances[source.chain.id][source.token.id] = Number(
          (sourceBalance - amount).toFixed(2)
        );
      });
      setFeedback(`Deposited ${currentAmount} ${pendingAction.source.token.symbol} to ${exchange.name}.`);
    }

    if (pendingAction.type === "swap") {
      const { source, target } = pendingAction;
      const chosenRoute = pendingAction.routes.find((route) => route.id === selectedRouteId);
      const effectiveRate = chosenRoute?.rate ?? pendingAction.routes[0]?.rate ?? 1;
      const routeLabel = chosenRoute?.label ?? pendingAction.routes[0]?.label ?? "custom route";
      const targetTokenConfig = getTokenConfig(target.chain.id, target.token.id);
      if (!targetTokenConfig) {
        setFeedback(`${target.chain.name} has no inventory slot for ${target.token.symbol}.`);
        return;
      }
      applyMutation((state) => {
        const sourceBalance = state.balances[source.chain.id][source.token.id];
        const amount = Math.min(currentAmount, sourceBalance);
        const payout = Number((amount * effectiveRate).toFixed(2));
        state.balances[source.chain.id][source.token.id] = Number(
          (sourceBalance - amount).toFixed(2)
        );
        const existing = state.balances[target.chain.id][target.token.id] ?? 0;
        state.balances[target.chain.id][target.token.id] = Number((existing + payout).toFixed(2));
      });
      setFeedback(
        `Swapped ${currentAmount} ${source.token.symbol} for ${(currentAmount * effectiveRate).toFixed(
          2
        )} ${target.token.symbol} via ${routeLabel}.`
      );
    }

    setPendingAction(null);
    resetDragContext();
  };

  const closeModal = () => {
    setPendingAction(null);
    resetDragContext();
  };

  const rerollProfile = () => {
    const fresh = createRandomProfile();
    setProfile(fresh);
    persistProfile(fresh);
    setFeedback("New adventurer wallet minted.");
  };

  return (
    <main className={styles.main}>
      <HeroHeader address={profile?.address ?? "..."} onReset={rerollProfile} />
      <div className={styles.statusBar}>
        <span className={styles.feedback}>{feedback}</span>
        <div className={styles.actions}>
          <span className={styles.actionTag}>Drag tokens between chains</span>
          <span className={styles.actionTag}>Drop on exchanges to simulate custody</span>
          <span className={styles.actionTag}>Token-to-token drops trigger swaps</span>
        </div>
        <span className={styles.hint}>Tip: press Esc to close popups</span>
      </div>
      <div className={styles.board}>
        <div className={styles.chains}>
          {CHAINS.map((chain) => (
            <ChainPanel
              key={chain.id}
              chain={chain}
              balances={balances[chain.id] ?? {}}
              onTokenDragStart={handleTokenDragStart}
              onTokenDragEnd={resetDragContext}
              onChainDrop={handleChainDrop}
              onTokenDrop={handleTokenDrop}
            />
          ))}
        </div>
        <ExchangeBoard exchanges={EXCHANGES} onDropExchange={handleExchangeDrop} />
      </div>

      {pendingAction ? (
        <Modal
          title={
            pendingAction.type === "transfer"
              ? `Bridge ${pendingAction.source.token.symbol}`
              : pendingAction.type === "deposit"
              ? `Send to ${pendingAction.exchange.name}`
              : `Swap ${pendingAction.source.token.symbol}`
          }
          description={
            pendingAction.type === "transfer"
              ? `Send ${pendingAction.source.token.symbol} from ${pendingAction.source.chain.name} to ${pendingAction.targetChain.name}.`
              : pendingAction.type === "deposit"
              ? `Simulate depositing ${pendingAction.source.token.symbol} to ${pendingAction.exchange.name}.`
              : `Select a route to convert ${pendingAction.source.token.symbol} into ${pendingAction.target.token.symbol}.`
          }
          onClose={closeModal}
        >
          <Slider label="Select percentage" value={percentage} onChange={setPercentage} />
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Estimated amount
            </div>
            <div style={{ fontSize: "1.05rem", marginTop: "0.25rem" }}>
              {currentAmount} {pendingAction.source.token.symbol}
            </div>
          </div>

          {pendingAction.type === "swap" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)"
                }}
              >
                Available routes
              </div>
              {(pendingAction.routes.length > 0 ? pendingAction.routes : [{
                id: "custom",
                label: "Portal Hop",
                path: [pendingAction.source.token.symbol, pendingAction.target.token.symbol],
                rate: 1
              }]).map((route) => {
                const isActive = route.id === selectedRouteId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedRouteId(route.id)}
                    style={{
                      borderRadius: "14px",
                      border: `1px solid ${isActive ? "var(--accent)" : "rgba(120, 140, 255, 0.4)"}`,
                      padding: "0.75rem",
                      textAlign: "left",
                      background: isActive
                        ? "rgba(98, 241, 255, 0.12)"
                        : "rgba(24, 30, 68, 0.7)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                      {route.label}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {route.path.join(" → ")}
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "var(--accent-strong)", fontWeight: 600 }}>
                      1 {pendingAction.source.token.symbol} ≈ {route.rate} {pendingAction.target.token.symbol}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}

          <button
            type="button"
            onClick={executeAction}
            style={{
              marginTop: "0.5rem",
              borderRadius: "16px",
              border: "none",
              padding: "0.9rem 1.2rem",
              textTransform: "none",
              letterSpacing: "0.06em",
              fontWeight: 700,
              background:
                pendingAction.type === "deposit"
                  ? "linear-gradient(135deg, rgba(255, 171, 117, 0.9), rgba(241, 99, 138, 0.9))"
                  : "linear-gradient(135deg, rgba(98, 241, 255, 0.9), rgba(129, 93, 255, 0.9))",
              color: "#090b1a",
              cursor: "pointer"
            }}
          >
            Confirm action
          </button>
        </Modal>
      ) : null}
    </main>
  );
}
