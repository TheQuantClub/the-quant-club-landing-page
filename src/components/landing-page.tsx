"use client";

import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronRight, CircleDot, Download, FileText, Fingerprint, Layers3, LockKeyhole, Menu, MoveUpRight, Plus, ScanLine, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { QuantLogo } from "./logo";

// Public marketing content only. Never import the private workspace's strategy data here.
const strategies = [
  { name: "Large Cap Club", type: "Equity research", idea: "Established businesses.\nA systematic perspective.", description: "A disciplined framework for exploring India’s large-cap equity universe, with clearly defined selection and portfolio construction rules.", focus: "Large-cap equities", shape: "large", detail: "Explore the framework behind the portfolio." },
  { name: "Mid Cap Club", type: "Equity research", idea: "An evolving universe.\nA consistent process.", description: "A structured approach to the mid-cap universe, applying repeatable research principles to portfolio selection and construction.", focus: "Mid-cap equities", shape: "mid", detail: "Understand the process behind selection." },
  { name: "Small Cap Club", type: "Equity research", idea: "Look deeper.\nStay disciplined.", description: "A systematic lens on small-cap equities, with a defined investment universe and an emphasis on a repeatable selection process.", focus: "Small-cap equities", shape: "small", detail: "Discover how a defined framework guides the research." },
  { name: "Multi Cap Club", type: "Equity research", idea: "A broader universe.\nOne research philosophy.", description: "A quantitative framework that explores equities across market-cap segments through a consistent portfolio construction process.", focus: "Equities across market caps", shape: "multi", detail: "Explore a research approach that spans market segments." },
  { name: "Diversified Mutual Fund Club", type: "Mutual fund research", idea: "Many possibilities.\nA considered structure.", description: "A systematic approach to diversified mutual-fund selection, bringing a documented framework to model portfolio construction.", focus: "Diversified mutual funds", shape: "funds", detail: "See the thinking behind the fund selection framework." },
  { name: "Sector Rotation Club", type: "Mutual fund research", idea: "Markets evolve.\nThe process endures.", description: "A rules-based research framework for sector and thematic fund allocation, with a clearly defined review process.", focus: "Sector & thematic mutual funds", shape: "sector", detail: "Understand the approach to sector allocation." },
];

const approach = [
  { title: "Define the universe", label: "A clear starting point", body: "Every strategy begins with a defined investment universe. Establishing eligibility gives the research a consistent foundation.", tags: ["Investment universe", "Eligibility framework", "Defined scope"], icon: ScanLine },
  { title: "Apply the research", label: "A repeatable framework", body: "Quantitative signals and documented selection rules shape the research process. Each decision follows a considered framework.", tags: ["Quantitative signals", "Selection rules", "Consistent evaluation"], icon: SlidersHorizontal },
  { title: "Construct with discipline", label: "Clarity in construction", body: "Selected holdings are equally weighted at the scheduled rebalance. The portfolio follows the strategy’s defined construction rules.", tags: ["Equal weighting", "Model construction", "Documented rules"], icon: Layers3 },
  { title: "Review and publish", label: "Research that stays organised", body: "Dated monthly portfolio releases support different entry points. Each portfolio follows its scheduled rebalance cycle, with updates in one research workspace.", tags: ["Monthly publications", "Scheduled review", "Firm-wide updates"], icon: FileText },
];

const faqs = [
  ["Who is The Quant Club built for?", "The Quant Club is built for registered investment advisers and their teams who want systematic investment research to support their advisory process."],
  ["What can I explore during a strategy walkthrough?", "We will introduce the strategy universes, explain our research and portfolio construction approach, and walk through how your firm would use the research workspace."],
  ["Can I see strategy performance on this website?", "Strategy performance, portfolio holdings and analytics are not published on this website. Approved members can access the permitted live data and strategy information after signing in."],
  ["How do monthly publications and rebalancing work?", "A dated portfolio is published each month to support firms starting at different times. Each portfolio follows its own scheduled rebalance cycle. Monthly publication does not mean that every existing portfolio is rebalanced each month."],
  ["Does The Quant Club manage my clients or execute trades?", "The product provides research and model portfolios for your firm. Client management, suitability decisions and execution remain with your advisory practice."],
  ["How does my firm get access?", "Start with a strategy walkthrough. After discussing the research and completing the subscription and onboarding process, your firm receives access to its research workspace."],
];

function OrbitArt({ id = "hero", compact = false }: { id?: string; compact?: boolean }) {
  const project = (theta: number, phi: number) => {
    const radius = 170 + 60 * Math.cos(phi);
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = 60 * Math.sin(phi);
    const py = y * .58 - z * .82;
    return [330 + x * .85 - py * .53, 306 + x * .53 + py * .85];
  };
  const curve = (index: number, around: boolean) => Array.from({ length: 101 }, (_, p) => {
    const t = p / 100 * Math.PI * 2;
    const [x, y] = project(around ? t : index / 64 * Math.PI * 2, around ? index / 26 * Math.PI * 2 : t);
    return `${p ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  return <svg className={`orbit-art ${compact ? "orbit-art--compact" : ""}`} viewBox="0 0 660 610" aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-glow`}><stop stopColor="#2563eb" stopOpacity=".3"/><stop offset="1" stopColor="#2563eb" stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9bfbff"/><stop offset=".38" stopColor="#06b6d4"/><stop offset=".72" stopColor="#2563eb"/><stop offset="1" stopColor="#284280"/></linearGradient>
    </defs>
    <circle cx="340" cy="315" r="294" fill={`url(#${id}-glow)`}/>
    <g className="orbit-guides" fill="none" stroke="#557b9c" strokeWidth=".6">
      <circle cx="330" cy="306" r="262" strokeDasharray="2 8" opacity=".5"/>
      <ellipse cx="330" cy="306" rx="304" ry="135" transform="rotate(-28 330 306)" opacity=".3"/>
      <path d="M330 25v30M330 558v27M48 306H72M591 306h26"/>
    </g>
    <g className="orbit-core" fill="none" stroke={`url(#${id}-wire)`}>
      {Array.from({ length: 64 }, (_, i) => <path key={`v${i}`} d={curve(i, false)} strokeWidth={i % 8 === 0 ? 1.5 : .65} opacity={(.36 + Math.sin(i / 64 * Math.PI) * .55).toFixed(4)}/>)}
      {Array.from({ length: 26 }, (_, i) => <path key={`h${i}`} d={curve(i, true)} strokeWidth=".7" opacity={.35}/>) }
    </g>
    <g fill="#8eeaff"><circle cx="101" cy="188" r="3"/><circle cx="553" cy="441" r="3"/></g>
    <g stroke="#537c97" strokeWidth=".7" fill="none"><path d="M101 188L66 154H19M553 441l32 39h44"/></g>
    {!compact && <g fill="#79a1bc" fontSize="8" fontFamily="monospace" letterSpacing="2"><text x="20" y="145">DEFINED BY PROCESS</text><text x="464" y="498">BUILT ON DISCIPLINE</text></g>}
  </svg>;
}

function StrategyShape({ variant }: { variant: string }) {
  return <div className={`strategy-sculpture sculpture--${variant}`} aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => <span key={i} style={{ "--ring": i } as React.CSSProperties}/>)}
    <i/><b/>
  </div>;
}

function navigateTabs(event: KeyboardEvent<HTMLElement>) {
  const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
  if (index < 0) return;
  let next = index;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + tabs.length - 1) % tabs.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = tabs.length - 1;
  else return;
  event.preventDefault(); tabs[next].focus(); tabs[next].click();
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activePreview, setActivePreview] = useState("Methodology");
  const [dialogMode, setDialogMode] = useState<"enquiry" | "login">("enquiry");
  const [enquiry, setEnquiry] = useState<Record<string, string> | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const strategy = strategies[activeStrategy];
  const step = approach[activeStep];
  const StepIcon = step.icon;

  useEffect(() => {
    const onEscape = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    if (enquiry) dialog.current?.querySelector<HTMLElement>('[role="status"] h2')?.focus();
  }, [enquiry]);

  const openDialog = (mode: "enquiry" | "login" = "enquiry") => {
    trigger.current = document.activeElement as HTMLElement;
    setDialogMode(mode);
    setEnquiry(null);
    setMenuOpen(false);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const closeDialog = () => dialog.current?.close();
  const onDialogClose = () => {
    document.body.style.overflow = "";
    trigger.current?.focus();
  };
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEnquiry(Object.fromEntries(Array.from(data.entries()).map(([key, value]) => [key, String(value).trim()])));
  };
  const downloadEnquiry = () => {
    if (!enquiry) return;
    const text = `The Quant Club — Strategy walkthrough enquiry\n\nName: ${enquiry.name}\nWork email: ${enquiry.email}\nFirm: ${enquiry.firm}\nInterest: ${enquiry.interest}\nMessage: ${enquiry.message || "Not provided"}\n\nLocal preview only. This enquiry has not been sent.`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "quant-club-walkthrough-enquiry.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return <div className="landing">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#" className="brand-link" aria-label="The Quant Club home"><QuantLogo inverse/></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#approach">Our approach</a><a href="#strategies">Strategies</a><a href="#workspace">The workspace</a><a href="#about">About us</a></nav>
        <div className="header-actions"><button className="login-button" onClick={() => openDialog("login")}>Member login <ArrowUpRight size={13}/></button><button className="walkthrough-button" onClick={() => openDialog()}>Book a strategy walkthrough <ArrowUpRight size={15}/></button></div>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[["Our approach","approach"],["Strategies","strategies"],["The workspace","workspace"],["About us","about"]].map(([name,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{name}<ArrowUpRight size={18}/></a>)}<button onClick={() => openDialog("login")}>Member login <LockKeyhole size={16}/></button><button onClick={() => openDialog()}>Book a strategy walkthrough <ArrowUpRight size={16}/></button></nav>}
    </header>

    <main id="main">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true"/>
        <div className="hero-art"><OrbitArt/></div>
        <div className="container hero-content">
          <p className="eyebrow light"><span className="live-dot"/> QUANTITATIVE RESEARCH. HUMAN PURPOSE.</p>
          <h1>Systematic research.<br/>Built for your<br/><em>advisory practice.</em></h1>
          <p className="hero-description">Independent thinking. Disciplined execution of ideas.<br className="desktop-break"/> Explore quantitative research and model portfolios<br className="desktop-break"/> built for registered investment advisers.</p>
          <div className="hero-actions"><button className="btn btn-cyan" onClick={() => openDialog()}>Book a strategy walkthrough <ArrowUpRight size={18}/></button><a className="text-link light" href="#approach">Explore our approach <ArrowDown size={16}/></a></div>
        </div>
        <div className="container hero-bottom"><span className="hero-caption">YOUR PORTFOLIO’S NEW CLUB.</span><div><span>Rules-led research</span><i/><span>Equal-weight portfolios</span><i/><span>Built for RIAs</span></div><a href="#intro" aria-label="Scroll to introduction"><ArrowDown size={18}/></a></div>
      </section>

      <section id="intro" className="intro section-pad">
        <div className="container">
          <div className="intro-heading"><p className="eyebrow">A CLEARER WAY TO THINK</p><h2>Markets are complex.<br/>Your process should<br/><span className="muted">bring clarity.</span></h2><p className="intro-copy">Good advice starts with thoughtful research. The Quant Club brings a systematic investment framework into your practice—so your team can understand the thinking, follow the process, and put the research in context.</p></div>
          <div className="value-grid">
            <article><Fingerprint size={24}/><h3>A philosophy you can understand.</h3><p>Documented principles and a defined investment universe behind every strategy.</p></article>
            <article><Layers3 size={24}/><h3>A process you can follow.</h3><p>Consistent portfolio construction, equal weighting, and scheduled reviews.</p></article>
            <article><CircleDot size={24}/><h3>Research your team can use.</h3><p>Strategy information and organised publications in a dedicated firm workspace.</p></article>
          </div>
        </div>
      </section>

      <section id="approach" className="approach section-pad">
        <div className="container">
          <div className="section-top"><p className="eyebrow">THE THINKING BEHIND THE STRATEGY</p><span className="section-aside">A repeatable process. A considered perspective.</span></div>
          <div className="approach-layout">
            <div><h2>Discipline, by design.</h2><p className="section-copy">From the investment universe to the published portfolio, every stage has a purpose.</p><div className="process-tabs" role="tablist" onKeyDown={navigateTabs} aria-label="Research process" aria-orientation="vertical">{approach.map((item,i) => <button key={item.title} role="tab" id={`process-tab-${i}`} aria-selected={activeStep===i} aria-controls={`process-panel-${i}`} onClick={() => setActiveStep(i)}><span className="process-dot">{activeStep===i ? <CircleDot size={15}/> : <span/>}</span>{item.title}<ArrowUpRight size={16}/></button>)}</div></div>
            <div className="process-panel" role="tabpanel" id={`process-panel-${activeStep}`} aria-labelledby={`process-tab-${activeStep}`}>
              <div className="process-panel-top"><span>THE RESEARCH FRAMEWORK</span><StepIcon size={19}/></div>
              <div className={`process-visual process-visual--${activeStep}`} aria-hidden="true"><div className="process-grid">{Array.from({length:36},(_,i) => <i key={i} className={(i*7+activeStep*3)%11<5 ? "selected" : ""}/>)}</div><div className="scan-line"/><div className="process-focus"><StepIcon size={31}/></div></div>
              <div className="process-caption" key={step.title}><span className="eyebrow">{step.label}</span><h3>{step.title}</h3><p>{step.body}</p><div className="tag-row">{step.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="strategies" className="strategies section-pad">
        <div className="container">
          <div className="section-top"><p className="eyebrow">FIND YOUR RESEARCH PERSPECTIVE</p><span className="section-aside">EQUITIES & MUTUAL FUNDS</span></div>
          <div className="section-heading"><h2>Different universes.<br/><span className="muted">A shared discipline.</span></h2><p>Explore the strategy collection. Start with the idea behind each portfolio, then go deeper in a walkthrough.</p></div>
          <div className="strategy-explorer">
            <div className="strategy-list" role="tablist" onKeyDown={navigateTabs} aria-label="Explore strategies" aria-orientation="vertical">{strategies.map((item,i) => <button id={`strategy-tab-${i}`} key={item.name} role="tab" aria-controls={`strategy-panel-${i}`} aria-selected={activeStrategy===i} onClick={() => setActiveStrategy(i)}><span><small>QUANT ×</small>{item.name}</span><ArrowUpRight size={20}/></button>)}</div>
            <div className={`strategy-feature feature--${strategy.shape}`} role="tabpanel" id={`strategy-panel-${activeStrategy}`} aria-labelledby={`strategy-tab-${activeStrategy}`}>
              <div className="feature-top"><span className="feature-badge"><span/>{strategy.type}</span><span className="feature-wordmark">THE QUANT CLUB</span></div>
              <StrategyShape variant={strategy.shape}/>
              <div className="feature-copy" key={strategy.name}><p className="eyebrow light">QUANT × {strategy.name.toUpperCase()}</p><h3>{strategy.idea}</h3><p>{strategy.description}</p><div className="feature-meta"><span>{strategy.focus}</span><span>Systematic approach</span></div><button className="text-link light" onClick={() => openDialog()}>Walk through this strategy <ArrowUpRight size={17}/></button></div>
            </div>
          </div>
          <p className="private-note"><LockKeyhole size={14}/> Strategy figures and holdings stay private. Approved members access permitted live data after signing in.</p>
        </div>
      </section>

      <section id="workspace" className="workspace-section section-pad">
        <div className="container">
          <div className="workspace-heading"><div><p className="eyebrow light">THE RESEARCH, BROUGHT TOGETHER</p><h2>A dedicated space.<br/><span>For a shared perspective.</span></h2></div><p>Give your team a clear place to explore the research, follow publications, and understand the portfolio process.</p></div>
          <div className="workspace-layout">
            <div className="workspace-features">
              <div><span className="mini-icon"><ScanLine size={18}/></span><h3>Understand the methodology</h3><p>Explore the approach behind each strategy and the principles that shape it.</p></div>
              <div><span className="mini-icon"><FileText size={18}/></span><h3>Stay close to the research</h3><p>Find dated publications and strategy documents in an organised workspace.</p></div>
              <div><span className="mini-icon"><CheckCheck size={18}/></span><h3>Keep your team aligned</h3><p>A shared research destination, with combined publication updates for your firm.</p></div>
              <button className="text-link light" onClick={() => openDialog()}>See it in a walkthrough <ArrowUpRight size={17}/></button>
            </div>
            <div className="workspace-preview" aria-label="Public-safe conceptual preview of the research workspace">
              <div className="preview-chrome"><div><i/><i/><i/></div><span><LockKeyhole size={10}/> The Quant Club / Research workspace</span><span>PREVIEW</span></div>
              <div className="preview-body"><aside><div className="preview-mark"><QuantLogo compact/></div><div className="preview-side-item active"><Layers3 size={15}/><span>Strategies</span></div><div className="preview-side-item"><FileText size={15}/><span>Publications</span></div><div className="preview-side-item"><Download size={15}/><span>Documents</span></div><div className="preview-side-bottom"><CircleDot size={15}/><span>Your firm</span></div></aside><div className="preview-main"><div className="preview-breadcrumb">Your strategies <ChevronRight size={10}/> Research overview</div><span className="preview-eyebrow">QUANT ×</span><h3>Large Cap Club</h3><div className="preview-tabs" role="tablist" onKeyDown={navigateTabs} aria-label="Workspace preview">{["Methodology","Publications","Documents"].map(item => <button key={item} id={`preview-tab-${item}`} role="tab" aria-selected={activePreview===item} aria-controls="preview-content" onClick={() => setActivePreview(item)}>{item}</button>)}</div><div id="preview-content" role="tabpanel" aria-labelledby={`preview-tab-${activePreview}`}>
                {activePreview === "Methodology" ? <><div className="preview-note"><span/><strong>A defined approach to portfolio construction</strong></div><h4>The thinking behind the portfolio</h4><p>Defined universe. Consistent selection.<br/>Disciplined construction.</p><div className="preview-flow"><span><ScanLine size={17}/>Universe</span><ArrowRight size={12}/><span><SlidersHorizontal size={17}/>Research</span><ArrowRight size={12}/><span><Layers3 size={17}/>Portfolio</span></div><div className="preview-row"><span>Portfolio approach</span><strong>Equal weight</strong></div><div className="preview-row"><span>Review process</span><strong>Scheduled</strong></div></> : activePreview === "Publications" ? <><h4>Your research, in one place.</h4><p>Dated releases. Clear updates. A shared view for your firm.</p>{["Monthly portfolio release","Research methodology note","Firm publication update"].map(item => <div className="preview-document" key={item}><FileText size={16}/><span>{item}</span><LockKeyhole size={12}/></div>)}</> : <><h4>The context behind every strategy.</h4><p>Organised documentation to support your research process.</p>{["Strategy introduction","Portfolio construction guide","Research principles"].map(item => <div className="preview-document" key={item}><FileText size={16}/><span>{item}</span><LockKeyhole size={12}/></div>)}</>}
              </div><div className="preview-footer"><LockKeyhole size={11}/> Illustrative interface · no strategy data shown</div></div></div>
            </div>
          </div>
          <div className="publication-rhythm"><span className="rhythm-label">A CLEAR PUBLICATION RHYTHM</span><div><span className="rhythm-point"/>Monthly portfolio release</div><span className="rhythm-line"/><div><span className="rhythm-point"/>Different entry dates</div><span className="rhythm-line"/><div><span className="rhythm-point"/>Scheduled rebalancing</div></div>
        </div>
      </section>

      <section id="about" className="about section-pad"><div className="container about-layout"><div className="about-art" aria-hidden="true"><div className="about-ring ring-one"/><div className="about-ring ring-two"/><div className="about-ring ring-three"/><div className="about-mark"><QuantLogo compact/></div><span className="art-label art-label-top">INDEPENDENT THINKING</span><span className="art-label art-label-bottom">SHARED CONVICTION IN PROCESS</span><div className="about-cross cross-one">+</div><div className="about-cross cross-two">+</div></div><div className="about-copy"><p className="eyebrow">THE IDEA BEHIND THE CLUB</p><h2>Curiosity in research.<br/><span className="muted">Conviction in process.</span></h2><p>We believe investment research should be understandable, repeatable, and useful to the people making decisions.</p><p>The Quant Club brings that belief to the advisory community: a considered approach to quantitative research, supported by clear portfolio principles and a dedicated place for your team to explore them.</p><a href="#approach" className="text-link">Explore our philosophy <ArrowUpRight size={17}/></a><span className="about-signature">Your Portfolio’s new club.</span></div></div></section>

      <section id="questions" className="faq-section section-pad"><div className="container faq-layout"><div><p className="eyebrow">A LITTLE MORE CLARITY</p><h2>Good questions.<br/><span className="muted">Straight answers.</span></h2><p className="section-copy">Still curious? A conversation is a good place to start.</p><button className="text-link" onClick={() => openDialog()}>Let’s talk <ArrowUpRight size={17}/></button></div><div className="faq-list">{faqs.map(([question,answer]) => <details key={question} name="faq"><summary>{question}<Plus size={18}/></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="closing"><div className="closing-lines" aria-hidden="true"/><div className="container closing-inner"><p className="eyebrow light">EXPLORE THE THINKING. MEET THE CLUB.</p><h2>Let’s walk through<br/><em>the strategy.</em></h2><p>Discover the research. Understand the process.<br/>See how The Quant Club fits your advisory practice.</p><button className="btn btn-white" onClick={() => openDialog()}>Book a strategy walkthrough <ArrowUpRight size={18}/></button><span className="closing-footnote">A conversation about your firm and our research.</span></div></section>
    </main>

    <footer className="site-footer"><div className="container"><div className="footer-top"><div><a href="#" className="footer-brand" aria-label="The Quant Club home"><QuantLogo inverse/></a><p>Systematic research.<br/>Built for your advisory practice.</p></div><div className="footer-links"><span>EXPLORE</span><a href="#approach">Our approach</a><a href="#strategies">Strategies</a><a href="#workspace">The workspace</a></div><div className="footer-links"><span>THE CLUB</span><a href="#about">About us</a><a href="#questions">FAQs</a><button onClick={() => openDialog()}>Book a strategy walkthrough <ArrowUpRight size={12}/></button></div><div className="footer-note"><span>FOR INVESTMENT PROFESSIONALS</span><p>A dedicated research perspective for registered investment advisers.</p><button onClick={() => openDialog("login")}>Member login <ArrowUpRight size={13}/></button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} The Quant Club. All rights reserved.</span><a href="#main">Back to top <MoveUpRight size={12}/></a></div><p className="disclosure">This website introduces our research approach and is intended for investment professionals. It does not display strategy performance or constitute a recommendation to buy or sell any security. Investments are subject to market risk.</p></div></footer>

    <dialog ref={dialog} className="enquiry-dialog" onClose={onDialogClose} onClick={event => { if(event.target===event.currentTarget)closeDialog(); }} aria-labelledby="dialog-title"><div className="dialog-content"><button className="dialog-close" onClick={closeDialog} aria-label="Close dialog"><X size={20}/></button>
      {dialogMode === "login" ? <><div className="dialog-icon"><LockKeyhole size={24}/></div><p className="eyebrow">THE MEMBER WORKSPACE</p><h2 id="dialog-title">Your research.<br/>Your dedicated space.</h2><p className="dialog-intro">Member sign-in will be available when the secure workspace is connected. This landing-page preview does not collect login credentials.</p><button className="btn btn-blue" onClick={() => setDialogMode("enquiry")}>Book a strategy walkthrough <ArrowUpRight size={17}/></button><button className="dialog-back" onClick={closeDialog}>Back to the website</button></> : enquiry ? <div className="enquiry-result" role="status"><div className="dialog-icon"><Check size={24}/></div><p className="eyebrow">YOUR ENQUIRY PREVIEW</p><h2 id="dialog-title" tabIndex={-1}>A good conversation<br/>starts here.</h2><p className="dialog-intro">Your details are ready to review. This is a local preview; nothing has been sent or stored.</p><dl><div><dt>Name</dt><dd>{enquiry.name}</dd></div><div><dt>Firm</dt><dd>{enquiry.firm}</dd></div><div><dt>Work email</dt><dd>{enquiry.email}</dd></div><div><dt>Interest</dt><dd>{enquiry.interest}</dd></div></dl><button className="btn btn-blue" onClick={downloadEnquiry}>Save enquiry summary <Download size={17}/></button><button className="dialog-back" onClick={() => setEnquiry(null)}>Start a new enquiry</button></div> : <><p className="eyebrow">LET’S EXPLORE THE RESEARCH</p><h2 id="dialog-title">Book a strategy<br/>walkthrough.</h2><p className="dialog-intro">Tell us a little about your firm and the research you’d like to explore.</p><form onSubmit={submitEnquiry}><div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Full name" pattern=".*\S.*"/></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@yourfirm.com"/></label></div><label>Firm name<input name="firm" autoComplete="organization" required maxLength={160} placeholder="Your advisory practice" pattern=".*\S.*"/></label><label>What would you like to explore?<select name="interest" defaultValue={strategy.name}><option value="The full research offering">The full research offering</option>{strategies.map(item => <option key={item.name}>{item.name}</option>)}</select></label><label>A little context <span>(optional)</span><textarea name="message" rows={3} maxLength={1500} placeholder="What would be useful for us to cover?"/></label><p className="form-preview-note"><CircleDot size={13}/> Preview form. Details stay in this tab and are not sent.</p><button className="btn btn-blue form-submit" type="submit">Preview my enquiry <ArrowUpRight size={17}/></button></form></>}
    </div></dialog>
  </div>;
}
