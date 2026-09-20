"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, LockKeyhole, MoveUpRight, Pause, Play } from "lucide-react";
import { publicStrategies, articles } from "@/lib/public-content";
import { strategyStories, audienceStories } from "@/lib/strategy-story";
import { StrategyVisual } from "./strategy-visual";
import { FlowRibbons } from "./flow-ribbons";
import { ResearchProblems } from "./research-problems";
import { StrategyCharacterArt } from "./strategy-character-art";

function useReveals() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>(".q-reveal");
    if (!elements || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("q-seen"); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    elements.forEach(element => { element.classList.add("q-prepare"); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return root;
}

function StrategyExplorer() {
  const [active,setActive] = useState(0);
  const [artPaused,setArtPaused] = useState(false);
  const strategy = publicStrategies[active];
  const story = strategyStories[strategy.slug as keyof typeof strategyStories];
  function moveTab(event:KeyboardEvent<HTMLButtonElement>,index:number) {
    let next=index;
    if (["ArrowDown","ArrowRight"].includes(event.key)) next=(index+1)%publicStrategies.length;
    else if (["ArrowUp","ArrowLeft"].includes(event.key)) next=(index+publicStrategies.length-1)%publicStrategies.length;
    else if (event.key==="Home") next=0;
    else if (event.key==="End") next=publicStrategies.length-1;
    else return;
    event.preventDefault();setActive(next);document.getElementById(`q-strategy-tab-${next}`)?.focus();
  }
  return <section className="q-explorer" id="strategy-explorer"><div className="q-container">
    <div className="q-section-heading q-reveal"><div><p className="q-label">THE STRATEGIES</p><h2>Different ways to invest.<br/><span>The research comes first.</span></h2></div><p>Start with the part of the market you want to understand. Explore the strategy behind the portfolio.</p></div>
    <div className="q-strategy-workbench q-reveal"><div className="q-strategy-tabs" role="tablist" aria-label="Explore our strategies" aria-orientation="vertical">{publicStrategies.map((s,i)=><button key={s.slug} id={`q-strategy-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="q-strategy-panel" tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>moveTab(e,i)}><span className="q-tab-dot"/><span><small>Quant x</small>{s.name}</span><ArrowUpRight size={18}/></button>)}</div>
      <div id="q-strategy-panel" role="tabpanel" aria-labelledby={`q-strategy-tab-${active}`} tabIndex={0} className="q-strategy-panel"><div key={strategy.slug} className="q-panel-content"><div className="q-panel-top"><span>{strategy.type}</span><span>{strategy.universe}</span></div><div className="q-panel-story"><div><p className="q-label">{story.eyebrow}</p><h3>Quant x<br/>{strategy.name}</h3><p className="q-panel-description">{story.description}</p></div><div className="q-panel-art-slot"><StrategyCharacterArt variant={strategy.shape} tone="dark" paused={artPaused}/></div></div><div className="q-strategy-facts"><div><small>THE INVESTMENT LENS</small><p>{story.use}</p></div><div><small>PORTFOLIO CONSTRUCTION</small><p>Equal weight at construction<br/>and scheduled rebalance.</p></div></div><div className="q-panel-bottom"><Link href={`/strategies/${strategy.slug}`} className="q-button q-button-light">Explore this strategy<ArrowUpRight size={17}/></Link><span><LockKeyhole size={13}/>Portfolio data stays in member access.</span></div></div></div>
    </div><div className="q-explorer-foot"><span>Indian equities & mutual funds</span><div className="q-explorer-tools"><button className="q-explorer-motion" onClick={()=>setArtPaused(!artPaused)} aria-pressed={artPaused} aria-label={artPaused?"Play strategy animations":"Pause strategy animations"}>{artPaused?<Play size={12}/>:<Pause size={12}/>} {artPaused?"Play animations":"Pause animations"}</button><Link href="/strategies">See the complete strategy collection<ArrowRight size={16}/></Link></div></div>
  </div></section>;
}

function AudienceUses() {
  const [active,setActive]=useState(0);
  const audience=audienceStories[active];
  return <section className="q-audiences"><div className="q-container"><div className="q-section-heading q-reveal"><div><p className="q-label">WHERE THE RESEARCH FITS</p><h2>Your practice.<br/>A strategy you can explain.</h2></div><p>The research has a different job in every firm. Here is how it can fit into yours.</p></div><div className="q-audience-layout q-reveal"><div className="q-audience-tabs" aria-label="Choose your type of firm">{audienceStories.map((a,i)=><button key={a.id} aria-pressed={active===i} onClick={()=>setActive(i)}>{a.name}<ArrowUpRight size={19}/></button>)}<Link href="/institutions">Explore use cases in detail<ArrowRight size={15}/></Link></div><div className="q-audience-content" key={audience.id}><p className="q-audience-intro">{audience.intro}</p><ul>{audience.uses.map(use=><li key={use}><Check size={17}/>{use}</li>)}</ul><div className="q-audience-strategies"><span>START EXPLORING</span>{audience.strategies.map(slug=>{const strategy=publicStrategies.find(s=>s.slug===slug);return strategy?<Link key={slug} href={`/strategies/${slug}`}>{strategy.name}<ArrowUpRight size={12}/></Link>:null;})}</div></div></div></div></section>;
}

export function StrategyCTA(){return <section className="q-final-cta"><div className="q-cta-orbit" aria-hidden="true">{Array.from({length:9},(_,i)=><i key={i} style={{"--ring":i} as React.CSSProperties}/>)}</div><div className="q-container"><div><p className="q-label">LET’S START WITH THE RESEARCH</p><h2>Get to know the strategy.<br/><span>Then decide.</span></h2><p>Walk through the methodology, the portfolio structure and how the research would fit your firm.</p></div><Link href="/walkthrough" className="q-button q-button-light">Book a strategy walkthrough<ArrowUpRight size={19}/></Link></div></section>;}

export function StrategyHome() {
  const root=useReveals();
  const [heroPaused,setHeroPaused]=useState(false);
  return <div className="q-home" ref={root}>
    <section className={`q-hero${heroPaused?" q-hero-paused":""}`}><FlowRibbons/><div className="q-hero-grid" aria-hidden="true"/><div className="q-container q-hero-inner"><div className="q-hero-copy"><p className="q-label"><span className="q-pulse-dot"/>THE QUANT CLUB / INVESTMENT RESEARCH</p><h1>Investment intelligence built on <em>quants,</em><br/><span>not opinions.</span></h1><p className="q-hero-description">Equity and mutual fund strategies for investment professionals. Understand the method. Choose your strategy. Put the research to work.</p><div className="q-hero-actions"><a href="#strategy-explorer" className="q-button">Find your strategy<ArrowDown size={17}/></a><Link href="/walkthrough" className="q-text-link">Book a walkthrough<ArrowUpRight size={17}/></Link></div><div className="q-hero-proof"><span>Rules-based selection</span><span>Equal-weight portfolios</span><span>Monthly publications</span></div></div><div className="q-hero-art"><StrategyVisual onMotionChange={setHeroPaused}/></div></div><div className="q-hero-bottom q-container"><a href="#why-quant-club">EXPLORE THE THINKING<ArrowDown size={14}/></a><p>Research for registered investment advisers & professional investment teams.</p></div></section>
    <ResearchProblems/>
    <StrategyExplorer/>
    <section className="q-belief q-container"><div className="q-belief-mark" aria-hidden="true">*</div><p className="q-label q-reveal">A PROCESS FOR AN UNCERTAIN MARKET</p><h2 className="q-reveal">We cannot tell you<br/><span>what happens next.</span></h2><p className="q-belief-answer q-reveal">We give you a researched strategy<br/>for deciding <em>what to do next.</em></p><div className="q-belief-line" aria-hidden="true"><i/><span>RESEARCH</span><ChevronRight size={12}/><span>PORTFOLIO</span><ChevronRight size={12}/><span>REVIEW</span><i/></div></section>
    <section className="q-delivery"><div className="q-container"><div className="q-section-heading q-reveal"><div><p className="q-label">WHAT THE SUBSCRIPTION IS FOR</p><h2>More time with the research.<br/><span>Less time piecing it together.</span></h2></div><Link href="/platform" className="q-text-link">Inside the platform<ArrowUpRight size={18}/></Link></div><div className="q-delivery-grid q-reveal">{[{title:"Understand the method.",tag:"METHODOLOGY",copy:"Read what the strategy invests in, how the portfolio is constructed and when it is reviewed.",art:"method"},{title:"Find the right publication.",tag:"MODEL PORTFOLIOS",copy:"Keep dated portfolio releases and review schedules together, so your team knows which publication it is using.",art:"portfolio"},{title:"Keep the team in step.",tag:"SHARED RESEARCH",copy:"Give the firm a common research workspace. Receive a combined email when the monthly strategy publications are ready.",art:"team"}].map(({title,tag,copy,art})=><article key={tag}><div className={`q-delivery-art q-delivery-art-${art}`} aria-hidden="true">{Array.from({length:5},(_,i)=><i key={i} style={{"--n":i} as React.CSSProperties}/>)}</div><span className="q-label">{tag}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <AudienceUses/>
    <section className="q-journal q-container"><div className="q-section-heading q-reveal"><div><p className="q-label">THE QUANT JOURNAL</p><h2>The thinking behind<br/><span>the portfolio.</span></h2></div><Link href="/research" className="q-text-link">Read the journal<ArrowUpRight size={18}/></Link></div><div className="q-journal-grid q-reveal">{articles.slice(0,3).map((article,i)=><Link href={`/research/${article.slug}`} key={article.slug} className="q-journal-card"><div className={`q-journal-art q-journal-art-${i}${i<2?" q-journal-art-generated":""}`} aria-hidden="true">{i<2?<Image src={i===0?"/artwork/research-ribbon.png":"/artwork/equal-weight-matrix.png"} alt="" fill sizes="(max-width: 650px) 110px, (max-width: 960px) 30vw, 420px"/>:Array.from({length:14},(_,j)=><i key={j} style={{"--n":j} as React.CSSProperties}/>)}</div><div className="q-journal-meta"><span>{article.category}</span><span>Sample article</span></div><h3>{article.title}</h3><span className="q-journal-read">Read the perspective<MoveUpRight size={18}/></span></Link>)}</div></section>
    <StrategyCTA/>
  </div>;
}
