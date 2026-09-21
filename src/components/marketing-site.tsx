"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, ClipboardCheck, Download, FileText, Fingerprint, Layers3, LockKeyhole, Mail, Menu, Pause, Play, Plus, RefreshCw, Search, ShieldCheck, SlidersHorizontal, Users, Workflow, X } from "lucide-react";
import { QuantLogo } from "./logo";
import { StrategyHome, StrategyCTA } from "./strategy-home";
import { StrategyCharacterArt } from "./strategy-character-art";
import { StrategyRisk } from "./strategy-risk";
import { BrandBackdrop, BrandMotionControl } from "./brand-backdrop";
import { articles, commonQuestions, publicStrategies, type Article } from "@/lib/public-content";
import { strategyStories } from "@/lib/strategy-story";

export type SiteView = "home" | "strategies" | "strategy" | "platform" | "research" | "article" | "about" | "institutions" | "walkthrough";

const navigation = [
  ["Platform", "/platform"],
  ["Strategies", "/strategies"],
  ["Who we serve", "/institutions"],
  ["The Quant Bytes", "/research"],
  ["About", "/about"],
] as const;
const memberLoginUrl = process.env.NEXT_PUBLIC_MEMBER_LOGIN_URL?.trim();
const walkthroughUrl = process.env.NEXT_PUBLIC_WALKTHROUGH_URL?.trim();
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

function WalkthroughLink({ children = "Book a walkthrough", className = "tqc-button", interest }: { children?: ReactNode; className?: string; interest?: string }) {
  const href = walkthroughUrl || (interest ? `/walkthrough?interest=${encodeURIComponent(interest)}` : "/walkthrough");
  return <Link className={className} href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className="mk-brand"><QuantLogo compact inverse={inverse} /><span>The Quant Club</span></span>;
}

function SiteShell({ children, page }: { children: ReactNode; page: SiteView }) {
  const pathname = usePathname();
  const openingTone = page === "home" || page === "strategy" ? "dark" : "light";
  const [headerState, setHeaderState] = useState<{ tone: "dark" | "light"; atTop: boolean }>({ tone: openingTone, atTop: true });
  const [menuOpen, setMenuOpen] = useState(false);
  const headerBar = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLElement>(null);
  const loginDialog = useRef<HTMLDialogElement>(null);
  function memberAction() { setMenuOpen(false); loginDialog.current?.showModal(); }

  useEffect(() => {
    const main = content.current;
    const bar = headerBar.current;
    if (!main || !bar) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const sampleY = bar.getBoundingClientRect().height / 2;
      const viewportWidth = document.documentElement.clientWidth;
      const dark = Array.from(main.querySelectorAll<HTMLElement>(".tqc-hero--gradient, .mk-strategy-detail-hero, .tqc-closing")).some(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= sampleY && rect.bottom > sampleY && rect.left <= 8 && rect.right >= viewportWidth - 8;
      });
      const tone = dark ? "dark" : "light";
      const atTop = window.scrollY <= 4;
      setHeaderState(previous => previous.tone === tone && previous.atTop === atTop ? previous : { tone, atTop });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(main);
    resize.observe(bar);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return <div className="mk-site" data-opening-tone={openingTone}>
    <a className="skip-link" href="#content">Skip to content</a>
    <header className="mk-header" data-tone={headerState.tone} data-at-top={headerState.atTop} data-menu-open={menuOpen}>
      <div className="tqc-container mk-header-inner" ref={headerBar}>
        <Link href="/" aria-label="The Quant Club home" onClick={() => setMenuOpen(false)}><Brand inverse={headerState.tone === "dark"} /></Link>
        <nav className="mk-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}</nav>
        <div className="mk-header-actions">
          {memberLoginUrl ? <Link className="mk-login" href={memberLoginUrl}>Member login<LockKeyhole size={13} aria-hidden="true" /></Link> : <button type="button" className="mk-login" onClick={memberAction}>Member login<LockKeyhole size={13} aria-hidden="true" /></button>}
          <WalkthroughLink />
        </div>
        <button className="mk-menu-toggle" type="button" aria-controls="mk-mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="mk-mobile-nav tqc-container" id="mk-mobile-navigation" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === "Escape") setMenuOpen(false); }}>{navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}<Link href={walkthroughUrl || "/walkthrough"} onClick={() => setMenuOpen(false)}>Book a walkthrough<ArrowUpRight size={17} aria-hidden="true" /></Link>{memberLoginUrl ? <Link href={memberLoginUrl} onClick={() => setMenuOpen(false)}>Member login<LockKeyhole size={15} aria-hidden="true" /></Link> : <button type="button" onClick={memberAction}>Member login<LockKeyhole size={15} aria-hidden="true" /></button>}</nav>}
    </header>
    <main id="content" ref={content}>{children}</main>
    <footer className="mk-footer mk-brand-surface"><BrandBackdrop variant="signature" className="mk-surface-backdrop mk-footer-backdrop" />
      <div className="tqc-container">
        <div className="mk-footer-top"><div><Link href="/" aria-label="The Quant Club home"><Brand /></Link><p>Quant-led model portfolios.<br />Built around your practice.</p></div><nav aria-label="Footer navigation">{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="mk-footer-contact"><span>LET’S START A CONVERSATION</span><WalkthroughLink className="mk-footer-link">Bring us your workflow</WalkthroughLink>{contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}<p>Your clients. Your brand.<br />A process you can stand behind.</p></div></div>
        <div className="mk-footer-bottom"><span>© {new Date().getFullYear()} The Quant Club.</span><span>For investment professionals.</span></div>
        <p className="mk-disclosure">Investments in securities markets are subject to market risks. Public content is educational and does not constitute personalised investment advice. Past performance does not assure future results. Research and portfolio information are available only through authorised access. Your firm retains responsibility for client suitability, investment decisions and execution.</p>
      </div>
    </footer>
    <BrandMotionControl />
    <dialog ref={loginDialog} className="mk-dialog" aria-labelledby="mk-login-title" onClick={event => { if (event.target === event.currentTarget) loginDialog.current?.close(); }}>
      <button type="button" className="mk-dialog-close" aria-label="Close member login dialog" onClick={() => loginDialog.current?.close()}><X size={20} /></button>
      <LockKeyhole size={30} className="mk-blue-icon" aria-hidden="true" /><p className="tqc-eyebrow">THE MEMBER WORKSPACE</p><h2 id="mk-login-title">Your research.<br />Your firm’s workspace.</h2><p>Member sign-in is not connected to this website yet. Explore the walkthrough page to discuss access for your firm.</p><Link className="tqc-button" href="/walkthrough" onClick={() => loginDialog.current?.close()}>Discuss member access<ArrowRight size={17} aria-hidden="true" /></Link>
    </dialog>
  </div>;
}

function PageIntro({ label, title, description, children, variant = "orbit" }: { label: string; title: ReactNode; description: string; children?: ReactNode; variant?: "orbit" | "flow" | "signature" }) {
  return <section className="mk-page-intro mk-brand-surface"><BrandBackdrop variant={variant} className="mk-surface-backdrop mk-intro-backdrop" /><div className="tqc-container"><div className="mk-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} aria-hidden="true" /><span>{label}</span></div><div className={`mk-intro-grid${children ? "" : " mk-intro-simple"}`}><div><p className="tqc-eyebrow">{label}</p><h1>{title}</h1><p className="mk-lead">{description}</p></div>{children}</div></div></section>;
}

function Strategies() {
  const [filter, setFilter] = useState("All strategies");
  const [selectedSlug, setSelectedSlug] = useState(publicStrategies[0].slug);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const filtered = publicStrategies.filter(strategy => filter === "All strategies" || strategy.type === filter);
  const selected = filtered.find(strategy => strategy.slug === selectedSlug) || filtered[0];
  function chooseCategory(value: string) {
    setFilter(value);
    const matching = publicStrategies.filter(strategy => value === "All strategies" || strategy.type === value);
    if (!matching.some(strategy => strategy.slug === selectedSlug)) setSelectedSlug(matching[0].slug);
  }
  function moveStrategy(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % filtered.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + filtered.length - 1) % filtered.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = filtered.length - 1;
    else return;
    event.preventDefault(); setSelectedSlug(filtered[next].slug); tabRefs.current[next]?.focus();
  }
  return <>
    <section className="mk-collection-intro tqc-container mk-brand-surface"><BrandBackdrop variant="orbit" className="mk-surface-backdrop mk-collection-backdrop" /><div className="mk-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} aria-hidden="true" /><span>Strategies</span></div><div><div><p className="tqc-eyebrow">THE STRATEGY COLLECTION</p><h1>Distinct universes.<br /><em>One quantitative discipline.</em></h1></div><p>Explore quant-led model portfolios for equities and mutual funds. Find your investment universe, then examine the research within the platform.</p></div></section>
    <section className="mk-collection-section tqc-container" aria-label="Explore the strategy collection">
      <div className="mk-filter-row"><div className="mk-filters" role="group" aria-label="Filter strategies">{["All strategies", "Equity", "Mutual funds"].map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => chooseCategory(value)}>{value}</button>)}</div><span className="mk-collection-select-hint">Select a strategy to explore<ArrowRight size={16} aria-hidden="true" /></span></div>
      <div className="mk-collection-explorer">
        <div className="mk-collection-list" role="tablist" aria-label="Choose a strategy" aria-orientation="vertical">{filtered.map((strategy, index) => <button type="button" key={strategy.slug} id={`mk-collection-tab-${strategy.slug}`} role="tab" aria-selected={selected.slug === strategy.slug} aria-controls="mk-collection-panel" tabIndex={selected.slug === strategy.slug ? 0 : -1} onClick={() => setSelectedSlug(strategy.slug)} onKeyDown={event => moveStrategy(event, index)} ref={element => { tabRefs.current[index] = element; }}><span className="mk-collection-label"><small>{strategy.type}</small>{strategy.name}</span><ArrowUpRight size={19} aria-hidden="true" /></button>)}</div>
        <div className="mk-collection-stage mk-brand-surface" id="mk-collection-panel" role="tabpanel" aria-labelledby={`mk-collection-tab-${selected.slug}`} tabIndex={0}>
          <BrandBackdrop variant="flow" tone="dark" className="mk-surface-backdrop mk-stage-backdrop" />
          <div className="mk-stage-top"><span>{selected.type === "Equity" ? "EQUITY STRATEGY" : "MUTUAL FUND STRATEGY"}</span><span>THE QUANT CLUB</span></div>
          <div className="mk-stage-main" key={selected.slug}><div className="mk-stage-title"><span>{selected.universe}</span><h2>{selected.name}</h2><StrategyRisk level={selected.riskLevel} /></div><div className="mk-stage-sculpture" aria-hidden="true"><StrategyCharacterArt variant={selected.shape} tone="dark" paused={paused} /></div></div>
          <div className="mk-stage-bottom"><p>{selected.description}</p><Link href={`/strategies/${selected.slug}`} className="mk-light-button">Explore this strategy<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </div>
      </div>
      <div className="mk-collection-caption"><span><LockKeyhole size={14} aria-hidden="true" />Detailed research and model information stay within the platform.</span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? "Play animation" : "Pause animation"}</button></div>
    </section>
    <section className="mk-collection-next tqc-container mk-brand-surface"><BrandBackdrop variant="signature" className="mk-surface-backdrop mk-low-backdrop" /><div><p className="tqc-eyebrow">BEYOND THE STRATEGY</p><h2>The tools to put<br /><em>your process to work.</em></h2></div><div>{[[SlidersHorizontal, "Analysis built into the platform", "/platform#evaluate"], [Workflow, "Implementation for your team", "/platform#deploy"], [Fingerprint, "Client material in your name", "/platform#brand"]].map(([Icon, label, href]) => { const ToolIcon = Icon as typeof BookOpen; return <Link href={String(href)} key={String(href)}><ToolIcon size={22} aria-hidden="true" /><span>{String(label)}</span><ArrowUpRight size={19} aria-hidden="true" /></Link>; })}</div></section><StrategyCTA />
  </>;
}

function StrategyDetail({ slug }: { slug: string }) {
  const strategy = publicStrategies.find(item => item.slug === slug)!;
  const strategyIndex = publicStrategies.indexOf(strategy);
  const next = publicStrategies[(strategyIndex + 1) % publicStrategies.length];
  const [paused, setPaused] = useState(false);
  return <>
    <section className={`mk-strategy-detail-hero mk-brand-surface mk-strategy-detail-${strategy.shape}`}><BrandBackdrop variant="flow" tone="dark" className="mk-surface-backdrop mk-dark-backdrop" /><div className="tqc-container"><div className="mk-breadcrumb"><Link href="/strategies"><ArrowLeft size={14} aria-hidden="true" />The strategy collection</Link><span>{strategy.type}</span></div><div className="mk-strategy-detail-grid"><div><p className="tqc-eyebrow">{strategy.type === "Equity" ? "EQUITY STRATEGY" : "MUTUAL FUND STRATEGY"}</p><h1>{strategy.name}</h1><p>{strategy.description}</p><StrategyRisk level={strategy.riskLevel} /><WalkthroughLink interest={strategy.name} className="mk-light-button">Discuss this strategy</WalkthroughLink></div><div className="mk-detail-sculpture"><div aria-hidden="true"><StrategyCharacterArt variant={strategy.shape} tone="dark" paused={paused} /></div><div className="mk-sculpture-caption"><span>{strategy.universe}</span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? "Play" : "Pause"} animation</button></div></div></div><div className="mk-strategy-detail-meta"><span><i />{strategy.universe}</span><span>RESEARCH / ANALYSIS / IMPLEMENTATION</span></div></div></section>
    <section className="mk-section"><div className="tqc-container mk-detail-layout"><div><p className="tqc-eyebrow">WHERE THE STRATEGY FITS</p><h2>{strategy.title}</h2><p className="mk-body-lead">{strategyStories[slug]?.use || strategy.lens}</p><p>Start with your firm’s mandate. Explore the model portfolio and the platform’s built-in analysis engine, then connect the decision to implementation and ongoing client work.</p><div className="mk-detail-topics">{[[SlidersHorizontal, "Examine it in the analysis engine", "Use the analysis built into the platform to assess the strategy in the context of your firm’s mandate."], [Workflow, "Carry the decision into implementation", "Prepare client-specific order files and maintain the records around your firm’s execution."], [Fingerprint, "Make the client experience yours", "Your name. Your identity. Your client relationship. Bring them into factsheets and review material."]].map(([Icon, title, copy]) => { const TopicIcon = Icon as typeof BookOpen; return <div key={String(title)}><TopicIcon size={23} aria-hidden="true" /><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></div>; })}</div></div><aside className="mk-detail-aside"><LockKeyhole size={27} aria-hidden="true" /><p className="tqc-eyebrow">INSIDE THE PLATFORM</p><h3>The full strategy.<br />The supporting tools.</h3><p>Model portfolios and detailed analysis are available through authorised access. Public introductions do not display holdings or performance figures.</p><WalkthroughLink interest={strategy.name}>Explore member access</WalkthroughLink><small>Your firm retains investment decisions and execution. A systematic process does not guarantee an outcome.</small></aside></div></section>
    <div className="tqc-container mk-next-strategy"><Link href="/strategies"><ArrowLeft size={17} aria-hidden="true" />All strategies</Link><Link href={`/strategies/${next.slug}`}><span><small>CONTINUE EXPLORING</small>{next.name}</span><ArrowRight size={25} aria-hidden="true" /></Link></div><StrategyCTA />
  </>;
}

const workflowStages = [
  { id: "research", name: "Quant-led model portfolios", icon: Layers3, title: "Quant-led model portfolios. Built on data and rules.", copy: "Our equity and mutual fund model portfolios begin with quantitative research, data and defined rules. Examine the models and supporting research within the member platform, then assess the fit with your firm’s mandate.", tasks: ["Quantitative research", "Defined investment rules", "Member model access"], output: "Quant-led models and their research, together" },
  { id: "evaluate", name: "Analysis engine", icon: SlidersHorizontal, title: "Analysis, built into your platform.", copy: "The platform’s built-in analysis engine brings the tools for examining a strategy into your workflow. Assess the research, understand its behaviour and limitations, and build your team’s own view.", tasks: ["Built-in analytical tools", "Strategy assessment", "An informed team review"], output: "Analysis alongside the model portfolio" },
  { id: "deploy", name: "Implementation", icon: Workflow, title: "Turn the decision into work your team can carry out.", copy: "Prepare client-specific order files and organise the records around implementation. Your firm executes through its own broker or mutual fund platform, then records the outcome.", tasks: ["Client-specific order files", "Firm-led execution", "Records and follow-through"], output: "Clear instructions and an organised record" },
  { id: "maintain", name: "Maintenance", icon: RefreshCw, title: "Keep the portfolio and its records current.", copy: "Organise ongoing review, drift checks, recorded changes and outstanding actions. Give your team a common view of what needs attention after implementation.", tasks: ["Review schedule", "Changes and drift", "Outstanding actions"], output: "An organised ongoing review" },
  { id: "brand", name: "Your brand", icon: Fingerprint, title: "Your name. Your identity. Your client relationship.", copy: "Make the client experience your own. Bring your name, logo and identity to factsheets and review material, with the research context and appropriate disclosures in place.", tasks: ["Your name and identity", "Your client material", "Your relationship"], output: "Your expertise, presented in your name" },
  { id: "communicate", name: "Client communication", icon: Users, title: "Carry the process into the conversation.", copy: "Bring research context, review notes and next steps into clear client communication. Help your team explain the work behind a decision.", tasks: ["Review preparation", "Clear research context", "Client communication"], output: "A more consistent client conversation" },
] as const;

function WorkflowPreview() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = workflowStages[active];
  const StageIcon = stage.icon;
  useEffect(() => {
    let frame = 0;
    function readHash() {
      const index = workflowStages.findIndex(item => `#${item.id}` === window.location.hash);
      if (index < 0) return;
      setActive(index);
      frame = window.requestAnimationFrame(() => document.getElementById("workflow")?.scrollIntoView({ block: "start" }));
    }
    frame = window.requestAnimationFrame(readHash);
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, []);
  function selectStage(index: number) {
    setActive(index);
    window.history.replaceState(null, "", `#${workflowStages[index].id}`);
  }
  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % workflowStages.length;
    else if (event.key === "ArrowLeft") next = (index + workflowStages.length - 1) % workflowStages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = workflowStages.length - 1;
    else return;
    event.preventDefault(); selectStage(next); tabRefs.current[next]?.focus();
  }
  return <div className="mk-workspace" id="workflow">{workflowStages.map(item => <span className="mk-workspace-anchor" id={item.id} key={item.name} aria-hidden="true" />)}<div className="mk-workspace-top"><span><i />THE QUANT CLUB / THE WORKFLOW</span><span>Illustrative preview</span></div><div className="mk-workspace-tabs" role="tablist" aria-label="Explore the workflow">{workflowStages.map((item, index) => <button type="button" key={item.name} role="tab" id={`mk-workflow-tab-${index}`} aria-controls="mk-workflow-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectStage(index)} onKeyDown={event => moveTab(event, index)} ref={element => { tabRefs.current[index] = element; }}><item.icon size={17} aria-hidden="true" />{item.name}</button>)}</div><div className="mk-workspace-body" id="mk-workflow-panel" role="tabpanel" aria-labelledby={`mk-workflow-tab-${active}`} tabIndex={0}><div className="mk-workspace-copy"><span className="mk-workspace-icon"><StageIcon size={30} aria-hidden="true" /></span><p className="tqc-eyebrow">{stage.name.toUpperCase()}</p><h2>{stage.title}</h2><p>{stage.copy}</p></div><div className="mk-workspace-art" aria-label={`${stage.name} workflow illustration`}><div className="mk-task-heading"><span>{stage.name} workspace</span><span className="mk-tag">Illustration</span></div>{stage.tasks.map((task, index) => <div className="mk-task" key={task}><span className="mk-task-check"><Check size={15} aria-hidden="true" /></span><div><span>{task}</span><i style={{ width: `${68 - index * 14}%` }} /></div><ChevronRight size={15} aria-hidden="true" /></div>)}<div className="mk-task-output"><ClipboardCheck size={23} aria-hidden="true" /><span>{stage.output}</span></div></div></div><div className="mk-workspace-foot"><LockKeyhole size={14} aria-hidden="true" /><span>A view of the workflow. No member research or portfolio data is displayed.</span></div></div>;
}

function Platform() {
  return <>
    <PageIntro label="THE PLATFORM" title={<>Quant-led model portfolios.<br /><em>Built for your practice.</em></>} description="Quantitative research is the starting point. Evaluate our model portfolios with the built-in analysis engine, then connect them to implementation, maintenance and client material in your firm’s identity." />
    <section className="mk-workspace-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-flow-backdrop" /><div className="tqc-container"><WorkflowPreview /></div></section>
    <section className="mk-section mk-brand-surface"><BrandBackdrop variant="signature" className="mk-surface-backdrop mk-low-backdrop" /><div className="tqc-container"><div className="tqc-section-heading"><div><p className="tqc-eyebrow">BUILT AROUND YOUR PRACTICE</p><h2>The process stays connected.<br /><em>Your firm stays in control.</em></h2></div><p>Put quantitative research to work with model portfolios, analysis and the tools your team needs to follow through.</p></div><div className="mk-feature-columns"><article><Workflow size={29} aria-hidden="true" /><h3>Implementation with follow-through</h3><p>Prepare client-specific order files, organise changes and keep confirmation records visible. Execution remains with your firm.</p></article><article><RefreshCw size={29} aria-hidden="true" /><h3>Maintenance with context</h3><p>Keep reviews, changes, recorded flows and open actions connected to the same process.</p></article><article><Fingerprint size={29} aria-hidden="true" /><h3>Your name on the work</h3><p>Your name. Your identity. Your client relationship. Bring them into factsheets and review documents that feel like your firm.</p></article></div></div></section>
    <section className="mk-tint-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-flow-backdrop" /><div className="tqc-container mk-two-column"><div><p className="tqc-eyebrow">YOUR CLIENT RELATIONSHIPS</p><h2>The relationship<br /><em>belongs to your firm.</em></h2></div><div><p className="mk-body-lead">Client decisions, suitability and execution stay with your team.</p><p>The client workflow is designed around anonymous reference tags. End-investor names, PANs and contact details stay with the firm, with local personalisation for client documents.</p><Link href="/institutions" className="tqc-text-link">See how it fits your practice<ArrowRight size={17} aria-hidden="true" /></Link></div></div></section><StrategyCTA />
  </>;
}

const audiences = [
  { id: "advisers", name: "Investment advisers", short: "RIAs & advisory teams", icon: Users, benefit: "Research through to client review", title: "Carry your process through to the client.", description: "Bring quant-led model portfolios into your advisory process, supported by analysis, implementation and client reviews in your firm’s name.", uses: ["Evaluate strategies against your mandate.", "Prepare client-specific order files and review actions.", "Bring research and reporting into your brand."], note: "Your team retains suitability decisions, allocation and execution." },
  { id: "distributors", name: "Mutual fund distributors", short: "MFDs & fund-focused teams", icon: Layers3, benefit: "A consistent fund workflow", title: "Make the work around fund decisions more consistent.", description: "Build your fund offering around quant-led model portfolios, with analysis, order preparation and client material that carries your identity.", uses: ["Explore research for your mutual fund offering.", "Organise implementation and portfolio review.", "Prepare factsheets in your firm’s identity."], note: "Research and tools are considered within your firm’s distribution role." },
  { id: "wealth", name: "Wealth teams", short: "Investment, operations & relationship teams", icon: Users, benefit: "Connect the people and the process", title: "Keep the whole team working from the same context.", description: "Give investment, operations and relationship teams a shared starting point in quant-led model portfolios and the research behind them.", uses: ["Work from the same research and analysis.", "Connect implementation records and open actions.", "Keep client material consistent across the firm."], note: "Your team retains its client relationships, investment decisions and execution." },
  { id: "institutions", name: "Investment institutions", short: "PMS, AIFs & family offices", icon: SlidersHorizontal, benefit: "Research for your existing systems", title: "Add research where your team needs depth.", description: "Evaluate quant-led model portfolios alongside your internal research, then use your existing systems or the platform’s implementation tools.", uses: ["Assess strategies alongside your internal research.", "Use the research within your implementation process.", "Discuss analysis, reporting and team requirements."], note: "Access and the scope of support are agreed in the context of your firm." },
] as const;

function Institutions() {
  return <>
    <PageIntro label="WHO WE SERVE" title={<>Your practice.<br /><em>A process that fits.</em></>} description="Quant-led model portfolios for firms with different investment mandates. Start with the quantitative research, then explore the analysis, implementation and reporting support your team needs." />
    <div className="tqc-container mk-audience-nav mk-audience-nav-compact" role="navigation" aria-label="Choose your type of firm">{audiences.map(audience => <a href={`#${audience.id}`} key={audience.id}><audience.icon size={22} aria-hidden="true" /><span><strong>{audience.name}</strong><small>{audience.benefit}</small></span><ArrowRight size={17} aria-hidden="true" /></a>)}</div>
    <section className="mk-section mk-audience-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-audience-backdrop" /><div className="tqc-container mk-audience-chapters mk-audience-chapters-compact">{audiences.map(audience => <article id={audience.id} className="mk-audience-chapter mk-audience-chapter-compact" key={audience.id}><div><div className="mk-audience-heading"><span><audience.icon size={24} aria-hidden="true" /></span><div><h2>{audience.name}</h2><p>{audience.short}</p></div></div><h3 className="mk-audience-benefit">{audience.title}</h3><p>{audience.description}</p><WalkthroughLink className="tqc-text-link">Discuss your practice</WalkthroughLink></div><div className="mk-audience-use"><h3>How it supports your team</h3><ul>{audience.uses.map(use => <li key={use}><Check size={18} aria-hidden="true" /><span>{use}</span></li>)}</ul><p><ShieldCheck size={19} aria-hidden="true" />{audience.note}</p></div></article>)}</div></section>
    <section className="mk-tint-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-flow-backdrop" /><div className="tqc-container mk-two-column"><div><p className="tqc-eyebrow">ONE CONNECTED WORKFLOW</p><h2>Research is the start.<br /><em>Your practice brings it to life.</em></h2></div><div><p className="mk-body-lead">Quant-led model portfolios, supported by analysis, implementation, maintenance and communication in your firm’s brand.</p><p>We begin by understanding how your firm works today. The next conversation is about where a clearer process and the right tools can help.</p><Link className="tqc-text-link" href="/platform">Explore the platform<ArrowRight size={17} aria-hidden="true" /></Link></div></div></section><StrategyCTA />
  </>;
}

function ArticleArtwork({ art, large = false }: { art: string; large?: boolean }) {
  return <div className={`mk-article-art mk-article-art-${art}${large ? " mk-article-art-large" : ""}`} aria-hidden="true"><div>{Array.from({ length: 7 }, (_, index) => <i key={index} style={{ "--mk-i": index } as React.CSSProperties} />)}</div><span>THE QUANT BYTES</span><Plus size={22} /></div>;
}

function ArticleStatus({ article }: { article: Article }) { return article.status === "draft" ? <span className="mk-draft">Editorial draft</span> : null; }

function ArticleCard({ article }: { article: Article }) {
  return <article className="mk-article-card"><Link href={`/research/${article.slug}`} aria-label={`Read ${article.title}`}><ArticleArtwork art={article.art} /></Link><div className="mk-article-meta"><span>{article.category}</span><ArticleStatus article={article} /></div><h3><Link href={`/research/${article.slug}`}>{article.title}</Link></h3><p>{article.dek}</p><Link className="tqc-text-link" href={`/research/${article.slug}`}>Read article<ArrowUpRight size={17} aria-hidden="true" /></Link></article>;
}

function Research() {
  const [category, setCategory] = useState("All articles");
  const [query, setQuery] = useState("");
  const categories = ["All articles", ...new Set(articles.map(article => article.category))];
  const filtered = articles.filter(article => (category === "All articles" || article.category === category) && `${article.title} ${article.dek}`.toLowerCase().includes(query.trim().toLowerCase()));
  const featured = articles[0];
  return <>
    <PageIntro variant="flow" label="IDEAS FOR A MORE CONSIDERED PRACTICE" title={<>The Quant <em>Bytes.</em></>} description="Short perspectives on systematic investing, the work around a portfolio, and the conversations that connect them." />
    <section className="mk-journal-section tqc-container mk-brand-surface"><BrandBackdrop variant="signature" className="mk-surface-backdrop mk-journal-backdrop" />
      {featured && <Link className="mk-featured-article" href={`/research/${featured.slug}`}><ArticleArtwork art={featured.art} large /><div><p className="tqc-eyebrow">FEATURED PERSPECTIVE</p><div className="mk-article-meta"><span>{featured.category}</span><ArticleStatus article={featured} /></div><h2>{featured.title}</h2><p>{featured.dek}</p><span className="tqc-text-link">Read article<ArrowUpRight size={18} aria-hidden="true" /></span></div></Link>}
      {articles.some(article => article.status === "draft") && <p className="mk-editorial-note"><FileText size={17} aria-hidden="true" />Articles marked “Editorial draft” are proposed content for review.</p>}
      <div className="mk-filter-row mk-journal-filters"><div className="mk-filters" role="group" aria-label="Filter articles">{categories.map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div><div className="mk-search"><Search size={18} aria-hidden="true" /><input type="search" aria-label="Search articles" placeholder="Search articles" value={query} onChange={event => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</div></div>
      <div className="mk-article-grid">{filtered.map(article => <ArticleCard article={article} key={article.slug} />)}</div>
      {!filtered.length && <div className="mk-empty" role="status"><Search size={30} aria-hidden="true" /><h2>No articles found.</h2><p>Try another search or choose a different category.</p><button type="button" className="tqc-button-secondary" onClick={() => { setCategory("All articles"); setQuery(""); }}>Reset search and filters<ArrowRight size={17} aria-hidden="true" /></button></div>}
    </section><StrategyCTA />
  </>;
}

function ArticleDetail({ slug }: { slug: string }) {
  const article = articles.find(item => item.slug === slug)!;
  return <>
    <section className="mk-article-intro tqc-container mk-brand-surface"><BrandBackdrop variant="orbit" className="mk-surface-backdrop mk-intro-backdrop" /><Link className="tqc-text-link" href="/research"><ArrowLeft size={17} aria-hidden="true" />Back to The Quant Bytes</Link><div className="mk-article-meta"><span>{article.category}</span><ArticleStatus article={article} /></div><h1>{article.title}</h1><p className="mk-lead">{article.dek}</p><div className="mk-byline"><QuantLogo compact /><span>{article.author || "The Quant Bytes"}{article.publishedAt ? <small>{article.publishedAt}</small> : <small>{article.status === "draft" ? "Editorial draft for review" : "Perspectives from The Quant Club"}</small>}</span></div><ArticleArtwork art={article.art} large /></section>
    <section className="mk-section"><div className="tqc-container mk-reading-layout"><aside><span className="tqc-eyebrow">ON THIS PAGE</span>{article.sections.map((section, index) => <a href={`#article-section-${index}`} key={section.title}>{section.title}<ChevronRight size={15} aria-hidden="true" /></a>)}</aside><article className="mk-reading-body">{article.status === "draft" && <p className="mk-reading-note">This is an editorial draft for review, not a published company research report.</p>}{article.sections.map((section, index) => <section id={`article-section-${index}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</section>)}<div className="mk-article-close"><p className="tqc-eyebrow">CONTINUE THE CONVERSATION</p><h3>Bring the question to your practice.</h3><p>Explore how research, implementation and ongoing portfolio work fit together for your firm.</p><WalkthroughLink /></div></article></div></section>
    <section className="mk-related mk-tint-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-flow-backdrop" /><div className="tqc-container"><div className="tqc-section-heading"><div><p className="tqc-eyebrow">THE QUANT BYTES</p><h2>Keep thinking.</h2></div><Link className="tqc-text-link" href="/research">View all articles<ArrowRight size={17} aria-hidden="true" /></Link></div><div className="mk-article-grid">{articles.filter(item => item.slug !== slug).slice(0, 3).map(item => <ArticleCard article={item} key={item.slug} />)}</div></div></section>
  </>;
}

function About() {
  return <>
    <PageIntro variant="signature" label="ABOUT THE QUANT CLUB" title={<>Quantitative research.<br /><em>Built into the way you invest.</em></>} description="The Quant Club develops quant-led model portfolios for India’s investment professionals, with tools to evaluate the research and put it to work within your firm." />
    <section className="mk-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-about-backdrop" /><div className="tqc-container mk-about-story"><div className="mk-about-emblem" aria-hidden="true"><i /><i /><i /><QuantLogo compact /><span>THE QUANT CLUB</span></div><div><p className="tqc-eyebrow">WHY WE EXIST</p><h2>Our work starts<br />with quantitative research.</h2><p className="mk-body-lead">We develop equity and mutual fund model portfolios using data and defined rules. Your team can examine the research before deciding how it fits your mandate.</p><p>The platform connects that research to the work that follows: analysis, implementation, portfolio maintenance and client communication in your firm’s identity.</p><p>We work around the professional’s role: your firm understands the client, makes the investment decisions and carries out execution.</p></div></div></section>
    <section className="mk-tint-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-flow-backdrop" /><div className="tqc-container"><div className="tqc-section-heading"><div><p className="tqc-eyebrow">WHAT GUIDES THE WORK</p><h2>A clear process.<br /><em>A considered practice.</em></h2></div></div><div className="mk-feature-columns"><article><SlidersHorizontal size={28} aria-hidden="true" /><h3>Quantitative research first</h3><p>Build model portfolios on data and defined rules. Keep the research assumptions and limitations part of the evaluation.</p></article><article><Workflow size={28} aria-hidden="true" /><h3>Follow-through matters</h3><p>Connect research to implementation preparation, ongoing review and the practical work of a team.</p></article><article><Fingerprint size={28} aria-hidden="true" /><h3>Your practice comes first</h3><p>Support the firm’s process, brand and client relationships. Keep responsibility and access clear.</p></article></div></div></section>
    <section className="mk-section mk-brand-surface"><BrandBackdrop variant="signature" className="mk-surface-backdrop mk-low-backdrop" /><div className="tqc-container mk-two-column"><div><p className="tqc-eyebrow">THE DATA BEHIND THE WORK</p><h2>Credibility begins<br /><em>with the foundations.</em></h2></div><div className="mk-evidence-list"><div><h3>Established data sources</h3><p>Our research uses data from NSE, AMFI, Morningstar and other paid research tools.</p></div><div><h3>Independent examination</h3><p>Our data and backtests are audited by a chartered accountancy firm.</p></div><div><h3>A live record</h3><p>Live data is tracked through PaRRVA. This does not imply a guarantee of returns or regulatory endorsement.</p></div></div></div></section><StrategyCTA />
  </>;
}

type Enquiry = { name: string; email: string; firm: string; role: string; interest: string; context: string };
const enquiryLabels: Record<keyof Enquiry, string> = { name: "Name", email: "Work email", firm: "Firm", role: "Role", interest: "Interest", context: "Message" };

function EnquiryForm() {
  const [result, setResult] = useState<Enquiry | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (interest && publicStrategies.some(strategy => strategy.name === interest) && selectRef.current) selectRef.current.value = interest;
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(Object.keys(enquiryLabels).map(key => [key, String(data.get(key) || "").trim()])) as Enquiry;
    setResult(values); setTimeout(() => resultHeading.current?.focus(), 0);
  }
  function summary(values: Enquiry) { return `The Quant Club — Walkthrough enquiry\n\n${Object.entries(values).filter(([, value]) => value).map(([key, value]) => `${enquiryLabels[key as keyof Enquiry]}: ${value}`).join("\n")}\n\nThis is an enquiry draft. It has not been sent through the website.`; }
  function download() {
    if (!result) return;
    const url = URL.createObjectURL(new Blob([summary(result)], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "the-quant-club-enquiry.txt"; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="mk-enquiry-card">{result ? <div className="mk-enquiry-result"><ClipboardCheck className="mk-blue-icon" size={32} aria-hidden="true" /><p className="tqc-eyebrow">YOUR WALKTHROUGH ENQUIRY</p><h2 tabIndex={-1} ref={resultHeading}>Your draft is ready.</h2><p>Nothing has been sent. Download your enquiry, or open it in your email app if a contact address is available below.</p><dl>{Object.entries(result).filter(([, value]) => value).map(([key, value]) => <div key={key}><dt>{enquiryLabels[key as keyof Enquiry]}</dt><dd>{value}</dd></div>)}</dl><div className="mk-enquiry-result-actions"><button type="button" className="tqc-button" onClick={download}>Download enquiry<Download size={17} aria-hidden="true" /></button>{contactEmail && <a className="tqc-button-secondary" href={`mailto:${contactEmail}?subject=${encodeURIComponent("Walkthrough enquiry — The Quant Club")}&body=${encodeURIComponent(summary(result))}`}>Open in email<Mail size={17} aria-hidden="true" /></a>}<button type="button" className="tqc-text-link" onClick={() => { setResult(null); setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 0); }}>Start a new enquiry<ArrowRight size={17} aria-hidden="true" /></button></div></div> : <form ref={formRef} onSubmit={submit}><p className="tqc-eyebrow">A CONVERSATION ABOUT YOUR FIRM</p><h2>Make it relevant.</h2><p>Tell us what your team would like to explore.</p><div className="mk-form-row"><label>Full name<input name="name" autoComplete="name" placeholder="Your full name" required pattern=".*\S.*" maxLength={100} /></label><label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@yourfirm.com" required maxLength={180} /></label></div><label>Firm name<input name="firm" autoComplete="organization" placeholder="Your firm" required pattern=".*\S.*" maxLength={160} /></label><label>Your role<select name="role" required defaultValue=""><option value="" disabled>Select your role</option><option>Investment adviser / RIA</option><option>Mutual fund distributor</option><option>Wealth management team</option><option>PMS / AIF / family office</option><option>Other investment professional</option></select></label><label>What would you like to explore?<select name="interest" ref={selectRef} defaultValue="The full offering"><option>The full offering</option><option>Quant-led model portfolios and analysis</option><option>Implementation and ongoing maintenance</option><option>Branded reports and client communication</option>{publicStrategies.map(strategy => <option key={strategy.slug}>{strategy.name}</option>)}</select></label><label>Anything you would like us to cover? <span>(optional)</span><textarea name="context" rows={4} placeholder="Your research needs, current workflow or questions for the team." maxLength={1500} /></label><p className="mk-form-note"><LockKeyhole size={16} aria-hidden="true" /><span>This form creates a draft in your browser. It does not send or store your enquiry on a server.</span></p><button type="submit" className="tqc-button">Prepare my enquiry<ArrowRight size={17} aria-hidden="true" /></button></form>}</div>;
}

function Walkthrough() {
  return <>
    <section className="mk-walkthrough tqc-container mk-brand-surface"><BrandBackdrop variant="orbit" className="mk-surface-backdrop mk-walkthrough-backdrop" /><div className="mk-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} aria-hidden="true" /><span>Walkthrough</span></div><div className="mk-walkthrough-grid"><div className="mk-walkthrough-copy"><p className="tqc-eyebrow">LET’S TALK ABOUT YOUR PRACTICE</p><h1>Start with the strategy.<br /><em>See how it fits your firm.</em></h1><p className="mk-lead">Explore our quant-led model portfolios and the quantitative research behind them. Then see how analysis, implementation and client reporting support your firm’s investment process.</p><div className="mk-meeting-topics">{[[BookOpen, "Explore the quantitative research", "Discuss our model portfolios, your mandate and the questions your team needs to answer."], [Workflow, "Walk through the work", "Explore implementation preparation, review and the tools that support follow-through."], [Fingerprint, "Make it your firm’s experience", "Discuss branded factsheets, review documents and client communication."]].map(([Icon, title, copy]) => { const TopicIcon = Icon as typeof BookOpen; return <div key={String(title)}><TopicIcon size={23} aria-hidden="true" /><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></div>; })}</div>{contactEmail && <a href={`mailto:${contactEmail}`} className="tqc-text-link"><Mail size={17} aria-hidden="true" />{contactEmail}</a>}</div>{walkthroughUrl ? <div className="mk-enquiry-card mk-booking-card"><Workflow size={33} className="mk-blue-icon" aria-hidden="true" /><p className="tqc-eyebrow">YOUR NEXT STEP</p><h2>Choose a time<br />to talk.</h2><p>Open the booking page to arrange your walkthrough. Bring your questions and the workflow you want to improve.</p><a className="tqc-button" href={walkthroughUrl}>Book a walkthrough<ArrowUpRight size={17} aria-hidden="true" /></a><p className="mk-form-note">You’ll continue to our booking page.</p></div> : <EnquiryForm />}</div></section>
    <section className="mk-tint-section mk-brand-surface"><BrandBackdrop variant="flow" className="mk-surface-backdrop mk-flow-backdrop" /><div className="tqc-container mk-faq-layout"><div><p className="tqc-eyebrow">BEFORE WE SPEAK</p><h2>A little more clarity.</h2><p>Start with the questions that matter to your firm.</p></div><div className="mk-faq-list">{commonQuestions.map(([question, answer]) => <details key={question} name="mk-walkthrough-faq"><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
  </>;
}

export function MarketingPage({ page, slug }: { page: SiteView; slug?: string }) {
  return <SiteShell key={`${page}:${slug || ""}`} page={page}>{page === "home" ? <StrategyHome /> : page === "strategies" ? <Strategies /> : page === "strategy" ? <StrategyDetail slug={slug!} /> : page === "platform" ? <Platform /> : page === "research" ? <Research /> : page === "article" ? <ArticleDetail slug={slug!} /> : page === "about" ? <About /> : page === "institutions" ? <Institutions /> : <Walkthrough />}</SiteShell>;
}
