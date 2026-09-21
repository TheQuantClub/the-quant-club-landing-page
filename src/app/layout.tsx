import type { Metadata } from "next";
import "./globals.css";
import "./brand-refresh.css";
import "./research-problems.css";
import "./strategy-character-art.css";
import "./marketing-refresh.css";
import "./kinetic-refresh.css";
import "./audience-section.css";
import "./brand-continuity.css";
import "./hero-gradient.css";
import "./adaptive-header.css";
import "./quant-framework.css";
import { BrandMotionProvider } from "@/components/brand-backdrop";

export const metadata: Metadata = {
  title: "The Quant Club — Quant-led model portfolios.",
  description: "Quant-led model portfolios built on data and defined rules. Quantitative research, analysis and implementation tools for investment advisers and wealth teams.",
  icons: { icon: "/favicon.svg", apple: "/quant-mark.svg" },
  openGraph: {
    title: "The Quant Club — Let rules guide the strategy. Let your brand lead the relationship.",
    description: "Explore quant-led model portfolios and the quantitative research behind them, with tools for analysis, implementation and reporting in your firm's identity.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><BrandMotionProvider>{children}</BrandMotionProvider></body></html>;
}
