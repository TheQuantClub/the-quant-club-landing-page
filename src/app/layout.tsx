import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "./reference.css";
import "./strategy-visual.css";
import "./strategy-home.css";
import "./institution-story.css";
import "./flow-ribbons.css";
import "./research-problems.css";
import "./platform-cycle.css";
import "./strategy-character-art.css";

export const metadata: Metadata = {
  title: "The Quant Club — Investment intelligence built on quants, not opinions.",
  description: "Equity and mutual fund strategies for investment professionals. Explore the methodology, equal-weight model portfolios and monthly research publications.",
  icons: { icon: "/favicon.svg", apple: "/quant-mark.svg" },
  openGraph: {
    title: "The Quant Club — Investment intelligence built on quants, not opinions.",
    description: "Equity and mutual fund strategies. Understand the method, choose your strategy and put the research to work.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
