import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interchain Inventory Demo",
  description: "RPG-inspired demo of cross-chain interoperability"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
