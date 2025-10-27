export type SwapRoute = {
  id: string;
  label: string;
  path: string[];
  rate: number;
  targetTokenId: string;
};

export type TokenConfig = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  transferableTo: string[];
  swapRoutes: SwapRoute[];
};

export type ChainConfig = {
  id: string;
  name: string;
  icon: string;
  themeColor: string;
  tokens: TokenConfig[];
};

export type ExchangeConfig = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export const CHAINS: ChainConfig[] = [
  {
    id: "era",
    name: "zkSync Era",
    icon: "/icons/chains/zksync-era.svg",
    themeColor: "#7a4bff",
    tokens: [
      {
        id: "eth",
        name: "Ether",
        symbol: "ETH",
        icon: "/icons/tokens/eth.svg",
        transferableTo: ["sophon", "abstract", "edge"],
        swapRoutes: [
          {
            id: "era-eth-weth",
            label: "Mute Switch",
            path: ["ETH", "WETH"],
            rate: 1,
            targetTokenId: "weth"
          },
          {
            id: "era-eth-usdc",
            label: "SyncSwap",
            path: ["ETH", "USDC"],
            rate: 3271.42,
            targetTokenId: "usdc"
          }
        ]
      },
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "/icons/tokens/weth.svg",
        transferableTo: ["sophon", "abstract"],
        swapRoutes: [
          {
            id: "era-weth-eth",
            label: "Velocore",
            path: ["WETH", "ETH"],
            rate: 0.999,
            targetTokenId: "eth"
          },
          {
            id: "era-weth-zk",
            label: "SpaceFi",
            path: ["WETH", "ZK"],
            rate: 1823.4,
            targetTokenId: "zk"
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "/icons/tokens/usdc.svg",
        transferableTo: ["sophon", "abstract", "edge"],
        swapRoutes: [
          {
            id: "era-usdc-eth",
            label: "Curve Stable",
            path: ["USDC", "ETH"],
            rate: 0.0003,
            targetTokenId: "eth"
          },
          {
            id: "era-usdc-meow",
            label: "SyncSwap",
            path: ["USDC", "MEOW"],
            rate: 5120.78,
            targetTokenId: "meow"
          }
        ]
      },
      {
        id: "zk",
        name: "ZK Token",
        symbol: "ZK",
        icon: "/icons/tokens/zk.svg",
        transferableTo: ["sophon", "edge"],
        swapRoutes: [
          {
            id: "era-zk-eth",
            label: "Mute Switch",
            path: ["ZK", "ETH"],
            rate: 0.00054,
            targetTokenId: "eth"
          },
          {
            id: "era-zk-meow",
            label: "SpaceFi",
            path: ["ZK", "MEOW"],
            rate: 27.45,
            targetTokenId: "meow"
          }
        ]
      },
      {
        id: "meow",
        name: "Meow",
        symbol: "MEOW",
        icon: "/icons/tokens/meow.svg",
        transferableTo: ["sophon"],
        swapRoutes: [
          {
            id: "era-meow-usdc",
            label: "ClawSwap",
            path: ["MEOW", "USDC"],
            rate: 0.00018,
            targetTokenId: "usdc"
          }
        ]
      }
    ]
  },
  {
    id: "sophon",
    name: "Sophon",
    icon: "/icons/chains/sophon.svg",
    themeColor: "#12b3ff",
    tokens: [
      {
        id: "eth",
        name: "Ether",
        symbol: "ETH",
        icon: "/icons/tokens/eth.svg",
        transferableTo: ["era", "abstract", "edge"],
        swapRoutes: [
          {
            id: "sophon-eth-weth",
            label: "Lynex",
            path: ["ETH", "WETH"],
            rate: 1,
            targetTokenId: "weth"
          },
          {
            id: "sophon-eth-zk",
            label: "Sophon Portal",
            path: ["ETH", "ZK"],
            rate: 1876.9,
            targetTokenId: "zk"
          }
        ]
      },
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "/icons/tokens/weth.svg",
        transferableTo: ["era", "abstract"],
        swapRoutes: [
          {
            id: "sophon-weth-eth",
            label: "Lynex",
            path: ["WETH", "ETH"],
            rate: 0.999,
            targetTokenId: "eth"
          },
          {
            id: "sophon-weth-usdc",
            label: "SyncSwap",
            path: ["WETH", "USDC"],
            rate: 3268.11,
            targetTokenId: "usdc"
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "/icons/tokens/usdc.svg",
        transferableTo: ["era", "abstract"],
        swapRoutes: [
          {
            id: "sophon-usdc-eth",
            label: "Curve Stable",
            path: ["USDC", "ETH"],
            rate: 0.00031,
            targetTokenId: "eth"
          }
        ]
      },
      {
        id: "zk",
        name: "ZK Token",
        symbol: "ZK",
        icon: "/icons/tokens/zk.svg",
        transferableTo: ["era", "edge"],
        swapRoutes: [
          {
            id: "sophon-zk-eth",
            label: "Sophon Portal",
            path: ["ZK", "ETH"],
            rate: 0.00052,
            targetTokenId: "eth"
          }
        ]
      },
      {
        id: "meow",
        name: "Meow",
        symbol: "MEOW",
        icon: "/icons/tokens/meow.svg",
        transferableTo: ["era"],
        swapRoutes: [
          {
            id: "sophon-meow-usdc",
            label: "ClawSwap",
            path: ["MEOW", "USDC"],
            rate: 0.00019,
            targetTokenId: "usdc"
          }
        ]
      }
    ]
  },
  {
    id: "abstract",
    name: "Abstract",
    icon: "/icons/chains/abstract.svg",
    themeColor: "#ff8a65",
    tokens: [
      {
        id: "eth",
        name: "Ether",
        symbol: "ETH",
        icon: "/icons/tokens/eth.svg",
        transferableTo: ["era", "sophon"],
        swapRoutes: [
          {
            id: "abstract-eth-usdc",
            label: "Abstract Swap",
            path: ["ETH", "USDC"],
            rate: 3270.05,
            targetTokenId: "usdc"
          }
        ]
      },
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "/icons/tokens/weth.svg",
        transferableTo: ["era", "sophon"],
        swapRoutes: [
          {
            id: "abstract-weth-eth",
            label: "Abstract Swap",
            path: ["WETH", "ETH"],
            rate: 0.999,
            targetTokenId: "eth"
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "/icons/tokens/usdc.svg",
        transferableTo: ["era", "sophon", "edge"],
        swapRoutes: [
          {
            id: "abstract-usdc-eth",
            label: "Curve Stable",
            path: ["USDC", "ETH"],
            rate: 0.0003,
            targetTokenId: "eth"
          }
        ]
      },
      {
        id: "zk",
        name: "ZK Token",
        symbol: "ZK",
        icon: "/icons/tokens/zk.svg",
        transferableTo: ["era"],
        swapRoutes: [
          {
            id: "abstract-zk-eth",
            label: "Abstract Swap",
            path: ["ZK", "ETH"],
            rate: 0.0005,
            targetTokenId: "eth"
          }
        ]
      }
    ]
  },
  {
    id: "edge",
    name: "zkSync Edge",
    icon: "/icons/chains/edge.svg",
    themeColor: "#5ce3a9",
    tokens: [
      {
        id: "eth",
        name: "Ether",
        symbol: "ETH",
        icon: "/icons/tokens/eth.svg",
        transferableTo: ["era", "sophon"],
        swapRoutes: [
          {
            id: "edge-eth-usdc",
            label: "Edge Portal",
            path: ["ETH", "USDC"],
            rate: 3271.88,
            targetTokenId: "usdc"
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "/icons/tokens/usdc.svg",
        transferableTo: ["era", "sophon", "abstract"],
        swapRoutes: [
          {
            id: "edge-usdc-eth",
            label: "Edge Portal",
            path: ["USDC", "ETH"],
            rate: 0.00031,
            targetTokenId: "eth"
          }
        ]
      },
      {
        id: "zk",
        name: "ZK Token",
        symbol: "ZK",
        icon: "/icons/tokens/zk.svg",
        transferableTo: ["era", "sophon"],
        swapRoutes: [
          {
            id: "edge-zk-eth",
            label: "Edge Portal",
            path: ["ZK", "ETH"],
            rate: 0.00053,
            targetTokenId: "eth"
          }
        ]
      }
    ]
  }
];

export const EXCHANGES: ExchangeConfig[] = [
  {
    id: "binance",
    name: "Binance",
    icon: "\ud83d\udcb0",
    description: "Centralized liquidity titan"
  },
  {
    id: "coinbase",
    name: "Coinbase",
    icon: "\ud83c\udf0e",
    description: "The regulated ramp"
  },
  {
    id: "kraken",
    name: "Kraken",
    icon: "\ud83d\udc19",
    description: "Deep sea custody"
  }
];
