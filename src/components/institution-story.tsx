import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MoveRight } from "lucide-react";
import { audienceStories } from "@/lib/strategy-story";
import { publicStrategies } from "@/lib/public-content";

const chapterNames = ["THE ADVISORY PRACTICE", "THE FUND CONVERSATION", "THE INVESTMENT TEAM"];

export function InstitutionStory() {
  return <div className="i-story">
    <section className="i-story-intro">
      <div className="i-story-wrap">
        <div className="i-story-kicker"><span /> FOR INVESTMENT PROFESSIONALS</div>
        <h1>The strategy is ours.<br />The investment decision<br /><em>is yours.</em></h1>
        <div className="i-story-intro-bottom">
          <p>The Quant Club gives your team research and model portfolios to work with. Here is where they fit into an advisory practice, a fund conversation and an institutional investment process.</p>
          <a href="#advisers" className="i-story-down">Find your use case <ArrowDown size={18} /></a>
        </div>
        <nav className="i-story-audience-nav" aria-label="Institution types">
          {audienceStories.map((audience, index) => <a href={`#${audience.id}`} key={audience.id}><small>0{index + 1}</small>{audience.name}<ArrowDown size={15} /></a>)}
        </nav>
      </div>
    </section>
    <div className="i-story-wrap">
      {audienceStories.map((audience, index) => <section className="i-story-chapter" id={audience.id} key={audience.id}>
        <div className="i-story-chapter-title"><span className="i-story-kicker">{chapterNames[index]}</span><h2>{audience.name}</h2><p>{audience.intro}</p><Link className="i-story-text-link" href="/walkthrough">Discuss your use case <ArrowUpRight size={17} /></Link></div>
        <div className="i-story-chapter-content">
          <h3>How you use the research</h3>
          <ol>{audience.uses.map((use, number) => <li key={use}><span>0{number + 1}</span><p>{use}</p></li>)}</ol>
          <div className="i-story-relevant"><span>EXPLORE THE STRATEGIES</span><div>{audience.strategies.map(slug => {
            const strategy = publicStrategies.find(item => item.slug === slug);
            return strategy ? <Link href={`/strategies/${slug}`} key={slug}>Quant x {strategy.name}<ArrowUpRight size={13}/></Link> : null;
          })}</div></div>
        </div>
      </section>)}
    </div>
    <section className="i-story-cycle">
      <div className="i-story-wrap">
        <div className="i-story-cycle-heading"><span className="i-story-kicker">THE PRACTICAL DIFFERENCE</span><h2>A new publication each month.<br />A separate clock for each portfolio.</h2><p>A client starting this month uses this month’s portfolio. A client who started earlier follows their existing portfolio’s review schedule. A new publication does not reset every portfolio.</p></div>
        <div className="i-story-cycle-flow">
          {[
            ["A client is ready", "Your firm establishes the mandate and decides whether the research is suitable."],
            ["Choose the publication", "Use the model associated with the relevant starting month."],
            ["Follow its own cycle", "Review that portfolio at its six-month rebalance and retain the dated record."],
          ].map(([title, body], index) => <div className="i-story-cycle-step" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>{index < 2 && <MoveRight className="i-story-flow-arrow" size={23} />}</div>)}
        </div>
      </div>
    </section>
    <section className="i-story-division i-story-wrap">
      <div><span className="i-story-kicker">A CLEAR DIVISION OF WORK</span><h2>Research your team<br />can put to work.</h2></div>
      <div><h3>From The Quant Club</h3><ul><li><Check size={16}/> Strategy research and methodology</li><li><Check size={16}/> Equally weighted model portfolios</li><li><Check size={16}/> Monthly publications and a dated research record</li></ul></div>
      <div><h3>With your firm</h3><ul><li><Check size={16}/> Client relationships and suitability</li><li><Check size={16}/> Allocation and investment decisions</li><li><Check size={16}/> Trade execution and ongoing client service</li></ul></div>
    </section>
    <section className="i-story-outro i-story-wrap"><div><span className="i-story-kicker">LET’S LOOK AT A STRATEGY TOGETHER</span><h2>Bring your mandate.<br />We’ll bring the research.</h2></div><Link href="/walkthrough">Book a strategy walkthrough <ArrowRight size={18}/></Link></section>
  </div>;
}
