"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { articles, commonQuestions } from "@/lib/public-content";
import { homeAudiences } from "@/lib/business-content";
import { BusinessOrbit } from "./business-orbit";
import { ResearchProblems, ResearchSolutions } from "./research-problems";

export function StrategyCTA() {
  const destination = process.env.NEXT_PUBLIC_WALKTHROUGH_URL || "/walkthrough";
  return (
    <section className="tqc-closing" aria-labelledby="closing-title">
      <div className="tqc-container tqc-closing-inner">
        <div><p className="tqc-eyebrow">BRING IT INTO YOUR PRACTICE</p><h2 id="closing-title">See where The Quant Club<br />fits into your firm.</h2><p>Walk through the research, deployment workflow, portfolio maintenance, and documents carrying your brand.</p></div>
        <Link className="tqc-button tqc-button-light" href={destination}>Book a walkthrough <ArrowUpRight size={19} /></Link>
      </div>
      <div className="tqc-closing-rings" aria-hidden="true"><i /><i /><i /></div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="tqc-audiences tqc-section" id="who-we-serve" aria-labelledby="audience-title"><div className="tqc-container">
      <div className="tqc-section-heading"><div><p className="tqc-eyebrow">05 / WHO WE SERVE</p><h2 id="audience-title">Built for the people<br />putting strategies to work.</h2></div><p>From the first client allocation to the next review, bring research and day-to-day work together.</p></div>
      <div className="tqc-audience-grid">{homeAudiences.map((audience, index) => <article className="tqc-audience-card" key={audience.id}>
        <div className="tqc-card-top"><span>{audience.name}</span><span className="tqc-card-number">0{index + 1}</span></div>
        <h3>{audience.title}</h3><p>{audience.copy}</p>
        <ul>{audience.actions.map(action => <li key={action}><span aria-hidden="true" />{action}</li>)}</ul>
        <Link className="tqc-text-link" href={`/institutions#${audience.id}`}>Explore your workflow <ArrowUpRight size={17} /></Link>
      </article>)}</div>
    </div></section>
  );
}

export function ByteArtwork({ variant = 0 }: { variant?: number }) {
  return <div className={`tqc-byte-art tqc-byte-art-${variant % 3}`} aria-hidden="true"><div className="tqc-byte-shape"><i /><i /><i /><i /><i /><i /></div><span>THE QUANT BYTES</span><ArrowUpRight size={24} /></div>;
}

function BytesSection() {
  return (
    <section className="tqc-bytes tqc-section" aria-labelledby="bytes-title"><div className="tqc-container">
      <div className="tqc-section-heading"><div><p className="tqc-eyebrow">06 / IDEAS FOR YOUR PRACTICE</p><h2 id="bytes-title">The Quant Bytes.</h2><p className="tqc-heading-subtitle">A clearer view of research, discipline, and the work around investing.</p></div><Link href="/research" className="tqc-text-link">Explore The Quant Bytes <ArrowUpRight size={18} /></Link></div>
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
    <section className="tqc-faq tqc-section" id="questions" aria-labelledby="faq-title"><div className="tqc-container tqc-faq-layout">
      <div><p className="tqc-eyebrow">07 / QUESTIONS, ANSWERED</p><h2 id="faq-title">Know what stands<br />behind the work.</h2><p>Our data, the research record, and what your firm can expect.</p><Link className="tqc-text-link" href="/walkthrough">Talk through your questions <ArrowUpRight size={18} /></Link></div>
      <div className="tqc-faq-list">{commonQuestions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </div></section>
  );
}

export function StrategyHome() {
  const [selectedScene, setSelectedScene] = useState(0);
  const destination = process.env.NEXT_PUBLIC_WALKTHROUGH_URL || "/walkthrough";
  return (
    <div className="tqc-home">
      <section className="tqc-hero" aria-labelledby="hero-title"><div className="tqc-container">
        <div className="tqc-hero-topline"><p className="tqc-eyebrow"><span /> FOR INVESTMENT ADVISERS & WEALTH TEAMS</p><span className="tqc-hero-edition">RESEARCH MEETS PRACTICE</span></div>
        <h1 id="hero-title"><span>Let rules guide the strategy.</span><span>Let your brand lead<br className="tqc-hero-break" /> the relationship.</span></h1>
        <div className="tqc-hero-bottom"><div><p className="tqc-hero-description">Quantitative research, strategy deployment, portfolio maintenance, and client reporting in your firm’s brand. Connected in one professional platform.</p><div className="tqc-hero-actions"><Link href={destination} className="tqc-button">Book a walkthrough <ArrowUpRight size={19} /></Link><Link href="/platform" className="tqc-text-link">Explore the platform <ArrowRight size={18} /></Link></div></div>
          <div className="tqc-hero-signature" aria-hidden="true"><div className="tqc-signature-rings"><i /><i /><i /><b /></div><p>YOUR RESEARCH.<br />YOUR WORKFLOW.<br /><strong>YOUR BRAND.</strong></p></div>
        </div>
        <a className="tqc-scroll-cue" href="#what-we-do"><span>THE FULL PICTURE</span><ArrowDown size={17} /></a>
      </div></section>
      <BusinessOrbit />
      <ResearchProblems selectedScene={selectedScene} onSceneChange={setSelectedScene} />
      <ResearchSolutions selectedScene={selectedScene} onSceneChange={setSelectedScene} />
      <AudienceSection /><BytesSection /><HomeFAQ /><StrategyCTA />
    </div>
  );
}
