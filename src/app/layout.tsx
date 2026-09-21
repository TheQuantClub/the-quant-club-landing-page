import type { Metadata } from "next";
import "./globals.css";
import "./brand-refresh.css";
import "./research-problems.css";
import "./marketing-refresh.css";

export const metadata: Metadata = {
  title: "The Quant Club — Research, deployment, and your brand.",
  description: "Quantitative research, strategy deployment, portfolio maintenance, and client reporting in your firm's brand. Built for investment advisers and wealth management teams.",
  icons: { icon: "/favicon.svg", apple: "/quant-mark.svg" },
  openGraph: {
    title: "The Quant Club — Let rules guide the strategy. Let your brand lead the relationship.",
    description: "Connect quantitative research, strategy deployment, portfolio maintenance, and branded client reporting in one professional platform.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
