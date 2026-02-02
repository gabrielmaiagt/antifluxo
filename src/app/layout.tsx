import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANTI FLUXO",
  description: "Comunidade privada para players do mercado digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} antialiased font-sans`}
      >
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
