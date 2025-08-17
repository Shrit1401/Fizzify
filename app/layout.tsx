import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Fizzify - Cold Drinks Delivery",
  description: "Chilled Cold Drinks In Your Room - Manipal Bangalore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.seline.com/seline.js"
          data-token="9f3621d9bafc5a2"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
