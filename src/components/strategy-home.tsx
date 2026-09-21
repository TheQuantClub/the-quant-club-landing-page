"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Pause, Play, Plus } from "lucide-react";
import { articles, commonQuestions } from "@/lib/public-content";
import { AudienceSection } from "./audience-section";
import { BrandBackdrop } from "./brand-backdrop";
import { BusinessOrbit } from "./business-orbit";
import { ResearchComparison } from "./research-problems";
import { FlowRibbons } from "./flow-ribbons";
import { QuantGlobe } from "./quant-globe";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function StrategyCTA() {
  const destination = process.env.NEXT_PUBLIC_WALKTHROUGH_URL || "/walkthrough";
  return (
    <section className="tqc-closing tqc-brand-section" aria-labelledby="closing-title">
      <BrandBackdrop tone="dark" variant="signature" />
      <div className="tqc-container tqc-closing-inner">
        <div><p className="tqc-eyebrow">BRING IT INTO YOUR PRACTICE</p><h2 id="closing-title">See where The Quant Club<br />fits into your firm.</h2><p>Explore model portfolios, the built-in analysis engine, implementation tools, and client documents that feel like you.</p></div>
        <Link className="tqc-button tqc-button-light" href={destination}>Book a walkthrough <ArrowUpRight size={19} /></Link>
      </div>
    </section>
  );
}

export function ByteArtwork({ variant = 0 }: { variant?: number }) {
  return <div className={`tqc-byte-art tqc-byte-art-${variant % 3}`} aria-hidden="true"><div className="tqc-byte-shape"><i /><i /><i /><i /><i /><i /></div><span>THE QUANT BYTES</span><ArrowUpRight size={24} /></div>;
}

function BytesSection() {
  return (
    <section className="tqc-bytes tqc-section tqc-brand-section" aria-labelledby="bytes-title"><BrandBackdrop variant="flow" scene="research" /><div className="tqc-container">
      <div className="tqc-section-heading"><div><p className="tqc-eyebrow">IDEAS FOR YOUR PRACTICE</p><h2 id="bytes-title">The Quant Bytes.</h2><p className="tqc-heading-subtitle">A clearer view of research, discipline, and the work around investing.</p></div><Link href="/research" className="tqc-text-link">Explore The Quant Bytes <ArrowUpRight size={18} /></Link></div>
      <div className="tqc-bytes-grid">{articles.slice(0, 3).map((article, index) => <Link className="tqc-byte-card" href={`/research/${article.slug}`} key={article.slug}>
        <ByteArtwork variant={index} />
        <div className="tqc-byte-meta"><span>{article.category}</span><span>{article.status === "draft" ? "Editorial preview" : article.publishedAt}</span></div>
        <h3>{article.title}</h3><p>{article.dek}</p>
        <span className="tqc-text-link">{article.status === "draft" ? "Read preview" : "Read article"} <ArrowRight size={18} /></span>
      </Link>)}</div>
    </div></section>
  );
}

export function HomeFAQ() {
  return (
    <section className="tqc-faq tqc-section tqc-brand-section" id="questions" aria-labelledby="faq-title"><BrandBackdrop variant="orbit" /><div className="tqc-container tqc-faq-layout">
      <div><p className="tqc-eyebrow">QUESTIONS, ANSWERED</p><h2 id="faq-title">Know what stands<br />behind the work.</h2><p>Our data, the research record, and what your firm can expect.</p><Link className="tqc-text-link" href="/walkthrough">Talk through your questions <ArrowUpRight size={18} /></Link></div>
      <div className="tqc-faq-list">{commonQuestions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </div></section>
  );
}

export function StrategyHome() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const destination = process.env.NEXT_PUBLIC_WALKTHROUGH_URL || "/walkthrough";
  return (
    <div className="tqc-home">
      <section className="tqc-hero tqc-hero--kinetic" aria-labelledby="hero-title">
        <FlowRibbons paused={paused || reduced} />
        <div className="tqc-container">
          <div className="tqc-hero-stage">
            <div className="tqc-hero-story"><p className="tqc-eyebrow"><span /> FOR INVESTMENT ADVISERS & WEALTH TEAMS</p>
              <h1 id="hero-title"><span>Let rules guide<br />the strategy.</span><span>Let your brand lead<br />the relationship.</span></h1>
              <p className="tqc-hero-description">Model portfolios, a built-in analysis engine, and tools for implementation and portfolio maintenance. All connected to the way you serve your clients.</p>
              <div className="tqc-hero-actions"><Link href={destination} className="tqc-button">Book a walkthrough <ArrowUpRight size={19} /></Link><Link href="/platform" className="tqc-text-link">Explore the platform <ArrowRight size={18} /></Link></div>
            </div>
            <div className="tqc-hero-world"><QuantGlobe paused={paused || reduced} /><div className="tqc-world-caption"><span>A SYSTEMATIC PERSPECTIVE.</span>{!reduced && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play globe and flowing lines" : "Pause globe and flowing lines"}>{paused ? <Play size={13} /> : <Pause size={13} />}{paused ? "Play" : "Pause"}</button>}</div></div>
          </div>
          <div className="tqc-hero-baseline"><a className="tqc-scroll-cue" href="#what-we-do"><span>EXPLORE THE FULL PICTURE</span><ArrowDown size={17} /></a><p>Model portfolios. Your practice. <strong>Your identity.</strong></p></div>
        </div>
      </section>
      <BusinessOrbit />
      <ResearchComparison />
      <AudienceSection /><BytesSection /><HomeFAQ /><StrategyCTA />
    </div>
  );
}
