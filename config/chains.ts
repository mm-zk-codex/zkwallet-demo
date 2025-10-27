export type SwapRoute = {
  id: string;
  label: string;
  path: string[];
  rate: number;
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
    id: "eth",
    name: "Ethereum",
    icon: "\u269b\ufe0f",
    themeColor: "#627eea",
    tokens: [
      {
        id: "eth",
        name: "Ether",
        symbol: "ETH",
        icon: "\u26a1\ufe0f",
        transferableTo: ["zksync", "polygon"],
        swapRoutes: [
          {
            id: "eth-usdc",
            label: "Uniswap v3",
            path: ["ETH", "USDC"],
            rate: 3275.43
          },
          {
            id: "eth-dai",
            label: "1inch Aggregation",
            path: ["ETH", "DAI"],
            rate: 3268.11
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "\ud83d\udcb5",
        transferableTo: ["zksync", "polygon", "bsc"],
        swapRoutes: [
          {
            id: "usdc-eth",
            label: "Curve Stable",
            path: ["USDC", "ETH"],
            rate: 0.0003
          },
          {
            id: "usdc-dai",
            label: "Curve 3pool",
            path: ["USDC", "DAI"],
            rate: 0.998
          }
        ]
      },
      {
        id: "dai",
        name: "Dai",
        symbol: "DAI",
        icon: "\ud83d\udcb0",
        transferableTo: ["polygon"],
        swapRoutes: [
          {
            id: "dai-usdt",
            label: "Balancer",
            path: ["DAI", "USDT"],
            rate: 0.999
          }
        ]
      }
    ]
  },
  {
    id: "zksync",
    name: "zkSync Era",
    icon: "\ud83d\udd2e",
    themeColor: "#9a6bff",
    tokens: [
      {
        id: "eth",
        name: "Wrapped Ether",
        symbol: "ETH",
        icon: "\ud83d\udd25",
        transferableTo: ["eth", "polygon"],
        swapRoutes: [
          {
            id: "eth-usdc-zk",
            label: "SyncSwap",
            path: ["ETH", "USDC"],
            rate: 3271.78
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "\ud83d\udcb8",
        transferableTo: ["eth", "polygon"],
        swapRoutes: [
          {
            id: "usdc-eth-zk",
            label: "SyncSwap",
            path: ["USDC", "ETH"],
            rate: 0.00031
          }
        ]
      },
      {
        id: "link",
        name: "Chainlink",
        symbol: "LINK",
        icon: "\ud83d\udd17",
        transferableTo: ["eth"],
        swapRoutes: [
          {
            id: "link-eth",
            label: "Mutant Swap",
            path: ["LINK", "ETH"],
            rate: 0.0051
          }
        ]
      }
    ]
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "\ud83d\udd38",
    themeColor: "#8247e5",
    tokens: [
      {
        id: "eth",
        name: "Bridged Ether",
        symbol: "ETH",
        icon: "\ud83d\udd25",
        transferableTo: ["eth", "zksync"],
        swapRoutes: [
          {
            id: "eth-usdc-poly",
            label: "Uniswap",
            path: ["ETH", "USDC"],
            rate: 3270.12
          }
        ]
      },
      {
        id: "matic",
        name: "MATIC",
        symbol: "MATIC",
        icon: "\ud83c\udf52",
        transferableTo: ["eth"],
        swapRoutes: [
          {
            id: "matic-eth",
            label: "Quickswap",
            path: ["MATIC", "ETH"],
            rate: 0.00043
          }
        ]
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "\ud83d\udcb6",
        transferableTo: ["eth", "zksync", "bsc"],
        swapRoutes: [
          {
            id: "usdc-usdt-poly",
            label: "Uniswap",
            path: ["USDC", "USDT"],
            rate: 0.999
          }
        ]
      },
      {
        id: "dai",
        name: "Dai",
        symbol: "DAI",
        icon: "\ud83c\udf4a",
        transferableTo: ["eth"],
        swapRoutes: [
          {
            id: "dai-eth-poly",
            label: "Kyber",
            path: ["DAI", "ETH"],
            rate: 0.00031
          }
        ]
      }
    ]
  },
  {
    id: "bsc",
    name: "BNB Chain",
    icon: "\ud83d\udd2b",
    themeColor: "#f0b90b",
    tokens: [
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        icon: "\ud83d\udcb5",
        transferableTo: ["eth", "polygon"],
        swapRoutes: [
          {
            id: "usdc-busd-bsc",
            label: "PancakeSwap",
            path: ["USDC", "BUSD"],
            rate: 1
          }
        ]
      },
      {
        id: "bnb",
        name: "BNB",
        symbol: "BNB",
        icon: "\ud83d\udd25",
        transferableTo: [],
        swapRoutes: [
          {
            id: "bnb-busd",
            label: "PancakeSwap",
            path: ["BNB", "BUSD"],
            rate: 571.12
          }
        ]
      },
      {
        id: "busd",
        name: "BUSD",
        symbol: "BUSD",
        icon: "\ud83d\udcb7",
        transferableTo: ["polygon"],
        swapRoutes: [
          {
            id: "busd-usdc",
            label: "PancakeSwap",
            path: ["BUSD", "USDC"],
            rate: 1
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
