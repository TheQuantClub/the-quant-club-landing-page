"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ChevronDown, FileText, FolderOpen, LockKeyhole, RefreshCw, Users } from "lucide-react";
import { publicStrategies } from "@/lib/public-content";
import { strategyStories } from "@/lib/strategy-story";

const tabs = ["Methodology", "Publications", "Review schedule"] as const;
type WorkspaceTab = typeof tabs[number];

function ResearchPreview() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("Methodology");
  const [strategySlug, setStrategySlug] = useState("large-cap");
  const [activeDocument, setActiveDocument] = useState("Portfolio publication");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const strategy = publicStrategies.find(item => item.slug === strategySlug) ?? publicStrategies[0];
  const story = strategyStories[strategy.slug];

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next]);
    tabRefs.current[next]?.focus();
  }

  return <div className="p-story-workspace" id="workspace-preview">
    <div className="p-story-workspace-top"><span><i /> THE QUANT CLUB / RESEARCH WORKSPACE</span><span><LockKeyhole size={11} /> Public preview</span></div>
    <div className="p-story-workspace-heading"><div><span className="p-story-label">YOUR STRATEGY, IN ONE PLACE</span><h2>Quant x {strategy.name}</h2></div><label className="p-story-select"><span>EXPLORE ANOTHER STRATEGY</span><div><select value={strategySlug} onChange={event => setStrategySlug(event.target.value)} aria-label="Preview strategy">{publicStrategies.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><ChevronDown size={13} aria-hidden="true"/></div></label></div>
    <div className="p-story-tabs" role="tablist" aria-label="Research workspace sections">{tabs.map((tab, index) => <button type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={activeTab === tab} tabIndex={activeTab === tab ? 0 : -1} ref={element => {tabRefs.current[index] = element;}} onKeyDown={event => moveTab(event, index)} onClick={() => setActiveTab(tab)} key={tab}>{tab === "Methodology" ? <BookOpen size={15}/> : tab === "Publications" ? <FolderOpen size={15}/> : <RefreshCw size={15}/>} {tab}</button>)}</div>
    <div role="tabpanel" id={`${id}-panel-${tabs.indexOf(activeTab)}`} aria-labelledby={`${id}-tab-${tabs.indexOf(activeTab)}`} className="p-story-panel" key={`${activeTab}-${strategySlug}`} tabIndex={0}>
      {activeTab === "Methodology" && <>
        <div className="p-story-panel-intro"><span className="p-story-label">START WITH THE RESEARCH</span><h3>Know what you are<br />putting to work.</h3><p>{story.description}</p><Link href={`/strategies/${strategy.slug}`}>Read the strategy introduction <ArrowUpRight size={14}/></Link></div>
        <div className="p-story-method-record"><div className="p-story-record-head"><BookOpen size={18}/><span>METHODOLOGY / AT A GLANCE</span></div><dl><div><dt>Investment universe</dt><dd>{strategy.universe}</dd></div><div><dt>Portfolio construction</dt><dd>Equal starting weights</dd></div><div><dt>New publications</dt><dd>Monthly</dd></div><div><dt>Portfolio review</dt><dd>Six-month rebalance cycle</dd></div></dl><p><Check size={13}/> A common reference for your team’s research discussions.</p></div>
      </>}
      {activeTab === "Publications" && <>
        <div className="p-story-panel-intro"><span className="p-story-label">A RECORD YOU CAN RETURN TO</span><h3>The portfolio stays<br />with its context.</h3><p>Start with the applicable release, then return to the supporting research when your team reviews the strategy. Each publication belongs to a strategy and a starting series.</p><p className="p-story-preview-note">Select a document type to see its role. Portfolio contents are available only through the appropriate member access.</p></div>
        <div className="p-story-documents"><div className="p-story-document-buttons">{["Portfolio publication", "Portfolio history", "Methodology note"].map(title => <button type="button" aria-pressed={activeDocument === title} key={title} onClick={() => setActiveDocument(title)}><FileText size={17}/><span>{title}<small>{title === "Portfolio publication" ? "THE APPLICABLE RELEASE" : title === "Portfolio history" ? "THE DATED RECORD" : "THE RESEARCH CONTEXT"}</small></span><ArrowRight size={14}/></button>)}</div><div className="p-story-document-detail"><span className="p-story-label">{activeDocument}</span><p>{activeDocument === "Portfolio publication" ? "The model associated with a particular starting month. This is the research your team refers to when considering a new deployment." : activeDocument === "Portfolio history" ? "The earlier portfolio publications for the selected strategy and series. Return to the relevant record when reviewing what was published at that time." : "The strategy’s investment universe and portfolio approach, kept close to the publications it explains."}</p></div></div>
      </>}
      {activeTab === "Review schedule" && <>
        <div className="p-story-panel-intro"><span className="p-story-label">FOLLOW THE PORTFOLIO’S CLOCK</span><h3>Published monthly.<br />Rebalanced on its own cycle.</h3><p>A fresh release supports a new starting date. An existing portfolio continues on the schedule associated with its own starting series.</p><p className="p-story-preview-note">Your firm decides when to deploy and executes any changes. The workspace provides the research record.</p></div>
        <div className="p-story-review-record"><div className="p-story-record-head"><CalendarDays size={18}/><span>A PORTFOLIO’S JOURNEY</span></div><ol><li><i/><div><h4>Choose a starting publication</h4><p>Use the release relevant to the investment starting month.</p></div></li><li><i/><div><h4>Keep the starting series</h4><p>Later monthly publications do not restart this portfolio’s clock.</p></div></li><li><RefreshCw size={16}/><div><h4>Review at its rebalance</h4><p>Follow the portfolio’s six-month cycle and its next applicable publication.</p></div></li></ol></div>
      </>}
    </div>
    <div className="p-story-workspace-foot"><span><LockKeyhole size={12}/> This preview explains the workspace. It does not display member data.</span><Link href="/walkthrough">See it in a walkthrough <ArrowRight size={13}/></Link></div>
  </div>;
}

export function StrategyPlatform() {
  return <div className="p-story">
    <section className="p-story-hero p-story-wrap"><span className="p-story-label">THE RESEARCH WORKSPACE</span><div><h1>The strategy.<br />The portfolio.<br /><em>The context.</em></h1><div className="p-story-hero-copy"><p>One place for the research behind the model and the publications your team works from. Built around a question you ask every time: <strong>what are we investing in, and how does it work?</strong></p><a href="#workspace-preview">Explore the workspace <ArrowDown size={17}/></a><span>FOR ADVISERS AND INVESTMENT TEAMS</span></div></div></section>
    <section className="p-story-preview-section p-story-wrap" aria-label="Interactive research workspace preview"><ResearchPreview/></section>
    <section className="p-story-practice p-story-wrap"><div><span className="p-story-label">WHAT THE SUBSCRIPTION BRINGS</span><h2>Useful at the desk.<br /><em>Shared across the team.</em></h2></div><div className="p-story-practice-list"><article><BookOpen size={21}/><div><h3>The thinking behind the strategy</h3><p>Understand the investment universe and model construction before considering a portfolio for your firm’s mandate.</p></div></article><article><FolderOpen size={21}/><div><h3>A clear publication record</h3><p>Find the monthly release and its supporting history together. Keep the starting series visible when following a portfolio.</p></div></article><article><Users size={21}/><div><h3>A common reference for your firm</h3><p>Give your authorised team access to subscribed research and publication updates, with the same context behind each discussion.</p></div></article></div></section>
    <section className="p-story-access"><div className="p-story-wrap"><div className="p-story-access-icon"><LockKeyhole size={28}/></div><div><span className="p-story-label">ACCESS WITH CONTEXT</span><h2>The introduction is public.<br />The research belongs in your workspace.</h2><p>Explore the strategy universes here. Subscription access follows your firm’s activation, with information limited to what each member is approved to view. Only permitted live information appears after login.</p></div><Link href="/walkthrough">Arrange a walkthrough <ArrowUpRight size={16}/></Link></div></section>
    <section className="p-story-strategies p-story-wrap"><div><span className="p-story-label">FIND YOUR STARTING POINT</span><h2>Explore a strategy.</h2><p>Start with the universe that fits the mandate.</p></div><div>{publicStrategies.map(strategy => <Link href={`/strategies/${strategy.slug}`} key={strategy.slug}><span>Quant x {strategy.name}</span><ArrowUpRight size={16}/></Link>)}</div></section>
    <section className="p-story-close p-story-wrap"><p>Research and model portfolios from The Quant Club.<br /><span>Client decisions, suitability and execution stay with your firm.</span></p><Link href="/institutions">See how your firm can use it <ArrowRight size={16}/></Link></section>
  </div>;
}
