import type { Metadata } from "next";
import "./globals.css";
import "./brand-refresh.css";
import "./research-problems.css";
import "./strategy-character-art.css";
import "./marketing-refresh.css";
import "./kinetic-refresh.css";
import "./audience-section.css";
import "./brand-continuity.css";
import "./page-brand-art.css";
import "./page-colour.css";
import "./home-colour.css";
import { BrandMotionProvider } from "@/components/brand-backdrop";

export const metadata: Metadata = {
  title: "The Quant Club — Model portfolios, analysis, and your brand.",
  description: "Model portfolios, a built-in analysis engine, implementation tools, portfolio maintenance and personalised client reporting. Built for investment advisers and wealth teams.",
  icons: { icon: "/favicon.svg", apple: "/quant-mark.svg" },
  openGraph: {
    title: "The Quant Club — Let rules guide the strategy. Let your brand lead the relationship.",
    description: "Connect model portfolios, a built-in analysis engine, implementation, maintenance and your firm's identity in one professional platform.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><BrandMotionProvider>{children}</BrandMotionProvider></body></html>;
}
