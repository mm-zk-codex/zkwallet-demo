# zkWallet Demo

An RPG-inspired single-page demo that visualizes how cross-chain interoperability could feel from a user perspective. Drag tokens between blockchain inventories, trigger swaps by dropping on other assets, and simulate centralized-exchange deposits — all without any backend dependencies, making it ready for static hosting on platforms like Vercel.

## Features

- **Inventory-style chains** – Each supported network appears as a loot panel showing balances for multiple tokens.
- **Drag & drop transfers** – Move a token to another chain or exchange to open an interactive transfer dialog with quick percentage controls.
- **Token swaps** – Drop one token on top of another to preview swap routes, exchange rates, and confirm simulated conversions.
- **Persistent mock balances** – A random wallet address and seed balances are generated on first visit and cached in a cookie for subsequent sessions.
- **Config-driven** – Chain, token, and exchange metadata (including bridge restrictions and swap routes) live in `config/chains.ts` for easy tweaking.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the demo.

## Deployment

The app is a purely client-side Next.js project and can be deployed to Vercel without any additional configuration. All state is handled in the browser, so no backend services are required.
