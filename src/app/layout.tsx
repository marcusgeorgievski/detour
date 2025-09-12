import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Detour",
  description: "Turn commutes into profit, find cheaper deliveries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="max-w-md mx-auto">{children}</main>
      </body>
    </html>
  );
}
